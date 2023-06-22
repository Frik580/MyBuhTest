import React, { useEffect, useState } from "react";
import "./Card.css";
import logo from "../../images/logo.svg";
import useFilterById from "../../hooks/UseFilterById";

function Card({ company, ownerships, onCardDelete, onCardChange }) {
  const [ownershipsForm, setOwnershipsForm] = useState({});
  const filterOwnershipsForm = useFilterById(ownerships, company.ownership_id);

  useEffect(() => {
    setOwnershipsForm(filterOwnershipsForm);
  }, [company, ownerships]);

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
