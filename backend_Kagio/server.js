require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500' // Allow only this origin
}));

// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Serve news data
app.get('/api/news', (req, res) => {
  const news = [
      {
          id: 1,
          title: "Kagio United Wins Championship",
          description: "Kagio United clinched the league title with a stunning victory in the final match.",
          image: "images/news1.jpg",
          date: "2023-10-15",
          link: "#"
      },
      {
          id: 2,
          title: "New Signing Announced",
          description: "Kagio United has signed a promising young midfielder from the local league.",
          image: "images/news2.jpg",
          date: "2023-10-10",
          link: "#"
      },
      {
          id: 3,
          title: "Community Outreach Program",
          description: "Kagio United launched a new initiative to support local youth sports programs.",
          image: "images/news3.jpg",
          date: "2023-10-05",
          link: "#"
      }
  ];
  res.json(news);
});
// Fetch all players
app.get('/api/players', (req, res) => {
  const sql = 'SELECT * FROM players';
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching player data:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});

// Fetch a single player by ID
app.get('/api/player/:id', (req, res) => {
  const playerId = req.params.id;
  const sql = 'SELECT * FROM players WHERE id = ?';
  connection.query(sql, [playerId], (err, result) => {
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

// Add a new player
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

