import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import { useTranslation } from "react-i18next";
import Main from "../Main/Main";
import Auth from "../Auth/Auth";
import setMonths from "../../configs/translate";
import PopupTG from "../PopupTG/PopupTG";
import { messageText, walletNum } from "../../configs/constants";
import PopupSub from "../PopupSub/PopupSub";
import { useAccount, useSignMessage } from "wagmi";
import Wallet from "../Wallet/Wallet";
import mainApi from "../../utils/MainApi";
import PopupError from "../PopupError/PopupError";
import Repair from "../Repair/Repair";
import Clue from "../Clue/Clue";

function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const months = setMonths(t);

  // Заглушка
  const [isRepair, setIsRepair] = useState(false);

  // Загрузка
  const [isLoading, setIsLoading] = useState(false);

  // Ошибка
  const [isPopupError, setIsPopupError] = useState(false);
  const [errorText, setErrorText] = useState(t("error_text"));

  // Авторизация
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ? true:false);

  // Кошелек
  const [walletIn, setWalletIn] = useState(false);
  const [uniqueCode, setUniqueCode] = useState("");

  const { address, status } = useAccount();
  const { data, isError, isSuccess, signMessage } = useSignMessage();

  // Телеграм
  const [telegramIn, setTelegramIn] = useState(false);
  const [linkTG, setLinkTG] = useState("");

  // Подписка
  const [subscriptionIn, setSubscriptionIn] = useState(false);

  // Попапы
  const [isPopupTG, setIsPopupTG] = useState(false);
  const [isPopupSub, setIsPopupSub] = useState(false);

  // Язык
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  );

  // Кошельки
  const [allWallets, setAllWallets] = useState([]);
  const [wallet, setWallet] = useState({
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
  const [minMaxFilters, setMinMaxFilters] = useState({});

  // Подсказки
  const [isClue, setIsClue] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0
  });

  // Параметры фильтров и сортировки
  const [parameters, setParameters] = useState(localStorage.getItem("parameters") ? JSON.parse(localStorage.getItem("parameters")):{
    isParameters: false,
    sorting: {
      name: "",
      value: "none"
    },
    filters: [],
    page: 1
  });
  
  // Переключение страниц 
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const prominent = localStorage.getItem("prominent");
    if (prominent) {
      setIsRepair(false);
    }
  }, [isRepair]);

  useEffect(() => {
    if (loggedIn && pathname === "/auth") {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
    //localStorage.removeItem("parameters");
    /* const obj = JSON.parse(localStorage.getItem("parameters"));
    console.log(obj); */
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (status === "disconnected") {
      logout();
    }
    if (
      !jwt &&
      status === "connected"
    ) {
      //console.log("Задаем вопрос: " + address);
      handleRegister(address);
    }
  }, [status, address]);

  useEffect(() => {
    if (data && isSuccess && uniqueCode.length !== 0) {
      //console.log("Подписал сообщение!");
      handleCheckSignature();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      setIsPopupError(true);
      setErrorText(t("error_signature"));
    }
  }, [isError]);

  useEffect(() => {
    if (!address) {
      logout();
    }
  }, [address]);

  function handleRegister(wallet) {
    setIsLoading(true);
    mainApi
      .register(wallet)
      .then((res) => {
        //console.log(res);
        setUniqueCode(res.unique_code);
        signMessage({message: `${messageText}${res.unique_code}`});
      })
      .catch((err) => {
        console.log(err);
        setIsPopupError(true);
        setErrorText(t("error_register"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function checkUser(uniqueCode) {
    setIsLoading(true);
    mainApi
    .getUserInfo(uniqueCode)
    .then((res) => {
      //console.log(res);
      if (res.key === null) {
        setIsPopupTG(true);
        setLinkTG(`https://t.me/Copyly_bot?start=${uniqueCode}`);
      } else {
        //console.log(res);
        //console.log("Юзер зарегистрирован");

        localStorage.setItem("jwt", res.key);
        setWalletIn(true);
        setTelegramIn(true);

        //addSubscription();
        setLoggedIn(true);
        closeAllPopups();
      }
    })
    .catch((err) => {
      console.log(err);
      setIsPopupError(true);
      setErrorText(t("error_register"));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleCheckSignature() {
    const obj = {
      unique_code: uniqueCode,
      wallet: address,
      data: data
    };
    //console.log(obj);
    setIsLoading(true);
    mainApi
    .checkSignature(uniqueCode, data)
    .then((res) => {
      //console.log(res);
      if (res.is_valid) {
        //console.log("Кошелек подтвержден, проверим юзера");
        /* setTimeout(() => {
          checkUser(uniqueCode);
        }, 2000); */
        checkUser(uniqueCode);
      } else {
        //console.log("Кошелек не подтвержден");
      }
    })
    .catch((err) => {
      console.log(err);
      setIsPopupError(true);
      setErrorText(t("error_register"));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function addSubscription() {
    /* setIsLoading(true);
    mainApi
    .checkSubscription()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      closeAllPopups();
      setLoggedIn(false);
      setSubscriptionIn(false);

      console.log("Я в ошибке");
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    }); */

    setSubscriptionIn(true);
    closeAllPopups();
    history.push("/");
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt && address) {
      setWalletIn(true);
      setTelegramIn(true);
      setSubscriptionIn(true);
      setLoggedIn(true);
      //addSubscription();
    } else {
      logout();
    }
  }

  function getAllWallets() {
    setIsLoading(true);
    mainApi
      .getWalletsTable(parameters)
      .then((res) => {
        //console.log(res);
        setAllWallets(res.results);
        setPages(Math.ceil(res.count / 10));

        let filters = res.filters;
        
        filters.last_activity_min = res.filters.last_activity_min * 1000;
        filters.last_activity_max = res.filters.last_activity_max * 1000;

        setMinMaxFilters(filters);
      })
      .catch((err) => {
        //console.log("Я в ошибке");
        console.log(err);
        setIsPopupError(true);
        setErrorText(t("error_table"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getWallet(address) {
    setIsLoading(true);
    mainApi
      .getWalletInfo(address)
      .then((res) => {
        //console.log(res);
        setWallet(res);
      })
      .catch((err) => {
        //console.log("Я в ошибке");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function subWallet(address) {
    setIsLoading(true);
    mainApi
    .subscriptWallet(address)
    .then((res) => {
      //console.log(res);
      setWallet(res);
    })
    .catch((err) => {
      //console.log("Я в ошибке");
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function searchAddress(uuid) {
    mainApi
    .searchWallet(uuid)
    .then((res) => {
      if (res.result.address.length !== 0) {
        history.push(`/wallet/${res.result.address}`);
      }
    })
    .catch((err) => {
      //console.log("Я в ошибке");
      console.log(err);
      setIsPopupError(true);
      setErrorText(t("error_search"));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function searchAddressUuid(address) {
    setIsLoading(true);
    mainApi
    .searchWalletUuid(address)
    .then((res) => {
      //console.log(res);
      if (res.uuid.length !== 0) {
        searchAddress(res.uuid);
      }
    })
    .catch((err) => {
      //console.log("Я в ошибке");
      console.log(err);
      setIsLoading(false);
    });
  }

  function addZero(num) {
    return String(num).length === 1 ? `0${num}` : String(num);
  }

  function recordingData(data, isCumulative) {
    //console.log(typeof data);
    let res = [];

    if (data !== undefined) {
      data.map((item, index) => {
        const newDate = new Date(Number(item.date) * 1000);

        const hours = addZero(newDate.getHours());
        const minutes = addZero(newDate.getMinutes());

        let newDay = `${newDate.getDate()} ${
          months[newDate.getMonth()]
        } ${hours}:${minutes}`;

        if (isCumulative) {
          res.push({
            date: newDay,
            value: roundData2(item.value),
            cumValue: roundData2(data.cumulative_pnl[index].value),
          });
        } else {
          res.push({
            date: newDay,
            value: roundData2(item.value),
          });
        }
      });
    }
    
    console.log(res);

    return res;
  }

  function closeAllPopups() {
    setIsPopupTG(false);
    setIsPopupSub(false);
    setIsPopupError(false);
  }

  function openPopupTG() {
    setIsPopupTG(true);
  }

  function openPopupSub() {
    setIsPopupSub(true);
  }

  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("parameters");
    localStorage.removeItem("filled_pnl");
    localStorage.removeItem("filled_roi");
    localStorage.removeItem("filled_win_rate_perc");
    localStorage.removeItem("filled_overall_tokens");
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

  function roundData(str) {
    const num = Number(str);
    const res = num.toFixed();
    if (res === -0 || res === "-0") {
      return 0;
    } else {
      return res;
    }
  }

  function roundData2(str) {
    const num = Number(str);
    const res = (num.toFixed(2) % 1) === 0 ? num.toFixed() : num.toFixed(2);
    if (res === -0 || res === "-0") {
      return 0;
    } else {
      return res;
    }
  }

  function roundData4(str) {
    const num = Number(str);
    const res = (num.toFixed(4) % 1) === 0 ? num.toFixed() : num.toFixed(4);
    if (res === -0 || res === "-0") {
      return 0;
    } else {
      return res;
    }
  }

  function getDate(str) {
    console.log(str);
    const date = new Date(str * 1000);
    const strDate = `${addZero(date.getDate())}.${addZero(
      date.getMonth() + 1
    )}.${addZero(date.getFullYear())}`;
    const strTime = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    return `${strDate} ${strTime}`;
  }

  function showClue(e) {
    setIsClue(true);
    setCoordinates({
      x: e.pageX - 70,
      y: e.pageY + 20,
      text: e.target.firstChild.innerText
    });
  }

  function hideClue() {
    setIsClue(false);
    setCoordinates({
      x: 0,
      y: 0,
      text: ""
    });
  }

  if (isRepair) {
    return <Repair t={t} setIsRepair={setIsRepair} />;
  } else {
    return (
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
                    openPopupTG={openPopupTG}
                    subscriptionIn={subscriptionIn}
                    openPopupSub={openPopupSub}
                  />
                )}
              </Route>
  
              <ProtectedRoute loggedIn={loggedIn} exact path="/">
                <Main
                  t={t}
                  getAllWallets={getAllWallets}
                  allWallets={allWallets}
                  roundData={roundData}
                  roundData2={roundData2}
                  getDate={getDate}
                  parameters={parameters}
                  setParameters={setParameters}
                  minMaxFilters={minMaxFilters}
                  searchAddressUuid={searchAddressUuid}
                  pages={pages}
                />
              </ProtectedRoute>
  
              <ProtectedRoute loggedIn={loggedIn} path="/wallet/:id">
                <Wallet
                  t={t}
                  addZero={addZero}
                  recordingData={recordingData}
                  getWallet={getWallet}
                  wallet={wallet}
                  getDate={getDate}
                  roundData={roundData}
                  roundData2={roundData2}
                  roundData4={roundData4}
                  setWallet={setWallet}
                  subWallet={subWallet}
                  showClue={showClue}
                  hideClue={hideClue}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
  
              {/* <Route exact path="/balance">
                <Balance recordingData={recordingData} />
              </Route> */}
  
              <Route path="*">
                <PageNotFound history={history} t={t} />
              </Route>
            </Switch>
          </main>
  
          <Preloader isLoading={isLoading} />
  
          <PopupError
            isPopupOpen={isPopupError}
            title={t("error_title")}
            closeAllPopups={closeAllPopups}
            text={errorText}
          />
  
          <PopupTG
            isPopupOpen={isPopupTG}
            title={t("popup_tg_title")}
            closeAllPopups={closeAllPopups}
            text={t("popup_tg_text")}
            textLink={t("popup_tg_link")}
            link={linkTG}
            uniqueCode={uniqueCode}
            checkUser={checkUser}
            t={t}
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
            addZero={addZero}
          />

          {isClue && <Clue coordinates={coordinates} />}
        </div>
    );
  }
}

export default App;
