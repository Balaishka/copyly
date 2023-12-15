import "./Clue.css";

function Clue({ coordinates }) {
    return (
        <div className="clue" style={{ top: coordinates.y, left: coordinates.x}}>
            {coordinates.text}
        </div>
    );
}

export default Clue;
