import { useEffect, useState } from "react";
import "./Main.css";
import Table from "../Table/Table";
import WalletsSortingTh from "../WalletsSortingTh/WalletsSortingTh";
import WalletsSortingTd from "../WalletsSortingTd/WalletsSortingTd";

function Main({
  t,
  getAllWallets,
  allWallets,
  roundData,
  roundData2,
  getDate,
  parameters,
  setParameters,
  minMaxFilters
}) {
  const [wallet, setWallet] = useState("");
  const [sorting, setSorting] = useState({
    name: parameters.sorting.name,
    value: parameters.sorting.value,
  });

  useEffect(() => {
    getAllWallets(parameters);
  }, []);

  useEffect(() => {
    if (sorting.name.length !== 0) {
      let res = parameters;

      res.sorting.value = sorting.value;

      if (sorting.value === "down" || sorting.value === "up") {
        res.sorting.name = sorting.name;
      } else {
        res.sorting.name = "";
      }

      res.isParameters = checkParameters(res);

      localStorage.setItem("parameters", JSON.stringify(res));
      setParameters(res);
      getAllWallets(res);
    }
    
  }, [sorting]);

  function checkParameters(param) {
    if (param.sorting.name.length === 0 && param.sorting.value === "none" && param.filters.length === 0) {
      return false;
    } else {
      return true;
    }
  }

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
      if (parameters.sorting.value === "down") {
        newValue = "up";
      } else if (parameters.sorting.value === "up") {
        newValue = "none";
      } else if (parameters.sorting.value === "none") {
        newValue = "down";
      }
    }

    setSorting({
      name: newName,
      value: newValue,
    });
  }

  function filterTable(name, min, max) {
    let res = parameters;

    const nameMin = `${name}__gte`;
    const nameMax = `${name}__lte`;

    if (res.filters.length === 0) {
      res.filters.push({
        name: nameMin,
        value: min
      });
      res.filters.push({
        name: nameMax,
        value: max
      });
    } else {
      let isNew = true;

      res.filters.map((filter) => {
        if (filter.name === nameMin) {
          isNew = false;
          return filter.value = min;
        } else if (filter.name === nameMax) {
          isNew = false;
          return filter.value = max;
        }
      });

      if (isNew) {
        res.filters.push({
          name: nameMin,
          value: min
        });
        res.filters.push({
          name: nameMax,
          value: max
        });
      }
    }

    res.isParameters = checkParameters(res);

    localStorage.setItem("parameters", JSON.stringify(res));
    setParameters(res);
    getAllWallets(res);
  }

  function clearFilterTable(name) {
    if (parameters.filters.length !== 0) {
      let res = parameters;

      const nameMin = `${name}__gte`;
      const nameMax = `${name}__lte`;

      res.filters = res.filters.filter((item) => {
        if (item.name !== nameMin && item.name !== nameMax) {
          return true;
        } else {
          return false;
        }
      });

      res.isParameters = checkParameters(res);

      localStorage.setItem("parameters", JSON.stringify(res));
      setParameters(res);
      getAllWallets(res);
    }
  }

  function setTableHead() {
    return (
      <tr>
        <th id="walletId">{t("table_th_1")}</th>
        <WalletsSortingTh
          name="pnl"
          sortTable={sortTable}
          sorting={sorting}
          text={t("table_th_2")}
          isFilter={true}
          t={t}
          minMaxFilters={minMaxFilters}
          filterTable={filterTable}
          clearFilterTable={clearFilterTable}
          roundData={roundData2}
        />
        <WalletsSortingTh
          name="roi"
          sortTable={sortTable}
          sorting={sorting}
          text={t("table_th_3")}
          isFilter={true}
          t={t}
          minMaxFilters={minMaxFilters}
          filterTable={filterTable}
          clearFilterTable={clearFilterTable}
          roundData={roundData2}
        />
        <WalletsSortingTh
          name="win_rate_perc"
          sortTable={sortTable}
          sorting={sorting}
          text={t("table_th_4")}
          isFilter={true}
          t={t}
          minMaxFilters={minMaxFilters}
          filterTable={filterTable}
          clearFilterTable={clearFilterTable}
          roundData={roundData2}
        />
        <WalletsSortingTh
          name="overall_tokens"
          sortTable={sortTable}
          sorting={sorting}
          text={t("table_th_5")}
          isFilter={true}
          t={t}
          minMaxFilters={minMaxFilters}
          filterTable={filterTable}
          clearFilterTable={clearFilterTable}
          roundData={roundData}
        />
        <WalletsSortingTh
          name="last_activity"
          sortTable={sortTable}
          sorting={sorting}
          text={t("table_th_6")}
          isFilter={false}
          t={t}
        />
      </tr>
    );
  }

  function setTableBody(data) {
    return data.map((item) => {
      return (
        <tr key={item.address}>
          <WalletsSortingTd
            link={item.address}
            text={reductionWallet(item.address)}
          />
          <WalletsSortingTd link={item.address} text={`${roundData2(item.pnl)} ETH`} />
          <WalletsSortingTd
            link={item.address}
            text={`${roundData2(Number(item.roi))}%`}
          />
          <WalletsSortingTd
            link={item.address}
            text={`${roundData(Number(item.win_rate_perc))}%`}
          />
          <WalletsSortingTd
            link={item.address}
            text={roundData(item.overall_tokens)}
          />
          <WalletsSortingTd
            link={item.address}
            text={getDate(item.last_activity)}
          />
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
