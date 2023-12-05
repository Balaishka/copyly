import "./Pages.css";
import arrow from "../../images/arrow-right.svg";
import { useEffect, useState } from "react";

function Pages({ pages, activePage, setActivePage, choiceText }) {
  const [isDisabledArrowLeft, setIsDisabledArrowLeft] = useState(true);
  const [isDisabledArrowRight, setIsDisabledArrowRight] = useState(false);
  const [pagesOpened, setPagesOpened] = useState(false);

  useEffect(() => {
    if (activePage === 1) {
      setIsDisabledArrowLeft(true);
    } else {
      setIsDisabledArrowLeft(false);
    }

    if (activePage === pages.length) {
      setIsDisabledArrowRight(true);
    } else {
      setIsDisabledArrowRight(false);
    }
  }, [activePage]);

  useEffect(() => {
    if (pagesOpened) {
      window.addEventListener("click", closePages);
      return () => window.removeEventListener("click", closePages);
    }
  }, [pagesOpened]);

  function handlePage(e) {
    setActivePage(Number(e.target.innerText));
    localStorage.setItem("activePage", e.target.innerText);
    setPagesOpened(false);
  }

  function handleLeft() {
    setActivePage(activePage - 1);
    localStorage.setItem("activePage", activePage - 1);
  }

  function handleRight() {
    setActivePage(activePage + 1);
    localStorage.setItem("activePage", activePage + 1);
  }

  function togglePages() {
    setPagesOpened(!pagesOpened);
  }

  function closePages(e) {
    if (
        e.target.className !== "pages__list pages__list_opened" &&
        e.target.className !== "pages__item" &&
        e.target.className !== "pages__active-page" &&
        e.target.className !== "pages__arrow pages__arrow_route_down"
      ) {
        setPagesOpened(false);
      }
  }

  return (
    <div className="pages">
      <div className="pages__container">
        <img
          className={`pages__arrow pages__arrow_route_left ${
            isDisabledArrowLeft ? "pages__arrow_disabled" : ""
          }`}
          src={arrow}
          onClick={isDisabledArrowLeft ? () => {} : handleLeft}
          alt="Предыдущая"
        />

        {pages.map((page) => {
          if (
            page === 1 ||
            (page === 3 && activePage <= 3) ||
            page === pages.length ||
            page === activePage ||
            page === activePage - 1 ||
            page === activePage + 1
          ) {
            return (
              <span
                className={`pages__num ${
                  activePage === page ? "pages__num_active" : ""
                }`}
                onClick={handlePage}
                key={page}
              >
                {page}
              </span>
            );
          } else {
            return (
              <span className="pages__ellipsis" key={page}>
                ...
              </span>
            );
          }
        })}

        <img
          className={`pages__arrow pages__arrow_route_right ${
            isDisabledArrowRight ? "pages__arrow_disabled" : ""
          }`}
          src={arrow}
          onClick={isDisabledArrowRight ? () => {} : handleRight}
          alt="Следующая"
        />
      </div>

      <div className="pages__choice">
        {choiceText}
        <span className="pages__active-page" onClick={togglePages}>
            {activePage}
            <img
            className="pages__arrow pages__arrow_route_down"
            src={arrow}
            alt={choiceText}
            />
        </span>
        <ul className={`pages__list ${pagesOpened ? "pages__list_opened":""}`}>
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={`pages__item ${
                  page === activePage ? "pages__item_active" : ""
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

export default Pages;
