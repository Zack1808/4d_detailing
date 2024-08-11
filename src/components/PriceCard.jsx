import { Button } from "../components";

import "../css/components/PriceCard.css";

const PriceCard = ({ price, title, list, priceSuv, priceTransporter }) => {
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
        <span>SUV: +{priceSuv ? priceSuv : "n"}€</span>
        <span>
          Kombi i ostala transportna vozila: +
          {priceTransporter ? priceTransporter : "n"}€
        </span>
      </div>
      <small>
        Cijena usluge se može mjenjati ovisno o veličini i zaprljanosti vozila
      </small>

      <Button primary>Napravi termin</Button>
    </div>
  );
};

export default PriceCard;
