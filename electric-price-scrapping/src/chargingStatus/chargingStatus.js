// ChargingStatus.js
import { React, useState, useEffect } from "react";
import { SlEnergy } from "react-icons/sl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlugCircleMinus,
  faPlugCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { MdOutlineElectricCar } from "react-icons/md";

const ChargingStatus = ({
  totalCost,
  pricePerKWh,
  startTime,
  endTime,
  buying,
  priceIwant,
  nextHourPrice,
  totalSessionCost,
  chargingData,
  isPlugged,
  loading
}) => {
 if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <div className="blocks-of-electricity">
      <div className="block-of-info">
        <i>
          <MdOutlineElectricCar />{" "}
        </i>
        <h4 className="price-of-block">{totalCost}</h4>
        <h3 className="title-of-block">Celkové náklady</h3>
      </div>
      {
        <div
          className="block-of-info danger"
          style={{ background: isPlugged ? "green" : "red" }}
        >
          <i>
            {isPlugged ? (
              <FontAwesomeIcon icon={faPlugCirclePlus} />
            ) : (
              <FontAwesomeIcon icon={faPlugCircleMinus} />
            )}
          </i>
          <h3 className="title-of-block" style={{ color: "black" }}>
            Auto {isPlugged ? "je" : "není"} připojeno
          </h3>
        </div>
      }
      <div className="block-of-info">
        <i>
          <SlEnergy />
        </i>
        <h4 className="price-of-block">{nextHourPrice} Kč/KWh</h4>
        <h3 className="title-of-block">El. příští hodinu</h3>
      </div>{" "}
      <div className="block-of-info">
        <i>
          <SlEnergy />
        </i>
        <h4 className="price-of-block">{nextHourPrice} Kč/KWh</h4>
        <h3 className="title-of-block">El. příští hodinu</h3>
      </div>
      
      {/* {buying && pricePerKWh < priceIwant ? (
        <div>
          <h4 className="more-than-acual-price">
            Právě nakupuješ za cenu nižší než je {priceIwant} Kč/KWh
          </h4>
          {startTime && (
            <p className="charging-time">
              Nabíjení začalo: {startTime.toLocaleTimeString()}{" "}
              {endTime && `a skončilo: ${endTime.toLocaleTimeString()}`}
            </p>
          )}
       
        </div>
      ) : (
        <div>
          <h4 className="more-than-acual-price">Právě nenakupuješ</h4>
          {startTime && endTime && pricePerKWh < priceIwant && (
            <p className="charging-time">
              Poslední nabíjení od: {startTime.toLocaleTimeString()} do:
              {endTime.toLocaleTimeString()}
            </p>
          )}
          {pricePerKWh > priceIwant && buying && (
            <div className="will-buy">
              <h3>Začneš nakupovat pokud to klesne pod {priceIwant} Kč/KWh</h3>
            </div>
          )}
          <h4>
            V následující hodině bude cena elektriky {pricePerKWh.toFixed(2)} Kč/KWh
          </h4>
        </div>
      )} */}
    </div>
  );
};

export default ChargingStatus;
