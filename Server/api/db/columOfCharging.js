const { getChargingCollection } = require("./users"); // Importuj funkci pro získání kolekce

// Funkce pro uložení informací o nabíjení
const saveChargingData = async (userId, date, status, cost) => {
  const chargingCollection = getChargingCollection();
  
  try {
    const existingEntry = await chargingCollection.findOne({ userId, date });

    if (existingEntry) {
      existingEntry.cost = (parseFloat(existingEntry.cost) + parseFloat(cost)).toString();
      existingEntry.status = status;
      await chargingCollection.updateOne({ userId, date }, { $set: existingEntry });
      return existingEntry;
    } else {
      const newEntry = {
        userId,
        date,
        cost,
        status,
      };
      await chargingCollection.insertOne(newEntry);
      return newEntry;
    }
  } catch (error) {
    console.error("Error saving charging data:", error);
    throw error; // Možná budete chtít znovu vyhodit chybu
  }
};



module.exports = { saveChargingData };
