import { useState } from "react";
import "./Filter.css";

function Filter({ t, name, minMaxFilters, filterTable, setIsOpen, clearFilterTable }) {
  const [minValue, setMinValue] = useState(Number(minMaxFilters[`${name}_min`]).toFixed() ? Number(minMaxFilters[`${name}_min`]).toFixed():0);
  const [maxValue, setMaxValue] = useState(Number(minMaxFilters[`${name}_max`]).toFixed() ? Number(minMaxFilters[`${name}_max`]).toFixed():0);

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
  }

  function handleClearFilter() {
    clearFilterTable(name);
    setIsOpen(false);
  }

  return (
    <form onSubmit={handleFilter} className="filter">
      <div className="filter__container">
        <div className="filter__block">
          <label className="filter__label">Min</label>
          <input
            className="filter__input"
            placeholder={Number(`${minMaxFilters[`${name}_min`]}`).toFixed()}
            value={minValue}
            onChange={changeValueMin}
            type="number"
          ></input>
        </div>
        <div className="filter__delimiter">-</div>
        <div className="filter__block">
          <label className="filter__label">Max</label>
          <input
            className="filter__input"
            placeholder={Number(`${minMaxFilters[`${name}_max`]}`).toFixed()}
            value={maxValue}
            onChange={changeValueMax}
            type="number"
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
