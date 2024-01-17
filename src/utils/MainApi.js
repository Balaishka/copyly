class MainApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  // Базовый запрос без тела
  _fetch(way, methodName) {
    return fetch(`${this._url}${way}`, {
      method: methodName,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Запрос с телом
  _fetchWithBody(way, methodName, bodyContent) {
    return fetch(`${this._url}${way}`, {
      method: methodName,
      headers: this._headers,
      body: JSON.stringify(bodyContent),
    }).then(this._checkResponse);
  }

  // Регистрация
  register(wallet) {
    return this._fetchWithBody("/sign-up", "POST", {
      wallet: wallet
    });
  }

  // Проверка подписи
  checkSignature(unique_code, sign) {
    return this._fetchWithBody("/sign-up/check-signature/", "POST", {
      unique_code: unique_code,
      sign: sign,
    });
  }

  // Проверка юзера
  getUserInfo(unique_code) {
    return this._fetch(`/sign-up/${unique_code}`, "GET");
  }

  // Проверка подписки на сервис
  checkSubscription() {
    this._headers = {
      ...this._headers,
      authorization: `Token ${localStorage.getItem("jwt")}`,
    };
    return this._fetch(`/api_users_is_subscribed_retrieve`, "GET");
  }

  // Получаем информацию о конкретном кошельке
  getWalletInfo(address) {
    this._headers = {
      ...this._headers,
      authorization: `Token ${localStorage.getItem("jwt")}`,
    };
    return this._fetch(`/insider/${address}`, "GET");
  }

  // Подписка на кошелек
  subscriptWallet(address) {
    this._headers = {
      ...this._headers,
      authorization: `Token ${localStorage.getItem("jwt")}`,
    };
    return this._fetch(`/insider/${address}/follow`, "GET");
  }

    // Получаем таблицу
    getWalletsTable(parameters) {
      this._headers = {
        ...this._headers,
        authorization: `Token ${localStorage.getItem("jwt")}`,
      };
      if (!parameters.isParameters) {
        return this._fetch("/top", "GET");
      } else {
        return this.sortTable(parameters);
      }
    }

  // Сортировка и фильтрация
  sortTable(parameters) {
    this._headers = {
      ...this._headers,
      authorization: `Token ${localStorage.getItem("jwt")}`,
    };

    //console.log(parameters);

    const sortingName = parameters.sorting.name;
    const sortingValue = parameters.sorting.value;
    const filters = parameters.filters;
    const page = parameters.page;
    const inactive = parameters.inactive;

    let res = "";

    if (sortingName.length !== 0) {
      res += `&ordering=${sortingValue === "up" ? "-":""}${sortingName}`;
    }
    if (filters.length !== 0) {
      filters.map((filter) => {
        res += `&${filter.name}=${filter.value}`;
      });
    }
    if (page && page !== 1) {
      res += `&page=${page}`;
    }
    if (inactive) {
      res += "&show_inactive_addresses=true";
    }

    res = res.substr(1, res.length);

    console.log(res);

    return this._fetch(`/top?${res}`, "GET");
  }

  // Поиск 
  searchWalletUuid(address) {
    this._headers = {
      ...this._headers,
      authorization: `Token ${localStorage.getItem("jwt")}`,
    };

    return this._fetch(`/search?address=${address}`, "GET");
  }

  searchWallet(uuid) {
    this._headers = {
      ...this._headers,
      authorization: `Token ${localStorage.getItem("jwt")}`,
    };

    return this._fetch(`/ticket/${uuid}`, "GET");
  }
}

// Создаем класс апи
const mainApi = new MainApi({
  //baseUrl: "http://92.118.112.123:8000/api",
  //baseUrl: "https://0c9a-178-70-163-195.ngrok-free.app/api",
  baseUrl: "https://api.copyly.xyz/api",
  headers: {
    "content-type": "application/json",
    //"Access-Control-Allow-Origin": "*"
  },
});

export default mainApi;

// 7afc375615454b0a9a8522a73be5c277ef51e457
