import QRCode from "react-qr-code";
import Popup from "../Popup/Popup";

function PopupTG({ isPopupOpen, title, closeAllPopups, text, textLink, link, checkUser, uniqueCode, t }) {
    function handleCheckUser() {
        checkUser(uniqueCode);
    }
    return (
        <Popup isPopupOpen={isPopupOpen} title={title} closeAllPopups={closeAllPopups}>
            <div className="popup__body">
                <p className="popup__text">
                    {text}
                    <a href={link} className="popup__link" target="_blank">{textLink}</a>
                </p>
                <div className="popup__qr">
                    <QRCode
                        size={240}
                        value={link}
                        viewBox={`0 0 240 240`}
                        bgColor="#202D36"
                        fgColor="#ffffff"
                        className="popup__qr-code"
                    />
                </div>
            </div>
            <div className="popup__footer">
                <button type="button" onClick={handleCheckUser} className="content__btn">{t("auth_tg")}</button>
            </div>
        </Popup>
    );
}

export default PopupTG;
