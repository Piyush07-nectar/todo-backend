const route = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

// Create
route.post("/addList", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existuser = await User.findById(id);
    if (existuser) {
      const list = new List({
        title,
        body,
        user: existuser,
      });
      await list.save();
      existuser.list.push(list);
      await existuser.save();
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update
route.put("/update/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existuser = await User.findOne({ email });
    if (existuser) {
      const list = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred" });
  }
});

// Delete
route.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existuser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
    if (existuser) {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred" });
  }
});

// Get tasks
route.get("/getTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    if (list.length === 0) {
      console.log("List is Empty");
      return res.status(200).json({ message: "List is Empty" });
    }
    return res.status(200).json({ list });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred" });
  }
});

module.exports = route;
