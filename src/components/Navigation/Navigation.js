import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navigation__nav_name_auth">
        <ul className="navigation__list_name_auth">
          <li className="navigation__item_name_auth">
            <NavLink
              exact
              to="/"
              className="navigation__link_name_auth"
              activeClassName="navigation__link_active"
            >
              Главная
            </NavLink>
          </li>
          <li className="navigation__item_name_auth">
            <NavLink
              to="/test-graph"
              className="navigation__link_name_auth"
              activeClassName="navigation__link_active"
            >
              Тестовый график
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
