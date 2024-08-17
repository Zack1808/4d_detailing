import React from "react";

import { Button } from "../components";

import "../css/components/PriceCard.css";

const PriceCard = React.memo(
  ({ price, title, list, priceSuv, priceTransporter, info }) => {
    return (
      <div className="price-card-container">
        <h4>{title}</h4>
        <h5>
          {price} <small>€</small>
        </h5>
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
