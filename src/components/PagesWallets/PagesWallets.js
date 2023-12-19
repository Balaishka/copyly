import "./PagesWallets.css";
import arrow from "../../images/arrow-right.svg";
import { useEffect, useState } from "react";

function PagesWallets({ pages, choiceText, getAllWallets, parameters, setParameters }) {
  const [isDisabledArrowLeft, setIsDisabledArrowLeft] = useState(true);
  const [isDisabledArrowRight, setIsDisabledArrowRight] = useState(false);
  const [pagesOpened, setPagesOpened] = useState(false);
  const [arrPages, setArrPages] = useState([]);

  useEffect(() => {
    let arr = [];

    for (let i = 1; i <= pages; i++) {
      arr.push(i);
    }

    setArrPages(arr);
  }, [pages]);

  useEffect(() => {
    if (parameters.page === 1) {
      setIsDisabledArrowLeft(true);
    } else {
      setIsDisabledArrowLeft(false);
    }

    if (parameters.page === pages) {
      setIsDisabledArrowRight(true);
    } else {
      setIsDisabledArrowRight(false);
    }
  }, [parameters]);

  useEffect(() => {
    if (pagesOpened) {
      window.addEventListener("click", closePages);
      return () => window.removeEventListener("click", closePages);
    }
  }, [pagesOpened]);

  function handlePage(e) {
    setPagesOpened(false);

    let param = parameters;
    param.page = Number(e.target.innerText);
    param.isParameters = true;
    setParameters(param);
    localStorage.setItem("parameters", JSON.stringify(param));

    getAllWallets(param);
  }

  function handleLeft() {
    let param = parameters;
    param.page = parameters.page - 1;
    param.isParameters = true;
    setParameters(param);
    localStorage.setItem("parameters", JSON.stringify(param));

    getAllWallets(param);
  }

  function handleRight() {
    let param = parameters;
    param.page = parameters.page + 1;
    param.isParameters = true;
    setParameters(param);
    localStorage.setItem("parameters", JSON.stringify(param));

    getAllWallets(param);
  }

  function togglePages() {
    setPagesOpened(!pagesOpened);
  }

  function closePages(e) {
    if (
        e.target.className !== "pages-wallets__list pages-wallets__list_opened" &&
        e.target.className !== "pages-wallets__item" &&
        e.target.className !== "pages-wallets__active-page" &&
        e.target.className !== "pages-wallets__arrow pages-wallets__arrow_route_down"
      ) {
        setPagesOpened(false);
      }
  }

  return (
    <div className="pages-wallets">
      <div className="pages-wallets__container">
        <img
          className={`pages-wallets__arrow pages-wallets__arrow_route_left ${
            isDisabledArrowLeft ? "pages-wallets__arrow_disabled" : ""
          }`}
          src={arrow}
          onClick={isDisabledArrowLeft ? () => {} : handleLeft}
          alt="Предыдущая"
        />

        {arrPages.map((page) => {
          if (
            page === 1 ||
            (page === 3 && parameters.page <= 3) ||
            page === arrPages.length ||
            page === parameters.page ||
            page === parameters.page - 1 ||
            page === parameters.page + 1
          ) {
            return (
              <span
                className={`pages-wallets__num ${
                  parameters.page === page ? "pages-wallets__num_active" : ""
                }`}
                onClick={handlePage}
                key={page}
              >
                {page}
              </span>
            );
          } else {
            return (
              <span className="pages-wallets__ellipsis" key={page}>
                ...
              </span>
            );
          }
        })}

        <img
          className={`pages-wallets__arrow pages-wallets__arrow_route_right ${
            isDisabledArrowRight ? "pages-wallets__arrow_disabled" : ""
          }`}
          src={arrow}
          onClick={isDisabledArrowRight ? () => {} : handleRight}
          alt="Следующая"
        />
      </div>

      <div className="pages-wallets__choice">
        {choiceText}
        <span className="pages-wallets__active-page" onClick={togglePages}>
            {parameters.page}
            <img
            className="pages-wallets__arrow pages-wallets__arrow_route_down"
            src={arrow}
            alt={choiceText}
            />
        </span>
        <ul className={`pages-wallets__list ${pagesOpened ? "pages-wallets__list_opened":""}`}>
          {arrPages.map((page) => {
            return (
              <li
                key={page}
                className={`pages-wallets__item ${
                  page === parameters.page ? "pages-wallets__item_active" : ""
                }`}
                onClick={handlePage}
              >
                {page}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PagesWallets;
