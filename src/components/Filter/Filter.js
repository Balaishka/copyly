import "./Filter.css";

function Filter({ t }) {
    function handleFilter(e) {
        e.preventDefault();
        console.log("Юху!");
      }

    return (
        <form onSubmit={handleFilter} className="filter">
            <div className="filter__container">
                <div className="filter__block">
                    <label className="filter__label">Min</label>
                    <input className="filter__input" placeholder="0"></input>
                </div>
                <div className="filter__delimiter">-</div>
                <div className="filter__block">
                    <label className="filter__label">Max</label>
                    <input className="filter__input" placeholder="0"></input>
                </div>
            </div>

            <div className="filter__buttons">
                <button className="filter__btn filter__btn_name_reset" type="button">{t("reset")}</button>
                <button className="filter__btn filter__btn_name_submit content__btn" type="submit">{t("apply")}</button>
            </div>
        </form>
    );
}

export default Filter;
