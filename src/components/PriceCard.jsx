import React from "react";

import "../css/components/PriceCard.css";

const PriceCard = React.memo(
  ({ title, price, services, priceSuv, priceTransporter, info }) => {
    return (
      <div className="price-card">
        <header>
          <p>{title}</p>
          <strong>
            <small>€</small>
            {price}
          </strong>
        </header>
        <ul>
          {services.map((service, index) => (
            <li key={`service-item-${index + 1}`}>{service}</li>
          ))}
        </ul>
        <footer>
          {priceSuv && (
            <span>
              <strong>Cijena za SUV:</strong> +€{priceSuv}
            </span>
          )}
          {priceTransporter && (
            <span>
              <strong>Cijena za Transporter:</strong> +€{priceTransporter}
            </span>
          )}
          {info && (
            <span>
              <strong>Info:</strong> {info}
            </span>
          )}
        </footer>
      </div>
    );
  }
);

export default PriceCard;
