const express = require('express');
const app = express();
const auth = require('./route/auth');
const list = require('./route/list');
const cors = require('cors');

app.use(express.json());
app.use(cors());
require("./conn/connection");

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api", auth);
app.use("/api", list);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
