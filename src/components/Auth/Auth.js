import "./Auth.css";
import logo from "../../images/logo.svg";

function Auth() {
  return (
    <div className="auth">
      <img className="auth__logo" alt="Логотип" src={logo} />

      <div className="auth__container">
        <h1 className="auth__title">Добро пожаловать в<br />Copyly</h1>
        <p className="auth__text">
          Для того, чтобы войти в систему и использовать все её преимущества
          привяжите кошелек
        </p>
        <button className="auth__btn">Привязать кошелек</button>
      </div>
    </div>
  );
}

export default Auth;
