# Experiment 8 — Payroll Management (AngularJS v1.x)

This folder contains a minimal AngularJS (1.x) single-page application that demonstrates a Payroll Management system for a web-technology lab experiment.

Features
- Admin can add, edit, delete salary records and view the list of all salaries.
- Employee can view their salary by entering Employee ID.
- Data persistence is implemented using browser localStorage for the demo.

Run locally
1. Clone or download the repository and navigate to the folder:

   ```bash
   git clone https://github.com/harisaravananm/WEB-TECHNOLOGY.git
   cd WEB-TECHNOLOGY/exp8/payroll-angular
   ```

2. Start a simple static HTTP server in that directory (do NOT open index.html via the file:// protocol).

   - Python 3:
     ```bash
     python -m http.server 8000
     ```

   - Or using Node (http-server):
     ```bash
     npx http-server -p 8000
     ```

3. Open the app in your browser:

   http://localhost:8000

Notes
- This is a frontend-only demo that uses localStorage; no backend required.
- For a production app, replace localStorage with a real REST API and secure authentication.

Files
- index.html — main app UI
- styles.css — basic styles
- app.js — Angular module
- services.js — localStorage-based service
- controllers.js — main controller

Instructor / Student: You can extend this by adding authentication, server-side storage (Node/Java/PHP), and role-based access control.
