import '../App/App.css';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register () {
  return (
    <>
      <main className="auth">
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form">
          <div className="auth__inputs">
            <div className="auth__div">
              <label className="auth__input-name">Имя</label>
              <input className="auth__input auth__input_type_name" type="text" placeholder="Имя" minLength="2" maxLength="30" />
              <span className="auth__input-error name-input-error"></span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">E-mail</label>
              <input className="auth__input auth__input_type_email" id="email" type="email" placeholder="example@yandex.ru" minLength="2" maxLength="30" />
              <span className="auth__input-error email-input-error"></span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">Пароль</label>
              <input className="auth__input auth__input_type_password auth__input_invalid" id="password" type="password" placeholder="Пароль" minLength="8" maxLength="30" />
              <span className="auth__input-error password-input-error auth__input-error_active">Что-то пошло не так...</span>
            </div>
          </div>
          <Link to="/movies"><button className="auth__submit-btn button" type="submit">Зарегистрироваться</button></Link>
        </form>
        <p className="auth__link-caption">Уже зарегистрированы? <Link to='/signin' className="auth__link link">Войти</Link></p>
      </main>
    </>
  )
}