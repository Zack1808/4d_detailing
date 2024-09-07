import React, { useCallback } from "react";

import { Button } from "../components";

import "../css/components/PriceCard.css";

const PriceCard = React.memo(
  ({ price, title, list, priceSuv, priceTransporter, info }) => {
    const returnPrice = useCallback(() => {
      if (typeof price === "number")
        return (
          <>
            {price} <small>€</small>
          </>
        );
      else {
        console.log(typeof price);
        let priceString = price.split(" ");
        const number = priceString[0].replace("€", "");
        priceString.shift();
        const text = priceString.join(" ");
        console.log(priceString);
        return (
          <>
            {number} <small>€</small> {text}
          </>
        );
      }
    }, []);

    return (
      <div className="price-card-container">
        <h4>{title}</h4>
        <h5>{returnPrice()}</h5>
        <ul>
          {list.map((item, index) => (
            <li key={item || index}>{item}</li>
          ))}
        </ul>
        <div className="price-card-added">
          {priceSuv && <span>SUV: +{priceSuv ? priceSuv : "n"}€</span>}
          {priceTransporter && (
            <span>
              Kombi i ostala transportna vozila: +
              {priceTransporter ? priceTransporter : "n"}€
            </span>
          )}
        </div>
        {info && <small>{info}</small>}

        <Button primary>Rezerviraj termin</Button>
      </div>
    );
  }
);

export default PriceCard;
