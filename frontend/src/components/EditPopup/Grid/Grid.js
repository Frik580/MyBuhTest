import "./Grid.css";
import React, { useState, useEffect } from "react";

function Grid({ id, ownerships, onChangeId }) {
  const [childs, setChilds] = useState([]);
  const [child, setChild] = useState({});
  const [parent, setParent] = useState({});
  const [isGridOpen, setIsGridOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const data = ownerships.filter((element) => element.parent_id === id);
      setChilds(data);
    }
  }, [id, ownerships]);

  useEffect(() => {
    if (id) {
      const card = ownerships.filter((element) => element.id === id);
      setChild(card[0]);
      card[0].parent_id
        ? setChilds(
            ownerships.filter(
              (element) => element.parent_id === card[0].parent_id
            )
          )
        : setParent(card[0]);
    }
  }, [id, ownerships]);

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
          <p className="grid__title">{child.full}</p>
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
          <li className="grid__text" onClick={() => onChangeId(parent.id)}>
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
