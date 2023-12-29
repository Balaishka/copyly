import QRCode from "react-qr-code";
import Popup from "../Popup/Popup";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

function PopupSub({
  isPopupOpen,
  title,
  closeAllPopups,
  text_1,
  text_2,
  text_3,
  link,
  textBtn,
  addSubscription,
  addZero
}) {
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const date = new Date(new Date().getTime() + 604800000);
    setNewDate(`${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`);
  }, []);

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      title={title}
      closeAllPopups={closeAllPopups}
    >
      <div className="popup__body popup__body_name_sub">
        <p className="popup__text">
          {text_1}
          <br />
          {text_2}
          {newDate}
        </p>
        <CopyToClipboard text={link}>
          <p className="popup__text">
            <span className="popup__wallet">{link}</span>
            <span className="popup__copy"></span>
          </p>
        </CopyToClipboard>
        <div className="popup__qr popup__qr_name_sub">
          <QRCode
            size={240}
            value={link}
            viewBox={`0 0 240 240`}
            bgColor="#202D36"
            fgColor="#ffffff"
            className="popup__qr-code"
          />
        </div>
        <p className="popup__text">{text_3}</p>
      </div>
      <div className="popup__footer">
        <button className="popup__btn content__btn" onClick={addSubscription}>{textBtn}</button>
      </div>
    </Popup>
  );
}

export default PopupSub;
