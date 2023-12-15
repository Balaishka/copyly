import { useState } from "react";
import "./Question.css";

function Question({ text, showClue, hideClue }) {

    const [myTimeout, setMyTimeout] = useState("");

    function test(e) {
        setMyTimeout(setTimeout(() => {
            showClue(e);
        }, 1000));
    }

    function test2() {
        clearTimeout(myTimeout);
        hideClue();
    }

    return (
        <div className="question" onMouseOver={test} onMouseLeave={test2}><span className="question__text">{text}</span></div>
    );
}

export default Question;
