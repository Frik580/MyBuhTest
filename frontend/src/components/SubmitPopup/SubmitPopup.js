import React, { useEffect, useState } from "react";
import "./SubmitPopup.css";

function SubmitPopup({ card, isOpen, onClose, onDeleteCard }) {
  
  useEffect(() => {
    const handleEscClose = (e) => {
      e.key === "Escape" && onClose();
    };
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className={`submitpopup ${isOpen && "submitpopup_opened"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="submitpopup__conteiner"
      >
        <button
          onClick={onClose}
          className="submitpopup__close-button hover-button"
          type="button"
        />
        <h3 className="submitpopup__title">Удаление организации</h3>
        <p className="submitpopup__text">
          Вы уверены, что хотите удалить организацию из списка?
        </p>
        <div className="submitpopup__buttons">
          <button
            onClick={onClose}
            className="submitpopup__cancel-button hover-button"
            type="button"
          >
            Отменить
          </button>
          <button
            onClick={() => onDeleteCard(card)}
            className="submitpopup__delete-button hover-button"
            type="button"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitPopup;
