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
import PopupTG from "../PopupTG/PopupTG";
import { linkTG, walletNum } from "../../configs/constants";
import PopupSub from "../PopupSub/PopupSub";
import { useAccount, useSignMessage } from "wagmi";
import { ethers } from "ethers";
import Wallet from "../Wallet/Wallet";

function App() {
  // Загрузка
  const [isLoading, setIsLoading] = useState(false);

  // Авторизация
  const [loggedIn, setLoggedIn] = useState(true);

  // Кошелек
  const [walletIn, setWalletIn] = useState(localStorage.getItem("wallet") ? true:false);
  const { address, status } = useAccount();
  const myMessage = "Предоставить доступ Copyly";
  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message: myMessage,
  });

  // Телеграм
  const [telegramIn, setTelegramIn] = useState(true);
  const [userName, setUserName] = useState("Username");

  // Подписка
  const [subscriptionIn, setSubscriptionIn] = useState(true);

  // Попапы
  const [isPopupTG, setIsPopupTG] = useState(false);
  const [isPopupSub, setPopupSub] = useState(false);

  // Язык
  const [lang, setLang] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang"):"ru");

  const [currentUser, setCurrentUser] = useState({
    name: "",
    wallet: ""
  });

  const history = useHistory();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const months = setMonths(t);

  useEffect(() => {
    if (loggedIn && pathname === "/auth") {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (status === "disconnected") {
      removeWallet();
    }
    if (!localStorage.getItem("wallet") && !walletIn && status === "connected") {
      signMessage();
    }
  }, [status, walletIn]);

  useEffect(() => {
    if (address && isSuccess) {
      const newAddress = ethers.verifyMessage(myMessage, data);
      if (address === newAddress) {
        addWallet();
      }
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log("Ошибка!");
    }
  }, [isError]);

  /* useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) {
      setWalletIn(false);
    } else {
      setWalletIn(true);
    }
  }, []); */

  useEffect(() => {
    if (walletIn && telegramIn && subscriptionIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [walletIn, telegramIn, subscriptionIn]);

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

  function closeAllPopups() {
    setIsPopupTG(false);
    setPopupSub(false);
  }

  function addWallet() {
    setWalletIn(true);
    localStorage.setItem("wallet", address);

    if (!telegramIn) {
      setIsPopupTG(true);
    }

    if (telegramIn && !subscriptionIn) {
      setPopupSub(true);
    }
  }

  function removeWallet() {
    setWalletIn(false);
    localStorage.removeItem("wallet");
  }

  function addSubscription() {
    setSubscriptionIn(true);
    closeAllPopups();
    history.push("/");
  }

  function openPopupTG() {
    setIsPopupTG(true);
  }

  function openPopupSub() {
    setPopupSub(true);
  }

  function logout() {
    localStorage.removeItem("wallet");
    setLoggedIn(false);
    setWalletIn(false);
    setTelegramIn(false);
    setSubscriptionIn(false);
  }

  function changeLang(newLang) {
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className={`page ${loggedIn ? "" : "page_name_auth"}`}>
        <Header
          t={t}
          i18n={i18n}
          loggedIn={loggedIn}
          link={linkTG}
          logout={logout}
          changeLang={changeLang}
          setWalletIn={setWalletIn}
        />

        <main className="content">
          <Switch>
            <Route exact path="/auth">
              {!loggedIn && (
                <Auth
                  t={t}
                  walletIn={walletIn}
                  telegramIn={telegramIn}
                  userName={userName}
                  openPopupTG={openPopupTG}
                  subscriptionIn={subscriptionIn}
                  openPopupSub={openPopupSub}
                />
              )}
            </Route>

            <Route path="/table">
              <Main t={t} />
            </Route>

            <ProtectedRoute loggedIn={loggedIn} exact path="/">
              <Main t={t} />
            </ProtectedRoute>

            <ProtectedRoute loggedIn={loggedIn} exact path="/wallet">
              <Wallet t={t} addZero={addZero} recordingData={recordingData} />
            </ProtectedRoute>

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

            <Route path="*">
              <PageNotFound history={history} />
            </Route>
          </Switch>
        </main>

        <Preloader isLoading={isLoading} />

        <PopupTG
          isPopupOpen={isPopupTG}
          title={t("popup_tg_title")}
          closeAllPopups={closeAllPopups}
          text={t("popup_tg_text")}
          textLink={t("popup_tg_link")}
          link={linkTG}
        />

        <PopupSub
          isPopupOpen={isPopupSub}
          title={t("popup_sub_title")}
          closeAllPopups={closeAllPopups}
          text_1={t("popup_sub_text_1")}
          text_2={t("popup_sub_text_2")}
          text_3={t("popup_sub_text_3")}
          link={walletNum}
          textBtn={t("popup_sub_btn")}
          addSubscription={addSubscription}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
