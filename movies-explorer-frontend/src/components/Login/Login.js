import '../App/App.css';
import '../Register/Register.css';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login () {
  return (
    <main className="auth">
      <h1 className="auth__title">Рады видеть!</h1>
      <form className="auth__form">
        <div className="auth__inputs">
          <div className="auth__div">
            <label className="auth__input-name">E-mail</label>
            <input className="auth__input auth__input_type_email" id="email" type="email" placeholder="example@yandex.ru" />
            <span className="auth__input-error email-input-error"></span>
          </div>
          <div className="auth__div">
            <label className="auth__input-name">Пароль</label>
            <input className="auth__input auth__input_type_password auth__input_invalid" id="password" type="password" placeholder="Пароль" />
            <span className="auth__input-error password-input-error auth__input-error_active">Что-то пошло не так...</span>
          </div>
        </div>
        <Link to="/movies"><button className="auth__submit-btn button auth__submit-btn_page_signin" type="submit">Войти</button></Link>
      </form>
      <p className="auth__link-caption">Ещё не зарегистрированы? <Link to='/signup' className="auth__link link">Регистрация</Link></p>
    </main>
  )
}