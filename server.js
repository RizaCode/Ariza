const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fishfeeder_db"
});

// GET semua jadwal
app.get("/schedules", (req, res) => {
  db.query("SELECT * FROM schedules", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST tambah jadwal
app.post("/schedules", (req, res) => {
  const { feed_time, feed_amount, is_active } = req.body;
  db.query(
    "INSERT INTO schedules (feed_time, feed_amount, is_active) VALUES (?, ?, ?)",
    [feed_time, feed_amount, is_active],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Data added", id: result.insertId });
    }
  );
});

// PUT update jadwal
app.put("/schedules/:id", (req, res) => {
  const { id } = req.params;
  const { feed_time, feed_amount, is_active } = req.body;
  db.query(
    "UPDATE schedules SET feed_time=?, feed_amount=?, is_active=? WHERE id=?",
    [feed_time, feed_amount, is_active, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Data updated" });
    }
  );
});

// DELETE hapus jadwal
app.delete("/schedules/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM schedules WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Data deleted" });
  });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
