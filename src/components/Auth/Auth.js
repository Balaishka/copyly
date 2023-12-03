import "./Auth.css";
import logo from "../../images/logo.svg";

function Auth({ t, walletIn, telegramIn, userName, addWallet, openPopupTG, subscriptionIn, openPopupSub }) {
  return (
    <div className="auth">
      <img className="auth__logo" alt="Логотип" src={logo} />

      <div className="auth__container">
        <h1 className="auth__title">{t("welcome")}{telegramIn && `, ${userName}`}</h1>
        {!walletIn && 
          <>
            <p className="auth__text">{t("auth_wallet_text")}</p>
            <button className="content__btn auth__btn" onClick={addWallet}>{t("auth_btn_wallet")}</button>
          </>
        }

        {walletIn && !telegramIn && 
          <>
            <p className="auth__text">{t("auth_tg_text")}</p>
            <button className="content__btn auth__btn" onClick={openPopupTG}>{t("auth_tg_btn")}</button>
          </>
        }

        {walletIn && telegramIn && !subscriptionIn && 
          <>
            <p className="auth__text">{t("auth_sub_text")}</p>
            <button className="content__btn auth__btn" onClick={openPopupSub}>{t("auth_sub_btn")}</button>
          </>
        }
      </div>
    </div>
  );
}

export default Auth;
