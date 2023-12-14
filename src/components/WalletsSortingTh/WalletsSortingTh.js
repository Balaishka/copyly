import { useState } from "react";
import Filter from "../Filter/Filter";

function WalletsSortingTh({ name, sortTable, sorting, text, isFilter, t }) {
  const [filter, setFilter] = useState({
    name: "",
    min: 0,
    max: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  function toggleFilter() {
    setIsOpen(!isOpen);
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
            className={`table__img-filter ${
              isOpen ? "table__img-filter_opened" : ""
            }`}
          ></span>
          {isOpen && <Filter t={t} />}
        </>
      )}
    </th>
  );
}

export default WalletsSortingTh;
