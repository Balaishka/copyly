import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useTranslation } from 'react-i18next';
import Main from "../Main/Main";
import Balance from "../Balance/Balance";
import PnL from "../PnL/PnL";
import Cumulative from "../Сumulative/Сumulative";

function App() {

  // Ошибки
  const [isError, setIsError] = useState(false);

  // Загрузка
  const [isLoading, setIsLoading] = useState(false);

  // Пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });

  const { t } = useTranslation()
  const history = useHistory();
  const { pathname } = useLocation();

  const months = [
    t("jan"),
    t("feb"),
    t("mar"),
    t("apr"),
    t("may"),
    t("jun"),
    t("jul"),
    t("aug"),
    t("sep"),
    t("oct"),
    t("nov"),
    t("dec")
  ];

  useEffect(() => {
    /* if (loggedIn && (pathname === "/signin" || pathname === "/signup")) {
      history.push("/movies");
    }
    setIsError(false); */
  }, [loggedIn, history, pathname]);

  useEffect(() => {
    //checkToken();
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          history.push(pathname);
        })
        .catch((err) => {
          //.handleLogout();
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="page">
          <Header />

          <main className="content">
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>

              <Route exact path="/balance">
                <Balance months={months} />
              </Route>

              <Route exact path="/pnl">
                <PnL months={months} />
              </Route>

              <Route exact path="/cumulative">
                <Cumulative months={months} />
              </Route>

              <ProtectedRoute path="/test">
                <Balance />
              </ProtectedRoute>

              <Route path="*">
                <PageNotFound history={history} />
              </Route>
            </Switch>
          </main>

          <Footer />

          <Preloader isLoading={isLoading} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
