import '../App/App.css';
import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register ({ onSubmit }) {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    name: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      password: formData.password,
      email: formData.email,
      name: formData.name
    })
  }

  return (
    <>
      <main className="auth">
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__inputs">
            <div className="auth__div">
              <label className="auth__input-name">Имя</label>
              <input className="auth__input auth__input_type_name" name="name" type="text" onChange={handleChange} value={formData.name} placeholder="Имя" minLength="2" maxLength="30" required />
              <span className="input-error name-input-error"></span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">E-mail</label>
              <input className="auth__input auth__input_type_email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder="example@yandex.ru" minLength="2" maxLength="30" required />
              <span className="input-error email-input-error"></span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">Пароль</label>
              <input className="auth__input auth__input_type_password" name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Пароль" minLength="8" maxLength="30" required />
              <span className="input-error password-input-error">Что-то пошло не так...</span>
            </div>
          </div>
          <button className="auth__submit-btn button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="auth__link-caption">Уже зарегистрированы? <Link to='/signin' className="auth__link link">Войти</Link></p>
      </main>
    </>
  )
}