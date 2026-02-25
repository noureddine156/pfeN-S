const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// connexion PostgreSQL
const pool = new Pool({
  user: "postgres", // ⚠️ souvent postgres et non postgre
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "autodb",
});

// tester connexion au démarrage serveur
async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected:", result.rows[0]);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
}

testConnection();

// route test API
app.get("/", (req, res) => {
  res.send("API running");
});

// route test database
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Erreur connexion database");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
  
});  
