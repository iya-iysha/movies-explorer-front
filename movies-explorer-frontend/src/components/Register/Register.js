import '../App/App.css';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register ({ onChange }) {
  return (
    <>
      <main className="auth">
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form">
          <div className="auth__inputs">
            <div className="auth__div">
              <label className="auth__input-name">Имя</label>
              <input className="auth__input auth__input_type_name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="30" onChange={onChange} />
              <span className="input-error name-input-error"></span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">E-mail</label>
              <input className="auth__input auth__input_type_email" name="email" type="email" placeholder="example@yandex.ru" minLength="2" maxLength="30" />
              <span className="input-error email-input-error"></span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">Пароль</label>
              <input className="auth__input auth__input_type_password" name="password" type="password" placeholder="Пароль" minLength="8" maxLength="30" />
              <span className="input-error password-input-error">Что-то пошло не так...</span>
            </div>
          </div>
          <Link to="/movies"><button className="auth__submit-btn button" type="submit">Зарегистрироваться</button></Link>
        </form>
        <p className="auth__link-caption">Уже зарегистрированы? <Link to='/signin' className="auth__link link">Войти</Link></p>
      </main>
    </>
  )
}