import "./CardList.css";
import Card from "../Card/Card";

function CardList({ companies, onDeleteCard, onChangeCard }) {
  return (
    <ul className="cardlist">
      {companies.map((company) => (
        <Card
          key={company.company_id}
          company={company}
          onDeleteCard={onDeleteCard}
          onChangeCard={onChangeCard}
        />
      ))}
    </ul>
  );
}

export default CardList;
