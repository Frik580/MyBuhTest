import "./Main.css";
import CardsList from "../CardList/CardList";
import Preloader from "../Preloader/Preloader";

function Main({
  companies,
  ownerships,
  isPreloader,
  onCardDelete,
  onCardChange,
}) {
  return (
    <section className="main">
      <h1 className="main__title">Мои организации</h1>
      {isPreloader && <Preloader />}
      <CardsList
        companies={companies}
        ownerships={ownerships}
        onCardDelete={onCardDelete}
        onCardChange={onCardChange}
      />
    </section>
  );
}

export default Main;
