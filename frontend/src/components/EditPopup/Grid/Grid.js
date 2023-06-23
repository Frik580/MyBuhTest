import "./Grid.css";
import React, { useState, useEffect } from "react";
import useFilterById from "../../../hooks/UseFilterById";

function Grid({ id, ownerships, onChangeId }) {
  const [childs, setChilds] = useState([]);
  const [parent, setParent] = useState({});
  const [card, setCard] = useState({});
  const [isGridOpen, setIsGridOpen] = useState(false);

  const filterCard = useFilterById(ownerships, id);
  const filterParent = useFilterById(ownerships, filterCard.parent_id);

  useEffect(() => {
    setCard(filterCard);
    if (filterCard.parent_id) {
      setChilds(
        ownerships.filter(
          (element) => element.parent_id === filterCard.parent_id
        )
      );
      setParent(filterParent);
    } else {
      setChilds(
        ownerships.filter((element) => element.parent_id === filterCard.id)
      );
      setParent(filterCard);
    }
  }, [filterCard, filterParent, id, ownerships]);

  return (
    <div className="grid-conteiner">
      <div
        className="grid"
        style={{
          // плавное открытие списка форм собственности
          gridTemplateRows: isGridOpen && `auto 160px`,
        }}
      >
        <div className="grid__top">
          <p className="grid__title">{card.full}</p>
          <div className="grid__navigation">
            <button
              onClick={() => setIsGridOpen(!isGridOpen)}
              className={`hover ${
                isGridOpen ? "grid__close-button" : "grid__open-button"
              }`}
              type="button"
            />
          </div>
        </div>
        <ul className={isGridOpen ? "grid__bottom_active" : "grid__bottom"}>
          <li
            key={parent.id}
            className="grid__text"
            onClick={() => onChangeId(parent.id)}
          >
            {parent.full}
          </li>
          {childs.map((item) => (
            <li
              key={item.id}
              onClick={() => onChangeId(item.id)}
              className="grid__text"
            >
              {item.full}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Grid;
