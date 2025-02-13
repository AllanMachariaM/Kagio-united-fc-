require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Add a new player
app.get('/api/player/:id', (req, res) => {
  const playerId = req.params.id;
  const sql = 'SELECT * FROM players WHERE id = ?';
  db.query(sql, [playerId], (err, result) => {
      if (err) {
          console.error('Error fetching player data:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'Player not found' });
      }
      res.json(result[0]);
  });
});
app.post("/api/players", (req, res) => {
  const { name, image } = req.body;

  const query = "INSERT INTO players (name, image) VALUES (?, ?)";
  connection.query(query, [name, image], (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).json({ error: "Failed to add player" });
    } else {
      res.status(201).json({ id: results.insertId, name, image });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});