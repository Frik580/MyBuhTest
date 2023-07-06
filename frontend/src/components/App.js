import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./Main/Main";
import { getCompanies, getOwnerships } from "../utils/DataApi";
import { OwnershipsContext } from "../contexts/OwnershipsContext";

function App() {
  const [companies, setCompanies] = useState([]);
  const [ownerships, setOwnerships] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);

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
  };

  const handleCardChange = (data) => {
    const index = companies.indexOf(data[1]);
    companies[index] = data[0];
    console.log(companies);
    setCompanies(companies.slice());
  };

  return (
    <OwnershipsContext.Provider value={ownerships}>
      <div className="root">
        <Main
          companies={companies}
          isPreloader={isPreloader}
          onDeleteCard={handleCardDelete}
          onChangeCard={handleCardChange}
        />

        {/* Portals */}
        <div id="popup" />
      </div>
    </OwnershipsContext.Provider>
  );
}

export default App;
