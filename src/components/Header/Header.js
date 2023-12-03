import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useEffect, useState } from "react";
import telegram from "../../images/telegram.svg";
import arrow from "../../images/arrow-down.svg";
import logoutImg from "../../images/logout.svg";

function Header({
  t,
  i18n,
  loggedIn,
  link,
  logout,
  changeLangToRu,
  changeLangToEn,
}) {
  const [langOpened, setLangOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    if (langOpened) {
      window.addEventListener("click", closeLang);
      return () =>  window.removeEventListener("click", closeLang);
    }
  }, [langOpened]);

  function closeLang(e) {
    if (
      e.target.className !== "header__list header__list_opened" &&
      e.target.className !== "header__item" &&
      e.target.className !== "header__lang-btn" &&
      e.target.className !== "header__lang-img"
    ) {
      setLangOpened(false);
    }
  }

  function toggleLang() {
    setLangOpened(!langOpened);
  }

  function changeLangToRussian() {
    changeLangToRu();
    setLangOpened(false);
  }

  function changeLangToEnglish() {
    changeLangToEn();
    setLangOpened(false);
  }

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

  if (!loggedIn) return <></>;

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <img src={logo} alt={t("logo")} className="header__logo-img" />
      </NavLink>

      <button className={`header__burger ${menuOpened ? "header__burger_opened":""}`} type="button" onClick={toggleMenu}></button>

      <div className={`header__container ${menuOpened ? "header__container_opened":""}`}>
        <a href={link} className="header__link">
          <img alt="Telegram" src={telegram} className="header__link-img" />
          <span className="header__link-text">Telegram</span>
          </a>

        <div className="header__lang">
          <button
            onClick={toggleLang}
            className="header__lang-btn"
            type="button"
          >
            {i18n.language === "ru" ? "Russian" : "English"}
            <img className={`header__lang-img ${langOpened ? "header__lang-img_opened":""}`} alt="Стрелка" src={arrow} />
          </button>
          <ul
            className={`header__list ${
              langOpened ? "header__list_opened" : ""
            }`}
          >
            <li className="header__item" onClick={changeLangToRussian}>
              Russian
            </li>
            <li className="header__item" onClick={changeLangToEnglish}>
              English
            </li>
          </ul>
        </div>

        <div className="header__test"></div>

        <button
          className="header__logout"
          onClick={logout}
          type="button"
        >
          <img alt={t("logout")} src={logoutImg} className="header__logout-img" />
          <span className="header__logout-text">{t("logout")}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
