<%@ page import="java.sql.*,java.util.*,java.io.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Experiment 9 — JSP: DB Select Example</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;background:#f7fbff;padding:20px}
    .container{max-width:900px;margin:0 auto;background:#fff;padding:18px;border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,0.05)}
    table{border-collapse:collapse;width:100%}
    th,td{padding:8px 10px;border:1px solid #e6eef8;text-align:left}
    th{background:#f0f7ff}
    .error{color:#b00020}
    .meta{color:#444;font-size:0.95rem}
  </style>
</head>
<body>
  <div class="container">
    <h1>Experiment 9 — JSP Database Example</h1>
    <p class="meta">This JSP connects to a relational database using JDBC and displays rows from the <code>employees</code> table.</p>

<%
String error = null;
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try {
    // Try to load DB properties. We look for experiment-local WEB-INF first, then app WEB-INF as fallback.
    java.util.Properties props = new java.util.Properties();
    // Path inside the webapp for a sandboxed experiment folder:
    java.io.InputStream in = application.getResourceAsStream("/experiments/experiment9/WEB-INF/db.properties");
    if (in == null) {
        // Fallback to root WEB-INF/db.properties
        in = application.getResourceAsStream("/WEB-INF/db.properties");
    }
    if (in == null) {
        throw new java.io.FileNotFoundException("db.properties not found in /experiments/experiment9/WEB-INF or /WEB-INF");
    }
    try (java.io.InputStream pin = in) {
        props.load(pin);
    }

    String driver = props.getProperty("db.driver", "com.mysql.cj.jdbc.Driver");
    String url = props.getProperty("db.url");
    String user = props.getProperty("db.user");
    String pass = props.getProperty("db.password", "");

    if (url == null || user == null) {
        throw new IllegalStateException("Please set db.url and db.user in WEB-INF/db.properties");
    }

    // Load driver and connect
    Class.forName(driver);
    conn = java.sql.DriverManager.getConnection(url, user, pass);

    // Basic, read-only query
    stmt = conn.createStatement();
    rs = stmt.executeQuery("SELECT * FROM employees");

    java.sql.ResultSetMetaData md = rs.getMetaData();
    int cols = md.getColumnCount();
%>
    <table>
      <thead>
        <tr>
<% for (int i=1;i<=cols;i++) { %>
          <th><%= md.getColumnLabel(i) %></th>
<% } %>
        </tr>
      </thead>
      <tbody>
<%
    boolean hasRows = false;
    while (rs.next()) {
        hasRows = true;
%>
        <tr>
<%      for (int i=1;i<=cols;i++) { %>
          <td><%= rs.getObject(i) %></td>
<%      } %>
        </tr>
<%    }
    if (!hasRows) { %>
        <tr><td colspan="<%= cols %>">No rows found in employees table.</td></tr>
<%    } %>
      </tbody>
    </table>

<%
} catch (Exception e) {
    error = e.getClass().getName() + ": " + e.getMessage();
} finally {
    try { if (rs != null) rs.close(); } catch (Exception ignore) {}
    try { if (stmt != null) stmt.close(); } catch (Exception ignore) {}
    try { if (conn != null) conn.close(); } catch (Exception ignore) {}
}
if (error != null) {
%>
    <p class="error">Error: <%= error %></p>
<% } %>

    <p style="margin-top:14px;color:#555;font-size:0.95rem">Notes: Put your JDBC driver (e.g., MySQL Connector/J) into your servlet container's lib folder (Tomcat: lib/) and update the WEB-INF/db.properties with your database credentials. Use the included init.sql to create sample data if needed.</p>

  </div>
</body>
</html>
