import { useEffect, useState } from "react";
import "./FilterDate.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function FilterDate({ t, name, minMaxFilters, filterTable, setIsOpen, clearFilterTable, setIsFilled, getDate }) {

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);

  function handleFilter(e) {
    e.preventDefault();
    /* filterTable(name, reserved.startDate, reserved.endDate);
    setIsOpen(false);
    localStorage.setItem(`filled_${name}`, true);
    setIsFilled(true); */
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
        <Calendar onChange={setValue} value={value} selectRange={true} />
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
