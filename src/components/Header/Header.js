import "./Header.css";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useTranslation } from 'react-i18next';

function Header({ loggedIn }) {
  const { t, i18n } = useTranslation()
  
  if (!loggedIn) return (<></>); 

  return (
    <header className="header">
      <div className="header__container">
        {t('welcome')}
        <NavLink to="/" className="header__logo">
          <img src="" alt={t('logo')} />
        </NavLink>

        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option>Choose language</option>
          <option value="ru">Russian</option>
          <option value="en">English</option>
        </select>

        <Navigation />
      </div>
    </header>
  );
}

export default Header;
