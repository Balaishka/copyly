import { useState } from "react";
import "./Repair.css";
import { password } from "../../configs/constants";

function Repair({ t, setIsRepair }) {
  const [pass, setPass] = useState("");
  const [prominent, setProminent] = useState(false);

  function handlePass(e) {
    setPass(e.target.value);
  }

  function handleEnter(e) {
    e.preventDefault();
    if (pass === password) {
        localStorage.setItem("prominent", true);
        setIsRepair(false);
    }
  }

  function handleBlock() {
    setProminent(true);
  }

  return (
    <div className="repair">
      {t("sorry")}
      {prominent && (
        <form>
          <input
            className="repair__input"
            placeholder={t("password")}
            value={pass}
            onChange={handlePass}
          />
          <button type="submit" onClick={handleEnter}>
            {t("enter")}
          </button>
        </form>
      )}

      <div className="repair__block" onClick={handleBlock}></div>
    </div>
  );
}

export default Repair;
