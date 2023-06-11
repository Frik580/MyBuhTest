import "./FilterCheckbox.css";

function FilterCheckbox({ isActive, onChange, text }) {
  return (
    <div className="checkbox">
      <button
        onClick={onChange}
        className={`checkbox__tumb ${isActive && "checkbox__tumb_active"}`}
        type="button"
      />
      <p className={`checkbox__text ${isActive && "checkbox__text_active"}`}>{text}</p>
    </div>
  );
}

export default FilterCheckbox;
