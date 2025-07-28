const express = require('express');
const path = require("path");
const app = express();

const auth = require('./route/auth');
const list = require('./route/list');

app.use(express.json());
require("./conn/connection");

app.use("/api", auth);
app.use("/api", list);

// Serve static files
app.use(express.static(path.resolve(__dirname, "Frontend", "build")));

// Catch-all for React routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
});

module.exports = app;
