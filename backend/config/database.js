const mongoose = require("mongoose");
require("dotenv").config();

const DbConnect = mongoose
  .connect(process.env.DB_URI, {
    dbName: "little_angle_admin",
  })
  .then(() => {
    console.log("dbConnected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = DbConnect;
