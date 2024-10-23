// PriceDisplay.js
import React from "react";

const PriceDisplay = ({
  loading,
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
console.log(priceIwant < pricePerKWh);
console.log(priceIwant);
console.log(pricePerKWh);

  return (
    <div className="pricing-block">
      {loading ? (
        <div>
          <h3 className="actual-price">Aktuální Cena</h3>
          <div className="loader"></div> {/* Upraveno na className */}
        </div>
      ) : (
        <>
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
          ) : (
            <button className="stop-buying">
              Není připojené auto
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PriceDisplay;
