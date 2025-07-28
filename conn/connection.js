const mongoose = require("mongoose");

const con = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected");
  } catch (err) {
    console.log("Not Connected");
    console.log(err);
  }
};

con();
