import React from "react";
import "./PageNotFound.css";

function PageNotFound({ history, t }) {
  return (
    <section className="error">
      <div className="error__cap"></div>
      <div className="error__info">
        <h1 className="error__title">404</h1>
        <p className="error__subtitle">{t("page_not_found")}</p>
      </div>
      <nav className="error__nav">
        <button
          type="button"
          onClick={() => history.push("/")}
          className="error__link"
        >
          {t("back")}
        </button>
      </nav>
    </section>
  );
}

export default PageNotFound;
