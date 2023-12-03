import { useState } from "react";
import "./Main.css";
import Table from "../Table/Table";

function Main({ t }) {
  const [wallet, setWallet] = useState("");

  function handleChangeWallet(e) {
    setWallet(e.target.value);
  }

  return (
    <div className="main">
      <h1 className="main__title">{t("main_title")}</h1>
      <p className="main__text">{t("main_text")}</p>
      <input
        className="main__search"
        type="text"
        value={wallet}
        placeholder={t("search")}
        onChange={handleChangeWallet}
      />

      <div className="main__table">
        <Table t={t} />
      </div>
    </div>
  );
}

export default Main;
