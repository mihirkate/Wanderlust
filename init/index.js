require('dotenv').config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const connectMongo = require('connect-mongo');
const session = require('express-session');
const { sampleListings } = require("./data.js");
const mongoUrl = process.env.MONGO_URL;
console.log(mongoUrl);
main().then(() => {
  console.log("connected to DB");
  initDB();
}).catch((err) => {
  console.error("Error connecting to DB:", err);
});

async function main() {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66061fbdccfd26a7db92156e",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
