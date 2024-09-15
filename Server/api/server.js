const express = require("express");
const scrapeData = require("./scrape");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware pro zpracování JSON dat

app.get("/", (req, res) => {
  res.send("Welcome to the Energy Price Scraper API!");
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
app.get("/api/scrape", async (req, res) => {
  try {
    const data = await scrapeData();
    res.json(data);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});
// Endpoint pro získání statusu (GET)
app.get("/api/charging/data", (req, res) => {
  res.json(chargingData);
});

// Endpoint pro změnu statusu (POST)
app.post("/api/charging/data", (req, res) => {
  const { status } = req.body; // Získání statusu z těla požadavku
  console.log(status);
  
  // Validace statusu
  if (status !== "Charging" && status !== "notCharging") {
    return res.status(400).json({ error: "Invalid status" });
  }

  // Aktualizace statusu
  chargingData.data.status = status;
  
  // Odeslání odpovědi
  res.json({ message: `Status updated to ${status}`, data: chargingData.data });
});
// Spuštění serveru
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
