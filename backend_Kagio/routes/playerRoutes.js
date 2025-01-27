const express = require("express");
const router = express.Router();
const connection = require("../db"); // We'll create this file next

// Add a new player
router.post("/players", (req, res) => {
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

// Get all players
router.get("/players", (req, res) => {
  const query = "SELECT * FROM players";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).json({ error: "Failed to fetch players" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;