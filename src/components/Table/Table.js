import { useEffect, useRef, useState } from "react";
import { table, table2 } from "../../configs/constants";
import "./Table.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Pages from "../Pages/Pages";

function Table({ t }) {
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [valuesPerPage, setValuesPerPage] = useState([]);
    const [rows, setRows] = useState();

    const width = window.screen.width;

    const heightTable = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const savedPathname = localStorage.getItem("pathname"); // Получаем сохраненный url
        const savedActivePage = localStorage.getItem("activePage"); // Получаем сохраненную активную страницу
        const savedPages = localStorage.getItem("pages"); // Получаем сохраненное количество страниц

        function test() {
            // Если сохраненный url не совпадает с нынешним, то сбрасываем сохраненные данные
            if (savedPathname !== pathname) { 
                //console.log("Новая страница");
                localStorage.setItem("pathname", pathname);
                localStorage.setItem("pages", pages.length);
                localStorage.setItem("activePage", 1);
                setActivePage(1);
                return;
            }
            // Если изменилось количество страниц, то сбрасываем сохраненные данные 
            else if (Number(savedPages) !== pages.length && pages.length !== 0) { 
                //console.log("Новое количество страниц");
                localStorage.setItem("pages", pages.length);
                localStorage.setItem("activePage", 1);
                setActivePage(1);
                return;
            } 
            // Если все данные в порядке, переписываем активную страницу
            else if (savedPathname === pathname && pages.length !== 0 && Number(savedPages) === pages.length && savedActivePage) {
                //console.log("Переписываю активную страницу");
                setActivePage(Number(savedActivePage));
                return;
            }
            return;
        }

        test();
    }, [table, pages]);

    useEffect(() => {
        // Высчитываем количество строк на странице
        const heightRow = width > 500 ? 52 : 30;
        const heightTitle = 74;
        setRows(Math.floor((heightTable.current.clientHeight - heightTitle) / heightRow));
    }, [table]);

    useEffect(() => {
        if (table.length !== 0 && rows) {
            // Высчитываем количество страниц
            const num = table.length / rows;
            let amount = 0;
            let remainder = 0;
            let arr = [];

            if (Number.isInteger(num)) {
                amount = num;
            } else {
                amount = Math.ceil(num);
                remainder = table.length % rows;
            }

            for (let i = 1; i <= amount; i++) {
                arr.push(i);
            }

            setPages(arr);

            // Выводим данные с нужной страницы
            let res = [];
            let lastNum = rows;

            // Для переключения страниц
                if (activePage === amount && remainder !== 0) {
                    // Выводим данные последней "неполной" страницы
                    lastNum = table.length;
    
                    for (let i = lastNum - remainder; i < lastNum; i++) {
                        res.push(table[i]);
                    }
                } else {
                    // Выводим данные активной страницы
                    lastNum = activePage * rows;
    
                    for (let i = lastNum - rows; i < lastNum; i++) {
                        res.push(table[i]);
                    }
                }
            
            setValuesPerPage(res);
        }
    }, [table, activePage, rows]);

    function reductionWallet(w) {
        return `${w[0]}${w[1]}${w[2]}${w[3]}...${w[w.length - 2]}${w[w.length - 1]}`;
    }
        
    return (
        <div className="content__table" ref={heightTable}>
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
                    {valuesPerPage.map((item) => {
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

            {(table.length > rows) &&
                <Pages pages={pages} activePage={activePage} setActivePage={setActivePage} choiceText={t("table_pages")} />
            }
        </div>
        
    );
}

export default Table;
