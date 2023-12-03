import "./Popup.css";

function Popup({ children, title, isPopupOpen, closeAllPopups }) {
    if(isPopupOpen) {
        return (
            <div className="popup">
                <div className="popup__container">
                    <div className="popup__header">
                        <h2 className="popup__title">{title}</h2>
                        <button className="popup__close" onClick={closeAllPopups}></button>
                    </div>
                    {children}
                </div>
            </div>);
    } else {
        return (<></>)
    }
}

export default Popup;
