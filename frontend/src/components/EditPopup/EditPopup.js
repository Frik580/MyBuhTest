import React, { useEffect, useState, useRef } from "react";
import "./EditPopup.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import ButtonForm from "./ButtonForm/ButtonForm";
import Grid from "./Grid/Grid";

function EditPopup({ card, ownerships, isOpen, onClose, onChangeCard }) {
  const [state, setState] = useState("");
  const [ownershipsForm, setOwnershipsForm] = useState({});
  const [ownershipId, setOwnershipId] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [too, setToo] = useState(false);
  const [ip, setIp] = useState(false);
  const [other, setOther] = useState(false);
  const [jur, setJur] = useState(false);
  const [chp, setChp] = useState(false);
  const [fiz, setFiz] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const ownership = ownerships.filter(
      (element) => element.id === card.ownership_id
    );
    ownership && setOwnershipsForm(ownership[0]);
    ownership[0] && setOwnershipId(ownership[0].id);
  }, [card, ownerships, isOpen]);

  useEffect(() => {
    setState({
      name: card.company_name,
      tin: card.company_tin,
      id: card.ownership_id,
    });
    inputRef.current.focus();
  }, [card, isOpen]);

  // Проверка валидности (isValid)
  useEffect(() => {
    (card.company_name === state.name &&
      card.company_tin === state.tin &&
      card.ownership_id === ownershipId) ||
    !ownershipId
      ? setIsValid(false)
      : setIsValid(true);
  }, [isOpen, card, state, ownershipId]);

  // Слушатель Esc на закрытие попапа
  useEffect(() => {
    const handleEscClose = (e) => {
      e.key === "Escape" && onClose();
    };
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeCard([
      {
        company_id: card.company_id,
        company_name: state.name,
        company_tin: state.tin,
        ownership_id: ownershipId,
      },
      card,
    ]);
  };

  // отрисовка чекбоксов
  const cleanoff = () => {
    setToo(false);
    setIp(false);
    setOther(false);
    setJur(false);
    setChp(false);
    setFiz(false);
  };

  const renderSelect = () => {
    cleanoff();
    ownershipId === 1 && setToo(true);
    ownershipId === 14 && setIp(true);
    ((ownershipId >= 2 && ownershipId <= 13) || ownershipId === 21) &&
      setJur(true);
    ownershipId >= 15 && ownershipId <= 19 && setChp(true);
    ownershipId === 20 && setFiz(true);
    ownershipId !== 1 && ownershipId !== 14 && setOther(true);
  };

  useEffect(() => {
    ownershipsForm && renderSelect();
  }, [isOpen, ownershipId, ownershipsForm]);

  return (
    <div
      onClick={onClose}
      className={`editpopup ${isOpen && "editpopup_opened"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="editpopup__conteiner"
      >
        <button
          onClick={onClose}
          className="editpopup__close-button hover-button"
          type="button"
        />
        <h3 className="editpopup__title">Редактировать данные организации</h3>
        <div className="button-conteiner">
          <ButtonForm
            isActive={too}
            onChange={() => setOwnershipId(1)}
            text="ТОО"
          />
          <ButtonForm
            isActive={ip}
            onChange={() => setOwnershipId(14)}
            text="ИП"
          />
          <ButtonForm
            isActive={other}
            onChange={() => setOwnershipId(false)}
            text="Прочие"
          />
        </div>

        {other && (
          <>
            <FilterCheckbox
              isActive={jur}
              onChange={() => setOwnershipId(2)}
              text="Юридические лица"
            />
            <FilterCheckbox
              isActive={chp}
              onChange={() => setOwnershipId(15)}
              text="Частная практика"
            />
            <FilterCheckbox
              isActive={fiz}
              onChange={() => setOwnershipId(20)}
              text="Физические лица"
            />

            {ownershipId && ownershipId !== 20 && (
              <>
                <p className="popup-form__label">
                  Выберите форму собственности
                </p>
                <Grid
                  id={ownershipId}
                  ownerships={ownerships}
                  onChangeId={(data) => setOwnershipId(data)}
                />
              </>
            )}
          </>
        )}

        <form
          onSubmit={handleSubmit}
          className="popup-form"
          name="edit"
          noValidate
        >
          <label htmlFor="tin-id" className="popup-form__label">
            Введите ИИН/БИН
          </label>
          <fieldset className="popup-form__conteiner">
            <input
              type="text"
              value={state.tin || ""}
              onChange={handleInputChange}
              id="tin-id"
              name="tin"
              className="popup-form__item"
              minLength="2"
              maxLength="12"
              required
            />
            {/* <span id="about-error" className="error" /> */}
          </fieldset>

          <label htmlFor="name-id" className="popup-form__label">
            Введите название компании
          </label>
          <fieldset className="popup-form__conteiner">
            <p className="popup-form__text">
              {ownershipsForm && ownershipsForm.short}
            </p>
            <input
              type="text"
              ref={inputRef}
              value={state.name || ""}
              onChange={handleInputChange}
              id="name-id"
              name="name"
              className="popup-form__item"
              minLength="2"
              maxLength="20"
              required
            />
            {/* <span id="user-name-error" className="error" /> */}
          </fieldset>

          <button
            disabled={!isValid}
            className={
              !isValid
                ? "popup-form__button_disabled"
                : "popup-form__button hover-button"
            }
            type="submit"
            name="button"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPopup;
