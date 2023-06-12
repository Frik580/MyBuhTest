import { useState, useEffect } from "react";
import "./App.css";
import Main from "./Main/Main";
import EditPopup from "./EditPopup/EditPopup";
import SubmitPopup from "./SubmitPopup/SubmitPopup";
import { getCompanies, getOwnerships } from "../utils/DataApi";

function App() {
  const [companies, setCompanies] = useState([]);
  const [ownerships, setOwnerships] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [changedCard, setChangedCard] = useState({});

  useEffect(() => {
    setIsPreloader(true);
    const promises = [getCompanies(), getOwnerships()];
    Promise.all(promises)
      .then((res) => {
        setCompanies(res[0]);
        setOwnerships(res[1]);
      })
      .catch((err) => {
        console.log(err);
        // setMessageError(
        //   "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        // );
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }, []);

  const handleCardDelete = (card) => {
    const id = card.company_id;
    const newCompanies = companies.filter((card) => card.company_id !== id);
    setCompanies(newCompanies);
    setIsSubmitPopupOpen(false);
  };

  const handleCardChange = (card) => {
    console.log(companies.indexOf(card[1]));
    const index = companies.indexOf(card[1]);
    companies[index] = card[0];
    setIsEditPopupOpen(false);
  };

  return (
    <div className="root">
      <Main
        companies={companies}
        ownerships={ownerships}
        isPreloader={isPreloader}
        onCardDelete={(data) => {
          setDeletedCard(data);
          setIsSubmitPopupOpen(true);
        }}
        onCardChange={(data) => {
          setChangedCard(data);
          setIsEditPopupOpen(true);
        }}
      />
      <EditPopup
        card={changedCard}
        ownerships={ownerships}
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onChangeCard={handleCardChange}
      />
      <SubmitPopup
        card={deletedCard}
        isOpen={isSubmitPopupOpen}
        onClose={() => setIsSubmitPopupOpen(false)}
        onDeleteCard={handleCardDelete}
      />
    </div>
  );
}

export default App;
