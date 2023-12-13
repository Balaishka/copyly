function WalletsSortingTh({ name, sortTable, sorting, text }) {
    return (
        <th
          className={`table__th-sort ${
            sorting.name === name ? "table__th-sort_active" : ""
          }`}
          id={name}
          onClick={sortTable}
        >
          <span className={`table__img-sort table__img-sort_type_${sorting.value}`}></span>
          {text}
        </th>
    );
}

export default WalletsSortingTh;