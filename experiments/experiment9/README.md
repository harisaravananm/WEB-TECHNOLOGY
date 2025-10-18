# Experiment 9 — JSP Database Example

This experiment demonstrates a JSP page that connects to a relational database using JDBC and displays rows from an `employees` table.

Files included:
- `experiment9.jsp` — the JSP page to open in the browser (place it under the webapp folder or under `experiments/experiment9/` in your app).
- `WEB-INF/db.properties` — JDBC configuration (update with your DB settings).
- `WEB-INF/web.xml` — minimal web descriptor (optional if your app already has one).
- `init.sql` — SQL script to create the example `web_tech` database and `employees` table with sample data.

How to run (Tomcat example):
1. Place the `experiments/experiment9/` folder into your web application root (for example, `webapps/ROOT/experiments/experiment9/`), or copy files into an existing webapp that you will deploy.
2. Put the JDBC driver JAR (for example `mysql-connector-java-x.x.x.jar`) into Tomcat's `lib/` directory (or your container's classpath) and restart Tomcat.
3. Edit `experiments/experiment9/WEB-INF/db.properties` and set `db.url`, `db.user`, and `db.password` for your database.
4. Run the SQL in `init.sql` on your database server to create the sample database and table:
   - For MySQL: `mysql -u root -p < init.sql`
5. Open the JSP in your browser:
   - Example: `http://localhost:8080/experiments/experiment9/experiment9.jsp`
6. The page will read the `employees` table and render a results table. Errors are displayed on the page for debugging.

Git: Quick steps to push these files from your machine (optional):
1) Create the branch locally (if you don’t already have it):
   git fetch origin
   git checkout -b add-experiment-9 origin/add-experiment-9
2) Added the new files under experiments/experiment9/, then:
   git add experiments/experiment9/*
   git commit -m "Add Experiment 9: JSP DB example"
   git push origin add-experiment-9
3) Open a pull request on GitHub (or use gh CLI: gh pr create --fill)

Security & notes:
- This example uses a simple direct JDBC call from JSP for demonstration and learning. In production, avoid embedding JDBC logic inside JSPs — use MVC patterns, DAO classes, connection pooling (DataSource), and secure credentials management.
- Ensure the JDBC driver version matches your DB server.
- If you prefer to store db.properties in central `WEB-INF/`, put it in `/WEB-INF/db.properties`; the JSP will automatically try the experiment folder first and then the app root as a fallback.

If you want, I can:
- Prepare a cleaner servlet + JSP separation (DAO + JSP view).
- Create a pull request adding these files to the add-experiment-9 branch when you approve.
