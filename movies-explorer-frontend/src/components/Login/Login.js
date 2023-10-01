import '../App/App.css';
import '../Register/Register.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login ({ onSubmit }) {

  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    })

    console.log(formData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      password: formData.password,
      email: formData.email
    })
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Рады видеть!</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__inputs">
          <div className="auth__div">
            <label className="auth__input-name">E-mail</label>
            <input className="auth__input auth__input_type_email" id="email" type="email" onChange={handleChange} value={formData.email} name="email" placeholder="example@yandex.ru" minLength="2" maxLength="30" required />
            <span className="input-error email-input-error"></span>
          </div>
          <div className="auth__div">
            <label className="auth__input-name">Пароль</label>
            <input className="auth__input auth__input_type_password" id="password" type="password" onChange={handleChange} value={formData.password} name="password" placeholder="Пароль" minLength="8" maxLength="30" required />
            <span className="input-error password-input-error">Что-то пошло не так...</span>
          </div>
        </div>
        <button className="auth__submit-btn button auth__submit-btn_page_signin" type="submit">Войти</button>
      </form>
      <p className="auth__link-caption">Ещё не зарегистрированы? <Link to='/signup' className="auth__link link">Регистрация</Link></p>
    </main>
  )
}