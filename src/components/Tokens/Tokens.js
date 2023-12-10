import { useState } from "react";
import "./Tokens.css";
import Table from "../Table/Table";
import PieGraph from "../PieGraph/PieGraph";

function Tokens({ t, tokens, getDate, roundData }) {
  const [isTable, setIsTable] = useState(true);
  const tableHead = [
    t("name"),
    t("purchased"),
    t("sells"),
    "P&L",
    "ROI",
    t("date"),
    t("scam_title"),
  ];

  function toggleTokens() {
    setIsTable(!isTable);
  }

  function setTableBody(data) {
    return data.map((item) => {
      return (
        <tr
          key={item.address}
          className={`${
            item.pnl >= 0 ? "table-tokens__green" : "table-tokens__red"
          }`}
        >
          <td>
            <a href={`https://etherscan.io/token/${item.address}`} target="_blank">
              {item["info"]["token_name"]}
            </a>
          </td>
          <td>{roundData(item.bought)}</td>
          <td>{roundData(item.sold)}</td>
          <td>{roundData(item.pnl)}</td>
          <td>{roundData(item.roi)}</td>
          <td>{getDate(item.timestamp)}</td>
          <td>{item.rugpulled ? t("yes") : t("no")}</td>
        </tr>
      );
    });
  }

  return (
    <div className="tokens">
      <div className="tokens__header">
        <h2 className="tokens__title">{t("tokens")}</h2>
        <button className="tokens__switch" type="button" onClick={toggleTokens}>
          <span
            className={`tokens__case tokens__case_name_table ${
              isTable ? "tokens__case_active" : ""
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 1H1.5C1.36739 1 1.24021 1.05268 1.14645 1.14645C1.05268 1.24021 1 1.36739 1 1.5V10.5C1 10.6326 1.05268 10.7598 1.14645 10.8536C1.24021 10.9473 1.36739 11 1.5 11H10.5C10.6326 11 10.7598 10.9473 10.8536 10.8536C10.9473 10.7598 11 10.6326 11 10.5V1.5C11 1.36739 10.9473 1.24021 10.8536 1.14645C10.7598 1.05268 10.6326 1 10.5 1ZM4 10H2V8H4V10ZM4 7H2V5H4V7ZM7 10H5V8H7V10ZM7 7H5V5H7V7ZM10 4H2V2H10V4ZM10 10H8V8H10V10ZM10 7H8V5H10V7Z"
                fill="#95B0B4"
              />
            </svg>
          </span>

          <span
            className={`tokens__case tokens__case_name_diag ${
              isTable ? "" : "tokens__case_active"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 6H6V2.5C6 2.2 5.8 2 5.5 2C3 2 1 4 1 6.5C1 9 3 11 5.5 11C8 11 10 9 10 6.5C10 6.2 9.8 6 9.5 6ZM6 9.95C4.1 10.25 2.3 8.9 2.05 7C1.75 5.1 3.1 3.3 5 3.05V6.5C5 6.8 5.2 7 5.5 7H8.95C8.75 8.55 7.55 9.75 6 9.95ZM7.5 1C7.2 1 7 1.2 7 1.5V4.5C7 4.8 7.2 5 7.5 5H10.5C10.8 5 11 4.8 11 4.5C11 2.55 9.45 1 7.5 1ZM8 4V2.05C9 2.25 9.75 3 9.95 4H8Z"
                fill="#95B0B4"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="tokens__body">
        {isTable && tokens.length !== 0 ? (
          <Table
            t={t}
            table={tokens}
            classTable="tokens"
            tableHead={tableHead}
            setTableBody={setTableBody}
            lines={10}
          />
        ) : (
          <div className="tokens__pie">
            <PieGraph tokens={tokens} roundData={roundData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tokens;
