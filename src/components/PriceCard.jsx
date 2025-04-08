import React from "react";

import "../css/components/PriceCard.css";

const PriceCard = React.memo(
  ({
    title,
    price,
    services,
    priceSuv,
    priceTransporter,
    info,
    hasDiscount,
    discount,
  }) => {
    return (
      <div className="price-card">
        {hasDiscount && <div className="discount">{discount} popusta</div>}
        <header>
          <h4>{title}</h4>
          <h4>
            <strong>
              <small>€</small>
              {price}
            </strong>
          </h4>
        </header>
        <div className="main">
          <ul>
            {services.map((service, index) => (
              <li key={`service-item-${index + 1}`}>{service}</li>
            ))}
          </ul>
          <div className="additional">
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
          </div>
        </div>
        <footer>
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
