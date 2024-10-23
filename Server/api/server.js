const express = require("express");
const scrapeData = require("./scrape");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectToDatabase, getUsersCollection, getChargingCollection } = require("./db/users");
const { saveChargingData } = require("./db/columOfCharging");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const usersCollection = getUsersCollection();
  
  const user = await usersCollection?.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
  res.json({ token, userId: user._id });
});



let chargingData = {
  message: "Stanice 1",
  data: {
    charger_id: "home_charger_123",
    status: "Charging",
    connector_id: 1,
    connector_status: "Occupied",
    power: "7.2kW",
    current: "32A",
    voltage: "230V",
    session: {
      transaction_id: "TX_123456789",
      start_time: new Date().toISOString(),
      end_time: null,
      energy_consumed: "5.5kWh",
      meter_start: "15000kWh",
      meter_now: "15005.5kWh",
    },
    error: null,
    authorization: {
      status: "Accepted",
      id_tag: "RFID_67890",
    },
  },
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.get("/api/user", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const usersCollection = getUsersCollection();

  try {
    const { ObjectId } = require("mongodb");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Error retrieving user data" });
  }
});
app.get("/api/scrape", async (req, res) => {
  try {
    const data = await scrapeData();
    res.json(data);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});

app.get("/api/charging/data", authenticateToken, (req, res) => {
  res.json(chargingData);
});

app.post("/api/charging/data", authenticateToken, async (req, res) => {
  const { status, cost } = req.body; 
  const userId = req.user.id;
  const date = new Date().toLocaleDateString('en-CA');
console.log(status);

  console.log("Incoming request data:", { userId, date, status, cost });

   if (status !== "Charging" && status !== "notCharging") {
    return res.status(400).json({ error: "Invalid status" });
  } 

  try {
    const result = await saveChargingData(userId, date, status, cost);
    console.log("Data saved successfully:", result);
    res.json({ message: `Status updated to ${status}`, data: result });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving charging data" });
  }
});


app.post("/api/charging/log", authenticateToken, async (req, res) => {
  const { cost, status } = req.body;
  const userId = req.user.id;
  const date = new Date().toLocaleDateString('en-CA');
console.log(date);

  try {
    const data = await saveChargingData(userId, date, status, cost);
    res.json({ message: "Charging data saved or updated", data });
  } catch (error) {
    console.error("Error saving charging data:", error);
    res.status(500).json({ error: "Error saving charging data" });
  }
});
app.get("/api/charging/logs", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const chargingCollection = getChargingCollection();
    const logs = await chargingCollection.find({ userId }, { projection: { date: 1, cost: 1 } }).toArray();
    res.json(logs);
  } catch (error) {
    console.error("Error retrieving charging logs:", error);
    res.status(500).json({ error: "Error retrieving charging logs" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
