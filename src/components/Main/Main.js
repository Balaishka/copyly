import { useEffect, useState } from "react";
import "./Main.css";
import Table from "../Table/Table";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import WalletsSortingTh from "../WalletsSortingTh/WalletsSortingTh";

function Main({
  t,
  getAllWallets,
  allWallets,
  roundData,
  allFilteredWallets,
  setAllFilteredWallets,
  getDate,
}) {
  const [wallet, setWallet] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [sorting, setSorting] = useState({
    name: "",
    value: "none",
  });

  useEffect(() => {
    getAllWallets();
  }, []);

  useEffect(() => {
    if (wallet.length !== 0) {
      setIsSearch(true);
    } else if (sorting.value === "none") {
      setIsSearch(false);
      setAllFilteredWallets([]);
    }
  }, [wallet]);

  useEffect(() => {
    if (sorting.value !== "none") {
      const arr = isSearch ? [...allFilteredWallets] : [...allWallets];
      if (sorting.value === "down") {
        arr.sort(sortDown(sorting.name));
      } else if (sorting.value === "up") {
        arr.sort(sortUp(sorting.name));
      }
      
      setIsSearch(true);
      setAllFilteredWallets(arr);
    } else if (wallet.length === 0) {
      setIsSearch(false);
      setAllFilteredWallets([]);
    }
  }, [sorting]);

  function sortDown(name){
    return (a, b) => Number(a[name]) > Number(b[name]) ? 1 : -1;
  }

  function sortUp(name){
    return (a, b) => Number(a[name]) < Number(b[name]) ? 1 : -1;
  }

  function handleChangeWallet(e) {
    setWallet(e.target.value);
    const arr = allWallets.filter((wallet) => wallet.address.includes(e.target.value));

    if (sorting.value === "down") {
      arr.sort(sortDown(sorting.name));
    } else if (sorting.value === "up") {
      arr.sort(sortUp(sorting.name));
    }

    setAllFilteredWallets(arr);
  }

  function reductionWallet(w) {
    return `${w[0]}${w[1]}${w[2]}${w[3]}...${w[w.length - 2]}${
      w[w.length - 1]
    }`;
  }

  function sortTable(e) {
    let newValue = "none";
    if (sorting.name !== e.target.id) {
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

    setSorting({
      name: e.target.id,
      value: newValue,
    });
  }

  function setTableHead() {
    return (
      <tr>
        <th id="walletId">{t("table_th_1")}</th>
        <WalletsSortingTh name="pnl" sortTable={sortTable} sorting={sorting} text={t("table_th_2")} />
        <WalletsSortingTh name="profit_factor" sortTable={sortTable} sorting={sorting} text={t("table_th_3")} />
        <WalletsSortingTh name="win_rate_perc" sortTable={sortTable} sorting={sorting} text={t("table_th_4")} />
        <WalletsSortingTh name="overall_tokens" sortTable={sortTable} sorting={sorting} text={t("table_th_5")} />
        <WalletsSortingTh name="last_activity" sortTable={sortTable} sorting={sorting} text={t("table_th_6")} />
      </tr>
    );
  }

  function setTableBody(data) {
    return data.map((item) => {
      return (
        <tr key={item.address}>
          <td className="main__table-address">
            <NavLink
              className="main__table-link"
              to={`/wallet/${item.address}`}
            >
              <span className="main__table-reduction">
                {reductionWallet(item.address)}
              </span>
              {/* <span className="main__table-whole">{item.address}</span> */}
            </NavLink>
          </td>
          <td>
            <NavLink
              className="main__table-link"
              to={`/wallet/${item.address}`}
            >
              {roundData(item.pnl)}
            </NavLink>
          </td>
          <td>
            <NavLink
              className="main__table-link"
              to={`/wallet/${item.address}`}
            >
              {roundData(item.profit_factor)}%
            </NavLink>
          </td>
          <td>
            <NavLink
              className="main__table-link"
              to={`/wallet/${item.address}`}
            >
              {roundData(Number(item.win_rate_perc) * 100)}
            </NavLink>
          </td>
          <td>
            <NavLink
              className="main__table-link"
              to={`/wallet/${item.address}`}
            >
              {Number(item.overall_tokens).toFixed()}
            </NavLink>
          </td>
          <td>
            <NavLink
              className="main__table-link"
              to={`/wallet/${item.address}`}
            >
              {getDate(Number(item.last_activity) * 1000)}
            </NavLink>
          </td>
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
