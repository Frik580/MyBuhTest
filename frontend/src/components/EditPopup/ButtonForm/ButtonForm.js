import "./ButtonForm.css";

function ButtonForm({ isActive, onChange, text }) {
  return (
    <button
      onClick={onChange}
      className={`button hover-button ${isActive && "button_active"}`}
      type="button"
    >
      {text}
    </button>
  );
}

export default ButtonForm;
