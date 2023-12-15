import Question from "../Question/Question";
import "./Fact.css";

function Fact({ title, info, type, isQuestion, questionText, showClue, hideClue }) {
    return (
        <div className={`fact ${type === "desctop" ? "fact_type_mobile-hidden":""}${type === "mobile" ? "fact_type_desctop-hidden":""}`}>
            <h3 className="fact__title">
                {title}
                {isQuestion && <Question text={questionText} showClue={showClue} hideClue={hideClue} />}
            </h3>
            <p className="fact__info">{info}</p>
        </div>
    );
}

export default Fact;
