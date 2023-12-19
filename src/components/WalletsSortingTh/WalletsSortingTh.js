import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";

function WalletsSortingTh({
  name,
  sortTable,
  sorting,
  text,
  isFilter,
  t,
  minMaxFilters,
  filterTable,
  clearFilterTable,
  roundData
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilled, setIsFilled] = useState(localStorage.getItem(`filled_${name}`) ? true:false);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", closeFilter);
      return () => window.removeEventListener("click", closeFilter);
    }
  }, [isOpen]);

  function toggleFilter() {
    setIsOpen(!isOpen);
  }

  function closeFilter(e) {
    if (
      e.target.classList[1] !== `table__img-filter_name_${name}` &&
      e.target.className !== "filter" &&
      e.target.className !== "filter__container" &&
      e.target.className !== "filter__block" &&
      e.target.className !== "filter__label" &&
      e.target.className !== "filter__input" &&
      e.target.className !== "filter__delimiter" &&
      e.target.className !== "filter__buttons" &&
      e.target.classList[0] !== "filter__btn"
    ) {
      setIsOpen(false);
    }
  }

  return (
    <th
      className={`table__th-sort ${
        sorting.name === name ? "table__th-sort_active" : ""
      }`}
    >
      <div className="table__th-block" id={name} onClick={sortTable}>
        <span
          className={`table__img-sort table__img-sort_type_${sorting.value}`}
        ></span>
        {text}
      </div>
      {isFilter && (
        <>
          <span
            onClick={toggleFilter}
            className={`table__img-filter table__img-filter_name_${name} ${
              isOpen ? "table__img-filter_opened" : ""
            } ${isFilled ? "table__img-filter_filled" : ""}`}
          ></span>
          {isOpen && (
            <Filter
              t={t}
              name={name}
              minMaxFilters={minMaxFilters}
              filterTable={filterTable}
              setIsOpen={setIsOpen}
              clearFilterTable={clearFilterTable}
              setIsFilled={setIsFilled}
              roundData={roundData}
            />
          )}
        </>
      )}
    </th>
  );
}

export default WalletsSortingTh;
