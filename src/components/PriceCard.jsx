import { Button } from "../components";

import "../css/components/PriceCard.css";

const PriceCard = ({
  price,
  title,
  list,
  priceSuv,
  priceTransporter,
  info,
}) => {
  return (
    <div className="price-card-container" tabIndex={1}>
      <h4>{title}</h4>
      <h5>
        {price} <small>€</small>
      </h5>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
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

      <Button primary>Napravi termin</Button>
    </div>
  );
};

export default PriceCard;
