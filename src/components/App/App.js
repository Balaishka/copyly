import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useTranslation } from "react-i18next";
import Main from "../Main/Main";
import Balance from "../Balance/Balance";
import PnL from "../PnL/PnL";
import Cumulative from "../Сumulative/Сumulative";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";
import setMonths from "../../configs/translate";

function App() {
  // Загрузка
  const [isLoading, setIsLoading] = useState(false);

  // Авторизация
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });

  const history = useHistory();
  const { t } = useTranslation();

  const months = setMonths(t);

  function addZero(num) {
    return String(num).length === 1 ? `0${num}` : String(num);
  }

  function recordingData(data, name, isCumulative) {
    let res = [];

    data[name].map((item, index) => {
      const newDate = new Date(Number(item.date) * 1000);

      const hours = addZero(newDate.getHours());
      const minutes = addZero(newDate.getMinutes());

      let newDay = `${newDate.getDate()} ${
        months[newDate.getMonth()]
      } ${hours}:${minutes}`;

      if (isCumulative) {
        res.push({
          date: newDay,
          value: item.value,
          cumValue: data.cumulative_pnl[index].value,
        });
      } else {
        res.push({
          date: newDay,
          value: item.value,
        });
      }
    });

    return res;
  }

  return (
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="page">
          <Header loggedIn={loggedIn} />

          <main className="content">
            <Switch>
              <Route exact path="/auth">
                <Auth />
              </Route>

              <Route exact path="/">
                <Main />
              </Route>

              <Route exact path="/balance">
                <Balance recordingData={recordingData} />
              </Route>

              <Route exact path="/pnl">
                <PnL recordingData={recordingData} />
              </Route>

              <Route exact path="/cumulative">
                <Cumulative recordingData={recordingData} />
              </Route>

              <Route exact path="/profile">
                  <Profile />
              </Route>

              <ProtectedRoute loggedIn={loggedIn} path="/test">
                <div>Test</div>
              </ProtectedRoute>

              <Route path="*">
                <PageNotFound history={history} />
              </Route>
            </Switch>
          </main>

          <Preloader isLoading={isLoading} />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
