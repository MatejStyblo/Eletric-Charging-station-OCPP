// PriceDisplay.js
import React from "react";

const PriceDisplay = ({
  pricePerKWh,
  priceIwant,
  inputValue,
  onInputChange,
  onBuyClick,
  buying,
  onStopClick,
  chargingData,
  isPlugged
}) => {
    
  return (
    <div className="pricing-block">
      <h3 className="actual-price">Aktuální Cena</h3>
      <h3 className="price">{pricePerKWh.toFixed(2)} Kč/KWh</h3>
      <label>
        <input
          type="number"
          placeholder="Cena v kč za KWh"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </label>
      {!buying ? (
        <button className="button-price" onClick={onBuyClick}>
          Nabíjet
        </button>
      ) : priceIwant < pricePerKWh ? (
        <button className="stop-buying" onClick={onStopClick}>
          Čeká se na danou cenu za KWh/h
        </button>
      ) : isPlugged ? (
        <button className="stop-buying" onClick={onStopClick}>
          Nenakupovat
        </button>
      ): <button className="stop-buying">
          Není připojený auto
        </button>}
    </div>
  );
};

export default PriceDisplay;
