import "./Main.css";
import CardsList from "../CardList/CardList";
import Preloader from "../Preloader/Preloader";

function Main({
  companies,
  ownerships,
  isPreloader,
  onDeleteCard,
  onChangeCard,
}) {
  return (
    <section className="main">
      <h1 className="main__title">Мои организации</h1>
      {isPreloader && <Preloader />}
      <CardsList
        companies={companies}
        ownerships={ownerships}
        onDeleteCard={onDeleteCard}
        onChangeCard={onChangeCard}
      />
    </section>
  );
}

export default Main;
