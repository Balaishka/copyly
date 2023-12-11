import { useEffect, useState } from "react";
import "./Main.css";
import Table from "../Table/Table";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Main({ t, getAllWallets, allWallets, roundData, allFilteredWallets, setAllFilteredWallets, getDate }) {

  const [wallet, setWallet] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const tableHead = [
    t("table_th_1"),
    t("table_th_2"),
    t("table_th_3"),
    t("table_th_4"),
    t("table_th_5"),
    t("table_th_6"),
  ];

  useEffect(() => {
    getAllWallets();
  }, []);

  useEffect(() => {
    if (wallet.length !== 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [wallet]);

  function handleChangeWallet(e) {
    setWallet(e.target.value);

    setAllFilteredWallets(allWallets.filter((wallet) => wallet.address.includes(e.target.value)));
  }

  function reductionWallet(w) {
    return `${w[0]}${w[1]}${w[2]}${w[3]}...${w[w.length - 2]}${
      w[w.length - 1]
    }`;
  }

  function setTableBody(data) {
    return data.map((item) => {
      return (
          <tr key={item.address}>
          <td className="main__table-address">
            <NavLink className="main__table-link" to={`/wallet/${item.address}`}>
            <span className="main__table-reduction">{reductionWallet(item.address)}</span>
            {/* <span className="main__table-whole">{item.address}</span> */}
            </NavLink>
          </td>
          <td><NavLink className="main__table-link" to={`/wallet/${item.address}`}>{roundData(item.pnl)}</NavLink></td>
          <td><NavLink className="main__table-link" to={`/wallet/${item.address}`}>{roundData(item.profit_factor)}%</NavLink></td>
          <td><NavLink className="main__table-link" to={`/wallet/${item.address}`}>{roundData(Number(item.win_rate_perc) * 100)}</NavLink></td>
          <td><NavLink className="main__table-link" to={`/wallet/${item.address}`}>{roundData(item.overall_tokens)}</NavLink></td>
          <td><NavLink className="main__table-link" to={`/wallet/${item.address}`}>{getDate(Number(item.last_activity) * 1000)}</NavLink></td>
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
          table={isSearch ? allFilteredWallets : allWallets}
          classTable="wallets"
          tableHead={tableHead}
          setTableBody={setTableBody}
          lines={10}
        />
      </div>
    </div>
  );
}

export default Main;
