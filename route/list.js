const route = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

// ✅ Create Task
route.post("/addList", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existuser = await User.findById(id);
    if (existuser) {
      const list = new List({ title, body, user: existuser._id });
      await list.save();
      existuser.list.push(list._id); // Push only the ID
      await existuser.save();
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding task" });
  }
});

// ✅ Update Task
route.put("/update/:id", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existuser = await User.findById(id);
    if (existuser) {
      const list = await List.findByIdAndUpdate(
        req.params.id,
        { title, body },
        { new: true }
      );
      return res.status(200).json({ list });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating task" });
  }
});

// ✅ Delete Task
route.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const existuser = await User.findByIdAndUpdate(userId, {
      $pull: { list: req.params.id },
    });
    if (existuser) {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// ✅ Get Tasks
route.get("/getTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length === 0) {
      return res.status(200).json({ message: "List is Empty", list: [] });
    }
    return res.status(200).json({ list });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

module.exports = route;
