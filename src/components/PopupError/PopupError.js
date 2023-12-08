import Popup from "../Popup/Popup";

function PopupError({ isPopupOpen, title, closeAllPopups, text }) {
    return (
        <Popup isPopupOpen={isPopupOpen} title={title} closeAllPopups={closeAllPopups}>
            <div className="popup__body">
                <p className="popup__text">{text}</p>
            </div>
        </Popup>
    );
}

export default PopupError;
