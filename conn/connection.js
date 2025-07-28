const mongoose = require("mongoose");

const con = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:user@cluster0.1fu9qvd.mongodb.net/");
    console.log("Connected");
  } catch (err) {
    console.log("Not Connected");
  }
};

con();
