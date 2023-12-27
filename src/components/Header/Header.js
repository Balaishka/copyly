import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useEffect, useState } from "react";
import telegram from "../../images/telegram.svg";
import arrow from "../../images/arrow-down.svg";
//import logoutImg from "../../images/logout.svg";
import { ConnectKitButton } from "connectkit";

function Header({ t, i18n, loggedIn, link, logout, changeLang, setWalletIn }) {
  const [langOpened, setLangOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    if (langOpened) {
      window.addEventListener("click", closeLang);
      return () => window.removeEventListener("click", closeLang);
    }
  }, [langOpened]);

  function closeLang(e) {
    if (
      e.target.className !== "header__list header__list_opened" &&
      e.target.className !== "header__item" &&
      e.target.className !== "header__lang-btn" &&
      e.target.classList[0] !== "header__lang-img"
    ) {
      setLangOpened(false);
    }
  }

  function toggleLang() {
    setLangOpened(!langOpened);
  }

  function changeLangToRu() {
    changeLang("ru");
    setLangOpened(false);
  }

  function changeLangToEn() {
    changeLang("en");
    setLangOpened(false);
  }

  function toggleMenu() {
    console.log("Я тут");
    console.log(menuOpened);
    setMenuOpened(!menuOpened);
  }

  return (
    <header className={`header ${!loggedIn ? "header_type_auth" : ""}`}>
      <a href="https://copyly.xyz/" className="header__logo">
        <img src={logo} alt={t("logo")} className="header__logo-img" />
      </a>

      {loggedIn && (
        <button
          className={`header__burger ${
            menuOpened ? "header__burger_opened" : ""
          }`}
          type="button"
          onClick={toggleMenu}
        ></button>
      )}

      <div
        className={`header__container ${
          menuOpened ? "header__container_opened" : ""
        }`}
      >
        {loggedIn && (
          <a href="https://t.me/Copyly_bot" className="header__link" target="_blank">
            <img alt="Telegram" src={telegram} className="header__link-img" />
            <span className="header__link-text">Telegram</span>
          </a>
        )}

        <div className="header__lang">
          <button
            onClick={toggleLang}
            className="header__lang-btn"
            type="button"
          >
            {i18n.language === "ru" ? "Russian" : "English"}
            <img
              className={`header__lang-img ${
                langOpened ? "header__lang-img_opened" : ""
              }`}
              alt="Стрелка"
              src={arrow}
            />
          </button>
          <ul
            className={`header__list ${
              langOpened ? "header__list_opened" : ""
            }`}
          >
            <li className="header__item" onClick={changeLangToRu}>
              Russian
            </li>
            <li className="header__item" onClick={changeLangToEn}>
              English
            </li>
          </ul>
        </div>

        {loggedIn && (
          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress }) => {
              return (
                <button onClick={show} className="header__wallet">
                  {isConnected ? truncatedAddress : t("auth_btn_wallet")}
                </button>
              );
            }}
          </ConnectKitButton.Custom>
        )}

        {/* <button className="header__logout" onClick={logout} type="button">
          <img
            alt={t("logout")}
            src={logoutImg}
            className="header__logout-img"
          />
          <span className="header__logout-text">{t("logout")}</span>
        </button> */}
      </div>
    </header>
  );
}

export default Header;
