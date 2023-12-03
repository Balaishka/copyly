import { table } from "../../configs/constants";
import "./Table.css";

function Table({ t }) {
    function reductionWallet(w) {
        return `${w[0]}${w[1]}${w[2]}${w[3]}...${w[w.length - 2]}${w[w.length - 1]}`;
    }
        
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>{t("table_th_1")}</th>
                    <th>{t("table_th_2")}</th>
                    <th>{t("table_th_3")}</th>
                    <th>{t("table_th_4")}</th>
                    <th>{t("table_th_5")}</th>
                    <th>{t("table_th_6")}</th>
                </tr>
            </thead>

            <tbody>
                {table.map((item) => {
                    return (<tr key={item.wallet}>
                        <td>{reductionWallet(item.wallet)}</td>
                        <td>{item.pl}</td>
                        <td>{item.dep}</td>
                        <td>{item.proc}</td>
                        <td>{item.tokens}</td>
                        <td>{item.last}</td>
                    </tr>);
                })}
            </tbody>
        </table>
    );
}

export default Table;
