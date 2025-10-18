angular.module('payrollApp')
.controller('MainCtrl', function(PayrollService, $window) {
  var vm = this;
  vm.show = 'admin';
  vm.salaries = PayrollService.list();
  vm.editing = {};

  vm.reset = function() { vm.editing = {}; };

  vm.save = function() {
    if (vm.editing.id != null) {
      var idx = vm.salaries.findIndex(function(s){ return s.id === vm.editing.id; });
      if (idx === -1) {
        idx = vm.salaries.findIndex(function(s){ return s.employeeId === vm.editing.employeeId; });
      }
      if (idx >= 0) {
        vm.salaries[idx] = angular.copy(vm.editing);
        PayrollService.update(idx, vm.editing);
      }
    } else {
      vm.editing.id = Date.now();
      vm.salaries.push(angular.copy(vm.editing));
      PayrollService.add(vm.editing);
    }
    vm.reset();
  };

  vm.edit = function(s) { vm.editing = angular.copy(s); };
  vm.delete = function(s) {
    var idx = vm.salaries.indexOf(s);
    if (idx >= 0) {
      vm.salaries.splice(idx,1);
      PayrollService.delete(idx);
    }
  };

  // Employee lookup
  vm.lookupEmployeeId = '';
  vm.found = null;
  vm.lookupAttempted = false;
  vm.lookup = function() {
    vm.lookupAttempted = true;
    vm.found = vm.salaries.find(function(x){ return x.employeeId == vm.lookupEmployeeId; }) || null;
  };

  // Tools: sample, export, import, clear
  vm.loadSample = function(){ vm.salaries = PayrollService.initSampleDataIfEmpty(); };
  vm.exportJson = function(){
    var data = PayrollService.exportJson();
    var blob = new Blob([data], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'payroll_export.json'; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };
  vm.handleFile = function(input){
    var file = input.files && input.files[0];
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(e){
      try{
        var parsed = JSON.parse(e.target.result);
        if(Array.isArray(parsed)){
          PayrollService.setAll(parsed);
          vm.salaries = PayrollService.list();
          // Angular digest
          var scope = angular.element(input).scope();
          scope.$apply();
        } else {
          alert('Imported JSON must be an array of salary objects');
        }
      } catch(err){ alert('Error parsing JSON: '+err.message); }
    };
    reader.readAsText(file);
    // clear the input so same file can be reselected
    input.value = '';
  };
  vm.clearAll = function(){ if(confirm('Clear all salary records?')){ PayrollService.clearAll(); vm.salaries = []; } };

  // ensure sample data available if first load
  vm.loadSample();
});
