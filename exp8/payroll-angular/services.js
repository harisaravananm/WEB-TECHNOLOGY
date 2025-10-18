angular.module('payrollApp')
.service('PayrollService', function($window) {
  var STORAGE_KEY = 'payroll.salaries';
  function load() {
    var raw = $window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  function save(data) {
    $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  this.list = function() { return load(); };
  this.add = function(salary) {
    var all = load();
    all.push(angular.copy(salary));
    save(all);
  };
  this.update = function(idx, salary) {
    var all = load();
    if (idx >= 0 && idx < all.length) {
      all[idx] = angular.copy(salary);
      save(all);
    }
  };
  this.delete = function(idx) {
    var all = load();
    all.splice(idx, 1);
    save(all);
  };
  this.setAll = function(data){ save(data); };
  this.clearAll = function(){ save([]); };
  this.exportJson = function(){ return JSON.stringify(load(), null, 2); };
  this.initSampleDataIfEmpty = function(){
    var all = load();
    if(!all || all.length===0){
      var sample = [
        { id: Date.now()+1, employeeId: 'E1001', name: 'Alice Kumar', salary: 45000 },
        { id: Date.now()+2, employeeId: 'E1002', name: 'Ben Thomas', salary: 52000 },
        { id: Date.now()+3, employeeId: 'E1003', name: 'Chitra Iyer', salary: 48000 }
      ];
      save(sample);
      return sample;
    }
    return all;
  };
});
