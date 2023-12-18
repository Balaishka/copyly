import { useEffect, useState } from "react";
import "./Filter.css";

function Filter({ t, name, minMaxFilters, filterTable, setIsOpen, clearFilterTable, setIsFilled, roundData }) {
  const [minValue, setMinValue] = useState(roundData(minMaxFilters[`${name}_min`]) ? roundData(minMaxFilters[`${name}_min`]):0);
  const [maxValue, setMaxValue] = useState(roundData(minMaxFilters[`${name}_max`]) ? roundData(minMaxFilters[`${name}_max`]):0);

  function changeValueMin(e) {
    setMinValue(e.target.value);
  }

  function changeValueMax(e) {
    setMaxValue(e.target.value);
  }

  function handleFilter(e) {
    e.preventDefault();
    filterTable(name, minValue, maxValue);
    setIsOpen(false);
    setIsFilled(true);
  }

  function handleClearFilter() {
    clearFilterTable(name);
    setIsOpen(false);
    setIsFilled(false);
  }

  return (
    <form onSubmit={handleFilter} className="filter">
      <div className="filter__container">
        <div className="filter__block">
          <label className="filter__label">Min</label>
          <input
            className="filter__input"
            placeholder={roundData(`${minMaxFilters[`${name}_min`]}`)}
            value={minValue}
            onChange={changeValueMin}
            type="number"
            step="any"
          ></input>
        </div>
        <div className="filter__delimiter">-</div>
        <div className="filter__block">
          <label className="filter__label">Max</label>
          <input
            className="filter__input"
            placeholder={roundData(`${minMaxFilters[`${name}_max`]}`)}
            value={maxValue}
            onChange={changeValueMax}
            type="number"
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

export default Filter;
