import React, { useEffect, useState, useCallback, useReducer } from "react";
import "./EditPopup.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import ButtonForm from "./ButtonForm/ButtonForm";
import Grid from "./Grid/Grid";
import useFilterById from "../../hooks/UseFilterById";
import useCloseByEsc from "../../hooks/UseCloseByEsc";

function EditPopup({ card, ownerships, isOpen, onClose, onChangeCard }) {
  const [states, setStates] = useState("");
  const [ownershipsForm, setOwnershipsForm] = useState({});
  const [ownershipId, setOwnershipId] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const filterOwnershipId = useFilterById(ownerships, card.ownership_id);
  const filterOwnershipsForm = useFilterById(ownerships, ownershipId);

  useCloseByEsc(onClose);

  const reducer = (state, action) => {
    switch (action?.type) {
      case "setToo": {
        return {
          too: true,
        };
      }

      case "setIp": {
        return {
          ip: true,
        };
      }

      case "setOther": {
        return {
          other: true,
        };
      }

      case "setJur": {
        return {
          other: true,
          jur: true,
        };
      }

      case "setChp": {
        return {
          other: true,
          chp: true,
        };
      }

      case "setFiz": {
        return {
          other: true,
          fiz: true,
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    too: false,
    ip: false,
    other: false,
    jur: false,
    chp: false,
    fiz: false,
  });

  const setFocus = useCallback(
    (element) => {
      element?.focus();
    },
    [isOpen]
  );

  useEffect(() => {
    setOwnershipId(filterOwnershipId?.id);
  }, [isOpen, card, ownerships, filterOwnershipId?.id]);

  useEffect(() => {
    setOwnershipsForm(filterOwnershipsForm);
  }, [ownerships, ownershipId, filterOwnershipsForm]);

  useEffect(() => {
    setStates({
      name: card.company_name,
      tin: card.company_tin,
      id: card.ownership_id,
    });
  }, [card, isOpen]);

  // Проверка валидности (isValid)
  useEffect(() => {
    (card.company_name === states.name &&
      card.company_tin === states.tin &&
      card.ownership_id === ownershipId) ||
    !ownershipId
      ? setIsValid(false)
      : setIsValid(true);
  }, [isOpen, card, states, ownershipId]);

  const handleInputChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeCard([
      {
        company_id: card.company_id,
        company_name: states.name,
        company_tin: states.tin,
        ownership_id: ownershipId,
        logo: card.logo,
      },
      card,
    ]);
  };

  useEffect(() => {
    ownershipId !== 1 && ownershipId !== 14 && dispatch({ type: "setOther" });
    ownershipId === 1 && dispatch({ type: "setToo" });
    ownershipId === 14 && dispatch({ type: "setIp" });
    ((ownershipId >= 2 && ownershipId <= 13) || ownershipId === 21) &&
      dispatch({ type: "setJur" });
    ownershipId >= 15 && ownershipId <= 19 && dispatch({ type: "setChp" });
    ownershipId === 20 && dispatch({ type: "setFiz" });
  }, [isOpen, ownershipId]);

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
            isActive={state.too}
            onChange={() => setOwnershipId(1)}
            text="ТОО"
          />
          <ButtonForm
            isActive={state.ip}
            onChange={() => setOwnershipId(14)}
            text="ИП"
          />
          <ButtonForm
            isActive={state.other}
            onChange={() => setOwnershipId(false)}
            text="Прочие"
          />
        </div>

        {!!state.other && (
          <>
            <FilterCheckbox
              isActive={state.jur}
              onChange={() => setOwnershipId(2)}
              text="Юридические лица"
            />
            <FilterCheckbox
              isActive={state.chp}
              onChange={() => setOwnershipId(15)}
              text="Частная практика"
            />
            <FilterCheckbox
              isActive={state.fiz}
              onChange={() => setOwnershipId(20)}
              text="Физические лица"
            />

            {isOpen && ownershipId && ownershipId !== 20 && (
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
              ref={setFocus}
              value={states.tin || ""}
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
              {!!ownershipsForm && ownershipsForm.short}
            </p>
            <input
              type="text"
              value={states.name || ""}
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
