const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb+srv://matej:1VQHS81sHST6THFW@chagringdb.a8jm9.mongodb.net/?retryWrites=true&w=majority&appName=ChagringDB&tls=true";
const client = new MongoClient(uri);

let usersCollection;
let chargingCollection;
const connectToDatabase = async () => {
  try {
    await client.connect();
    usersCollection = client.db("chagringDB").collection("users");
    chargingCollection = client.db("chagringDB").collection("charging");

    console.log("Connected to MongoDB");
    await initUsers();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const initUsers = async () => {
  const existingUsers = await usersCollection.find({}).toArray(); // Odebráno "?" pro bezpečnější volání

  if (existingUsers.length === 0) {
    const hashedAdminPassword = await bcrypt.hash("olenkyfaro", 10);
    const hashedUserPassword = await bcrypt.hash("userpassword", 10);

    await usersCollection.insertMany([
      { username: "Olenka", password: hashedAdminPassword },
      { username: "Filip", password: hashedUserPassword }
    ]);
    console.log("Default users added to the database.");
  }
};

const getChargingCollection = () => chargingCollection;
const getUsersCollection = () => usersCollection;

module.exports = { connectToDatabase, getUsersCollection, getChargingCollection };
