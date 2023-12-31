import "./TableWallets.css";
import PagesWallets from "../PagesWallets/PagesWallets";

function TableWallets({
  t,
  table,
  classTable,
  columns,
  setTableBody,
  setTableHead,
  setParameters,
  parameters,
  pages,
  getAllWallets
}) {
  return (
    <div
      className={`content__table ${
        classTable !== "" ? `content__table_name_${classTable}` : ""
      }`}
    >
      <table
        className={`table ${classTable !== "" ? `table-${classTable}` : ""}`}
      >
        <thead>{setTableHead()}</thead>

        <tbody>
          {table.length !== 0 ? (
            setTableBody(table)
          ) : (
            <tr>
              <td className="table__empty" colSpan={columns}>
                {t("error_table_not_found")}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {table.length !== 0 && (
        <PagesWallets
          pages={pages}
          choiceText={t("table_pages")}
          getAllWallets={getAllWallets}
          parameters={parameters}
          setParameters={setParameters}
        />
      )}
    </div>
  );
}

export default TableWallets;
