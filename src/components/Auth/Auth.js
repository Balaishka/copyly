import "./Auth.css";
import logo from "../../images/logo.svg";
import { ConnectKitButton } from "connectkit";

function Auth({
  t,
  walletIn,
  telegramIn,
  openPopupTG,
  subscriptionIn,
  openPopupSub
}) {
  return (
    <div className="auth">
      <img className="auth__logo" alt="Логотип" src={logo} />

      <div className="auth__container">
        <h1 className="auth__title">
          {t("welcome")}
        </h1>
        {!walletIn && (
          <>
            <p className="auth__text">{t("auth_wallet_text")}</p>
            {/* <button className="content__btn auth__btn" onClick={addWallet}>{t("auth_btn_wallet")}</button> */}
            <ConnectKitButton.Custom>
              {({
                isConnected,
                show,
                truncatedAddress,
              }) => {
                return (
                  <button onClick={show} className="content__btn auth__btn">
                    {isConnected ? truncatedAddress : t("auth_btn_wallet")}
                  </button>
                );

                /* return (
                  <button className="content__btn auth__btn auth__btn_disabled" type="button" disabled="disabled">{t("coming_soon")}</button>
                ); */
              }}
            </ConnectKitButton.Custom>
          </>
        )}

        {walletIn && !telegramIn && (
          <>
            <p className="auth__text">{t("auth_tg_text")}</p>
            <button className="content__btn auth__btn" onClick={openPopupTG}>
              {t("auth_tg_btn")}
            </button>
          </>
        )}

        {walletIn && telegramIn && !subscriptionIn && (
          <>
            <p className="auth__text">{t("auth_sub_text")}</p>
            <button className="content__btn auth__btn" onClick={openPopupSub}>
              {t("auth_sub_btn")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
