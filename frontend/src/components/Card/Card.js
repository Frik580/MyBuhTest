import React, { useEffect, useState } from "react";
import "./Card.css";
import logo from "../../images/logo.svg";

function Card({ company, ownerships, onCardDelete, onCardChange }) {
  const [ownershipsForm, setOwnershipsForm] = useState({});

  useEffect(() => {
    const ownership = ownerships.filter(
      (element) => element.id === company.ownership_id
    );
    setOwnershipsForm(ownership[0]);
  }, []);

  return (
    <li className="card">
      <img
        src={company.logo ? company.logo : logo}
        className="card__logo"
        alt={"Лого компании"}
      />
      <div className="card__conteiner">
        <p className="card__text">
          {ownershipsForm.short} {company.company_name}
        </p>
        <p className="card__text">ИИН/БИН {company.company_tin}</p>
      </div>
      <button
        onClick={() => {
          onCardChange(company);
        }}
        className={"card__button card__button_type_edit hover-button"}
        type="button"
      />
      <button
        onClick={() => {
          onCardDelete(company);
        }}
        className={"card__button card__button_type_delete hover-button"}
        type="button"
      />
    </li>
  );
}

export default Card;
