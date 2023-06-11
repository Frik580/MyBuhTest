import "./CardList.css";
import Card from "../Card/Card";

function CardList({ companies, ownerships, onCardDelete, onCardChange }) {
  return (
    <ul className="cardlist">
      {companies.map((company) => (
        <Card
          key={company.company_id}
          company={company}
          ownerships={ownerships}
          onCardDelete={onCardDelete}
          onCardChange={onCardChange}
        />
      ))}
    </ul>
  );
}

export default CardList;
