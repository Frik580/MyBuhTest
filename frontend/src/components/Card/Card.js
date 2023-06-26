import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Card.css";
import logo from "../../images/logo.svg";
import useFilterById from "../../hooks/UseFilterById";
import SubmitPopup from "../SubmitPopup/SubmitPopup";
import EditPopup from "../EditPopup/EditPopup";

function Card({ company, ownerships, onDeleteCard, onChangeCard }) {
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [ownershipsForm, setOwnershipsForm] = useState({});
  const filterOwnershipsForm = useFilterById(ownerships, company.ownership_id);

  useEffect(() => {
    setOwnershipsForm(filterOwnershipsForm);
  }, [company, filterOwnershipsForm, ownerships]);

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

      {createPortal(
        <EditPopup
          card={company}
          ownerships={ownerships}
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          onChangeCard={(data) => {
            onChangeCard(data);
            setIsEditPopupOpen(false);
          }}
        />,
        document.getElementById("popup")
      )}
      <button
        onClick={() => setIsEditPopupOpen((isOpen) => !isOpen)}
        className={"card__button card__button_type_edit hover-button"}
        type="button"
      />

      {createPortal(
        <SubmitPopup
          card={company}
          isOpen={isSubmitPopupOpen}
          onClose={() => setIsSubmitPopupOpen(false)}
          onDeleteCard={(data) => {
            onDeleteCard(data);
            setIsSubmitPopupOpen(false);
          }}
        />,
        document.getElementById("popup")
      )}
      <button
        onClick={() => setIsSubmitPopupOpen((isOpen) => !isOpen)}
        className={"card__button card__button_type_delete hover-button"}
        type="button"
      />
    </li>
  );
}

export default Card;
