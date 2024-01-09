import { useEffect, useState } from "react";
import "./FilterDate.css";

function FilterDate({ t, name, minMaxFilters, filterTable, setIsOpen, clearFilterTable, setIsFilled, getDate }) {
  const [minValue, setMinValue] = useState(getDate(minMaxFilters[`${name}_min`]) ? getDate(minMaxFilters[`${name}_min`]):0);
  const [maxValue, setMaxValue] = useState(getDate(minMaxFilters[`${name}_max`]) ? getDate(minMaxFilters[`${name}_max`]):0);

  useEffect(() => {
    console.log(minValue);
    console.log(maxValue);
  }, [minValue, maxValue]);

  function changeValueMin(e) {
    setMinValue(e.target.value);
  }

  function changeValueMax(e) {
    setMaxValue(e.target.value);
  }

  function getTimestamp(str) {
    const newDate = new Date(str);
    return newDate.getTime() / 1000;
  }

  function handleFilter(e) {
    e.preventDefault();
    console.log(getTimestamp(minValue));
    filterTable(name, getTimestamp(minValue), getTimestamp(maxValue));
    setIsOpen(false);
    localStorage.setItem(`filled_${name}`, true);
    setIsFilled(true);
  }

  function handleClearFilter() {
    clearFilterTable(name);
    setIsOpen(false);
    localStorage.removeItem(`filled_${name}`);
    setIsFilled(false);
  }

  return (
    <form onSubmit={handleFilter} className="filter">
      <div className="filter__container">
        <div className="filter__block">
          <label className="filter__label">From</label>
          <input
            className="filter__input"
            placeholder={getDate(`${minMaxFilters[`${name}_min`]}`)}
            value={minValue}
            onChange={changeValueMin}
            type="date"
            step="any"
          ></input>
        </div>
        <div className="filter__delimiter">-</div>
        <div className="filter__block">
          <label className="filter__label">To</label>
          <input
            className="filter__input"
            placeholder={getDate(`${minMaxFilters[`${name}_max`]}`)}
            value={maxValue}
            onChange={changeValueMax}
            type="date"
            step="any"
          ></input>
        </div>
      </div>

      <div className="filter__buttons">
        <button className="filter__btn filter__btn_name_reset" type="button" onClick={handleClearFilter}>
          {t("reset")}
        </button>
        <button
          className="filter__btn filter__btn_name_submit content__btn"
          type="submit"
        >
          {t("apply")}
        </button>
      </div>
    </form>
  );
}

export default FilterDate;
