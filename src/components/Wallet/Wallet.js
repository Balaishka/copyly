import "./Wallet.css";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import Fact from "../Fact/Fact";
import Balance from "../Balance/Balance";
import PnL from "../PnL/PnL";
import Tokens from "../Tokens/Tokens";

function Wallet({
  t,
  addZero,
  recordingData,
  getWallet,
  wallet,
  getDate,
  roundData,
  roundData2,
  roundData4,
  setWallet,
  subWallet,
  showClue,
  hideClue
}) {
  const [lastActivity, setLastActivity] = useState("");
  const [lastTime, setLastTime] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    setWallet({
      pnl: 0,
      profit_factor: "",
      win_rate_perc: "",
      overall_tokens: "",
      win_rate_amount: "",
      profits: "",
      losses: "",
      last_activity: 0,
      address: "",
      tokens: [],
      balance_chart: [],
      pnl_chart: [],
      user_followed: false,
      cur_balance: 0,
      rugged_perc: 0
    });
    getWallet(id);
  }, []);

  useEffect(() => {
    if (wallet.address.length !== 0) {
      const date = new Date(wallet.last_activity * 1000);
      const today = new Date();
      const diffDay = Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      const diffHours =
        Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60)) -
        diffDay * 24;

      setLastActivity(
        `${addZero(date.getDate())}.${addZero(date.getMonth())}.${addZero(
          date.getFullYear()
        )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
      );

      if (diffDay || diffHours) {
        setLastTime(
          `${diffDay ? diffDay + " " + t("day") + " " : ""}${
            diffHours ? diffHours + " " + t("hours") + " " : ""
          }${t("ago")}`
        );
      }
    }
  }, []);

  function toggleSign() {
    subWallet(wallet.address);
  }

  if (wallet.address.length === 0) {
    return <div className="wallet-error">Кошелек не найден</div>;
  } else {
    return (
      <div className="wallet">
        <section className="wallet__header">
          <div className="wallet__header-container">
            <div className="wallet__header-info">
              <NavLink to="/" className="wallet__back">
                <svg
                  className="wallet__back-img wallet__icon"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.6669 14.6668H12.5469L16.9469 10.2801C17.1979 10.029 17.339 9.68849 17.339 9.33342C17.339 8.97835 17.1979 8.63782 16.9469 8.38675C16.6958 8.13568 16.3553 7.99463 16.0002 7.99463C15.6451 7.99463 15.3046 8.13568 15.0535 8.38675L8.38685 15.0534C8.26547 15.1802 8.17031 15.3297 8.10685 15.4934C7.9735 15.818 7.9735 16.1821 8.10685 16.5068C8.17031 16.6704 8.26547 16.8199 8.38685 16.9467L15.0535 23.6134C15.1775 23.7384 15.3249 23.8376 15.4874 23.9053C15.6499 23.973 15.8242 24.0078 16.0002 24.0078C16.1762 24.0078 16.3505 23.973 16.513 23.9053C16.6754 23.8376 16.8229 23.7384 16.9469 23.6134C17.0718 23.4895 17.171 23.342 17.2387 23.1795C17.3064 23.017 17.3413 22.8428 17.3413 22.6667C17.3413 22.4907 17.3064 22.3165 17.2387 22.154C17.171 21.9915 17.0718 21.844 16.9469 21.7201L12.5469 17.3334H22.6669C23.0205 17.3334 23.3596 17.1929 23.6097 16.9429C23.8597 16.6928 24.0002 16.3537 24.0002 16.0001C24.0002 15.6465 23.8597 15.3073 23.6097 15.0573C23.3596 14.8072 23.0205 14.6668 22.6669 14.6668Z"
                    fill="#95B0B4"
                  />
                </svg>
              </NavLink>
              <div className="wallet__num">
                <h1 className="wallet__title">{wallet.address}</h1>
                <CopyToClipboard text={wallet.address}>
                  <svg
                    className="wallet__copy wallet__icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 20H8C7.20435 20 6.44129 19.6839 5.87868 19.1213C5.31607 18.5587 5 17.7956 5 17V7C5 6.73478 4.89464 6.48043 4.70711 6.29289C4.51957 6.10536 4.26522 6 4 6C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7V17C3 18.3261 3.52678 19.5979 4.46447 20.5355C5.40215 21.4732 6.67392 22 8 22H16C16.2652 22 16.5196 21.8946 16.7071 21.7071C16.8946 21.5196 17 21.2652 17 21C17 20.7348 16.8946 20.4804 16.7071 20.2929C16.5196 20.1054 16.2652 20 16 20ZM21 8.94C20.9896 8.84813 20.9695 8.75763 20.94 8.67V8.58C20.8919 8.47718 20.8278 8.38267 20.75 8.3L14.75 2.3C14.6673 2.22222 14.5728 2.15808 14.47 2.11H14.38L14.06 2H10C9.20435 2 8.44129 2.31607 7.87868 2.87868C7.31607 3.44129 7 4.20435 7 5V15C7 15.7956 7.31607 16.5587 7.87868 17.1213C8.44129 17.6839 9.20435 18 10 18H18C18.7956 18 19.5587 17.6839 20.1213 17.1213C20.6839 16.5587 21 15.7956 21 15V9C21 9 21 9 21 8.94ZM15 5.41L17.59 8H16C15.7348 8 15.4804 7.89464 15.2929 7.70711C15.1054 7.51957 15 7.26522 15 7V5.41ZM19 15C19 15.2652 18.8946 15.5196 18.7071 15.7071C18.5196 15.8946 18.2652 16 18 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4H13V7C13 7.79565 13.3161 8.55871 13.8787 9.12132C14.4413 9.68393 15.2044 10 16 10H19V15Z"
                      fill="#95B0B4"
                    />
                  </svg>
                </CopyToClipboard>
              </div>
            </div>

            <p className="wallet__last-activity">
              <span>{t("wallet_last_activity")}:</span>{" "}
              <span>
                {lastActivity} {lastTime.length !== 0 && <>({lastTime})</>}
              </span>
            </p>
          </div>

          <button
            type="button"
            className={`content__btn wallet__btn ${wallet.user_followed ? "wallet__btn_active":""}`}
            onClick={toggleSign}
          >
            {wallet.user_followed ? t("wallet_button_remove") : t("wallet_button_add")}
          </button>
        </section>

        <section className="wallet__info">
          <Fact title={t("balance")} info={`${roundData2(wallet.cur_balance)} ETH`} />
          <Fact title={t("income")} info={`${roundData2(wallet.pnl)} ETH`} />
          <Fact title={t("table_th_3")} info={`${roundData(wallet.roi)}%`} isQuestion={true} questionText={t("info_roi")} showClue={showClue} hideClue={hideClue} />

          <Fact
            title={t("succesfull")}
            info={`${roundData(wallet.win_rate_amount)}`}
            type="desctop"
            isQuestion={true} questionText={t("info_win_rate_amount")} showClue={showClue} hideClue={hideClue}
          />
          <Fact
            title={t("amount")}
            info={`${roundData(wallet.overall_tokens)}`}
            type="desctop"
          />

          <Fact title={t("profit")} info={`${roundData2(wallet.profits)} ETH`} type="mobile" isQuestion={true} questionText={t("info_profits")} showClue={showClue} hideClue={hideClue} />
          <Fact title={t("losts")} info={`${roundData2(wallet.losses)} ETH`} type="mobile" isQuestion={true} questionText={t("info_losses")} showClue={showClue} hideClue={hideClue} />
          <Fact
            title={t("profit_factor")}
            info={roundData(wallet.profit_factor)}
            type="mobile"
            isQuestion={true} questionText={t("info_profit_factor")} showClue={showClue} hideClue={hideClue}
          />
        </section>

        <section className="wallet__graphs">
          <div className="wallet__left">
            <Balance
              recordingData={recordingData}
              title={t("graph_balance")}
              data={wallet.balance_chart}
            />
            <PnL
              recordingData={recordingData}
              title={"Profit and Loss"}
              data={wallet.pnl_chart}
            />
          </div>
          <div className="wallet__right">
            <Tokens
              t={t}
              tokens={wallet.tokens}
              getDate={getDate}
              roundData={roundData2}
            />

            <div className="wallet__info wallet__info_type_bottom">
              <Fact title={t("profit")} info={`${roundData2(wallet.profits)} ETH`} type="desctop" isQuestion={true} questionText={t("info_profits")} showClue={showClue} hideClue={hideClue} />
              <Fact title={t("losts")} info={`${roundData2(wallet.losses)} ETH`} type="desctop" isQuestion={true} questionText={t("info_losses")} showClue={showClue} hideClue={hideClue} />
              <Fact
                title={t("profit_factor")}
                info={roundData(wallet.profit_factor)}
                type="desctop"
                isQuestion={true} questionText={t("info_profit_factor")} showClue={showClue} hideClue={hideClue}
              />
              <Fact title={t("scam")} info={`${roundData(wallet.rugged_perc)}%`} isQuestion={true} questionText={t("info_scam")} showClue={showClue} hideClue={hideClue} />

              <Fact
                title={t("succesfull")}
                info={`${roundData(wallet.win_rate_amount)}%`}
                type="mobile"
                isQuestion={true} questionText={t("info_win_rate_amount")} showClue={showClue} hideClue={hideClue}
              />
              <Fact
                title={t("amount")}
                info={`${roundData(wallet.overall_tokens)}`}
                type="mobile"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Wallet;
