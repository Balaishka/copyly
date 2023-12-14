import { useEffect, useState } from "react";
import "./Main.css";
import Table from "../Table/Table";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import WalletsSortingTh from "../WalletsSortingTh/WalletsSortingTh";
import WalletsSortingTd from "../WalletsSortingTd/WalletsSortingTd";

function Main({
  t,
  getAllWallets,
  allWallets,
  roundData,
  roundData2,
  getDate,
  sortWallets
}) {
  const [wallet, setWallet] = useState("");
  const [sorting, setSorting] = useState({
    name: "",
    value: "none",
  });

  useEffect(() => {
    getAllWallets();
    //sortWallets("pnl");
  }, []);

  useEffect(() => {
      if (sorting.value === "down") {
        sortWallets(sorting.name);
      } else if (sorting.value === "up") {
        sortWallets("-" + sorting.name);
      } else {
        getAllWallets();
      }
  }, [sorting]);

  function handleChangeWallet(e) {
    setWallet(e.target.value);
  }

  function reductionWallet(w) {
    return `${w[0]}${w[1]}${w[2]}${w[3]}...${w[w.length - 2]}${
      w[w.length - 1]
    }`;
  }

  function sortTable(e) {
    let newName = "";
    let newValue = "none";

    if (e.target.classList[0] === "table__img-sort") {
      newName = e.currentTarget.id;
    } else {
      newName = e.target.id;
    }

    if (sorting.name !== newName) {
      newValue = "down";
    } else {
      if (sorting.value === "down") {
        newValue = "up";
      } else if (sorting.value === "up") {
        newValue = "none";
      } else if (sorting.value === "none") {
        newValue = "down";
      }
    }
    
    console.log({
      name: newName,
      value: newValue,
    });

    setSorting({
      name: newName,
      value: newValue,
    });
  }

  function setTableHead() {
    return (
      <tr>
        <th id="walletId">{t("table_th_1")}</th>
        <WalletsSortingTh name="pnl" sortTable={sortTable} sorting={sorting} text={t("table_th_2")} isFilter={true} t={t} />
        <WalletsSortingTh name="profit_factor" sortTable={sortTable} sorting={sorting} text={t("table_th_3")} isFilter={true} t={t} />
        <WalletsSortingTh name="win_rate_perc" sortTable={sortTable} sorting={sorting} text={t("table_th_4")} isFilter={true} t={t} />
        <WalletsSortingTh name="overall_tokens" sortTable={sortTable} sorting={sorting} text={t("table_th_5")} isFilter={true} t={t} />
        <WalletsSortingTh name="last_activity" sortTable={sortTable} sorting={sorting} text={t("table_th_6")} isFilter={false} t={t} />
      </tr>
    );
  }

  function setTableBody(data) {
    return data.map((item) => {
      return (
        <tr key={item.address}>
          <WalletsSortingTd link={item.address} text={reductionWallet(item.address)} />
          <WalletsSortingTd link={item.address} text={roundData2(item.pnl)} />
          <WalletsSortingTd link={item.address} text={roundData2(item.profit_factor)} />
          <WalletsSortingTd link={item.address} text={roundData2(Number(item.win_rate_perc) * 100)} />
          <WalletsSortingTd link={item.address} text={roundData(item.overall_tokens)} />
          <WalletsSortingTd link={item.address} text={getDate(Number(item.last_activity) * 1000)} />
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
          table={allWallets}
          classTable="wallets"
          columns={6}
          setTableHead={setTableHead}
          setTableBody={setTableBody}
          lines={10}
        />
      </div>
    </div>
  );
}

export default Main;
