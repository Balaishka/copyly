import { useState } from "react";
import "./Main.css";
import Table from "../Table/Table";
import { table, table2 } from "../../configs/constants";

function Main({ t }) {
  const [wallet, setWallet] = useState("");
  const tableHead = [
    t("table_th_1"),
    t("table_th_2"),
    t("table_th_3"),
    t("table_th_4"),
    t("table_th_5"),
    t("table_th_6"),
  ];

  function handleChangeWallet(e) {
    setWallet(e.target.value);
  }

  function reductionWallet(w) {
    return `${w[0]}${w[1]}${w[2]}${w[3]}...${w[w.length - 2]}${
      w[w.length - 1]
    }`;
  }

  function setTableBody(data) {
    return data.map((item) => {
      return (
        <tr key={item.wallet}>
          <td>{reductionWallet(item.wallet)}</td>
          <td>{item.pl}</td>
          <td>{item.dep}</td>
          <td>{item.proc}</td>
          <td>{item.tokens}</td>
          <td>{item.last}</td>
        </tr>
      );
    });
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
        <Table
          t={t}
          table={table}
          classTable=""
          tableHead={tableHead}
          setTableBody={setTableBody}
          lines={10}
        />
      </div>
    </div>
  );
}

export default Main;
