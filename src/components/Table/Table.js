import { useEffect, useRef, useState } from "react";
import "./Table.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Pages from "../Pages/Pages";

function Table({ t, table, classTable, tableHead, setTableBody, lines, allWallets }) {
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [valuesPerPage, setValuesPerPage] = useState([]);
    const [rows, setRows] = useState();

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
        /* const heightRow = width > 500 ? 52 : 30;
        const heightTitle = 74;
        setRows(Math.floor((heightTable.current.clientHeight - heightTitle) / heightRow)); */

        // Не высчитываем количество строк, а берем статичное lines
        setRows(lines);
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
        
    return (
        <div className={`content__table ${classTable !== "" ? `content__table_name_${classTable}`:""}`} ref={heightTable}>
            <table className={`table ${classTable !== "" ? `table-${classTable}`:""}`}>
                <thead>
                    <tr>
                        {tableHead.map((th) => {
                            return <th key={th}>{th}</th>;
                        })}
                    </tr>
                </thead>

                <tbody>
                    {valuesPerPage.length !== 0 && setTableBody(valuesPerPage)}
                </tbody>
            </table>

            {(table.length > rows) &&
                <Pages pages={pages} activePage={activePage} setActivePage={setActivePage} choiceText={t("table_pages")} />
            }
        </div>
        
    );
}

export default Table;
