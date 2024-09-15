// MainPage.js
import React, { useEffect, useState } from "react";
import PriceDisplay from "../priceDisplay/priceDisplay"
import ChargingStatus from "../chargingStatus/chargingStatus"

const MainPage = () => {
  const [data, setData] = useState([]);
  const [actualPrice, setActualPrice] = useState("");
  const [priceIwant, setPriceIwant] = useState("");
  const [nextHourPrice, setNextHourPrice] = useState("");
  const [inputValue, setInputValue] = useState(0);
  const [buying, setBuying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalCost, setTotalCost] = useState("N/A");
const [fetchError, setFetchError] = useState(null);
const [chargingError, setChargingError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [chargingResult, setChargingResult] = useState(null)

useEffect(() => {
  const fetchChargingData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/charging/data");
      const result = await response.json();
      setChargingResult(result); // Nastaví data do stavu
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  fetchChargingData();
  const intervalId = setInterval(fetchChargingData, 5000); // Aktualizuje každých 5 sekund

  return () => clearInterval(intervalId); // Vyčistí interval při odpojení komponenty
}, []);

  
const calculateTotalCost = () => {
  if (startTime && endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours = (end - start) / (1000 * 60 * 60);

    // Přepočet celkových nákladů
    const totalCost = durationInHours * pricePerKWh;
    console.log(totalCost);
    
    return totalCost.toFixed(2)*25; // Vrátit náklady na dvě desetinná místa
  }
  return "N/A";
};
 const calculateCurrentCycleCost = () => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const durationInHours = (end - start) / (1000 * 60 * 60);
      const currentCycleCost = durationInHours * pricePerKWh;
      return currentCycleCost.toFixed(2);
    }
    return 0;
  };

  useEffect(() => {
   const fetchData = async () => {
  setIsLoading(true);
  setFetchError(null); // Reset previous errors
  try {
    const response = await fetch("http://localhost:5000/api/scrape");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    setData(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    setFetchError(error.message);
  } finally {
    setIsLoading(false);
  }
}

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

 

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours() + 1;
    const filterByHour = data?.filter((entry) => Number(entry.hour) === currentHour);
    const filterByNextHour = data?.filter((entry) => Number(entry.hour) === currentHour + 1);

    if (filterByHour.length > 0) {
      setActualPrice(filterByHour[0].price);
    }
    if (filterByNextHour.length > 0) {
      setNextHourPrice(filterByNextHour[0].price);
    }
  }, [data]);

 useEffect(() => {
  const actualPriceNumber = parseFloat(actualPrice.replace(",", "."));
  const pricePerKWh = (actualPriceNumber / 1000) * 25;

  if (pricePerKWh < parseFloat(priceIwant) && buying) {
    if (!startTime) {
      toggleCharging(true); // Spustí nabíjení
      setStartTime(new Date());
    }
  } else {
    if (startTime) {
      setEndTime(new Date());
      toggleCharging(false); // Ukončí nabíjení
    }
  }
}, [actualPrice, buying, priceIwant, startTime]); // Přidej startTime jako závislost


  useEffect(() => {
    const intervalId = setInterval(() => {

      if (startTime) {
        setTotalCost(calculateTotalCost());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [buying, startTime, endTime]);

const toggleCharging = async () => {
  setChargingError(null);

  try {
    // Nejprve získáme aktuální status nabíjení
    const statusResponse = await fetch("http://localhost:5000/api/charging/data");
    if (!statusResponse.ok) {
      throw new Error(`Error: ${statusResponse.status}`);
    }

    const statusResult = await statusResponse.json();
    console.log("Current status:", statusResult);

    // Pokud je aktuální status "Charging", použijeme POST pro zastavení
    const isCharging = statusResult.data.status === "Charging";
    const newStatus = isCharging ? "notCharging" : "Charging";

    const response = await fetch("http://localhost:5000/api/charging/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    setChargingResult(result); // Uložení výsledku do stavu
    console.log(isCharging ? "Charging stopped:" : "Charging started:", result);
  } catch (error) {
    console.error(`Error handling charging:`, error);
    setChargingError(`Failed to handle charging. Please try again.`);
  }
};






const buyOnClick = () => {
  setBuying(true);
  setPriceIwant(inputValue);
  setStartTime(null);
  setEndTime(null);
};

const dontBuyOnClick = () => {
  setBuying(false);
  setInputValue(0);
  setPriceIwant("");
  if (startTime) {
    setEndTime(new Date());
  }
};

  const actualPriceString = String(actualPrice).replace(",", ".");
  const pricePerKWh = (actualPriceString / 1000) * 25;
  const nextPriceString = String(nextHourPrice).replace(",", ".");
  const nextPricePerKWh = (nextPriceString / 1000) * 25;
  const isPlugged = chargingResult?.data.connector_status === "Occupied"

  if (data.length === 0) {
    return <div className="loader"></div>;
  }

  return (
    <div className="all-content">
      <PriceDisplay
        loading={data.length === 0}
        pricePerKWh={pricePerKWh}
        actualPrice={actualPrice}
        inputValue={inputValue}
        onInputChange={(value) => setInputValue(value)}
        onBuyClick={buyOnClick}
        buying={buying}
        onStopClick={dontBuyOnClick}
        priceIwant={priceIwant}
        chargingData={chargingResult}
        isPlugged={isPlugged}


      />
      <ChargingStatus
        totalCost={totalCost}
        pricePerKWh={pricePerKWh}
        startTime={startTime}
        endTime={endTime}
        buying={buying}
        priceIwant={priceIwant}
        nextHourPrice={nextPricePerKWh.toFixed(2)}
        chargingData={chargingResult}
        isPlugged={isPlugged}

      />
    </div>
  );
};

export default MainPage;
