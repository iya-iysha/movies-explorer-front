import '../App/App.css';
import '../Register/Register.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { REGEX_EMAIL } from '../../utils/constants.js';
import useValidationForm from '../../hooks/useValidationForm';

export default function Login ({ onSubmit, inProcess, requestResult, setRequestResult }) {
  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });
  const { errors, isValid, handleChange } = useValidationForm({ formData, setFormData});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      password: formData.password,
      email: formData.email
    })
  }

  useEffect(() => {
    setRequestResult({message: '', status: 0});
  }, []);

  return (
    <main className="auth">
      <h1 className="auth__title">Рады видеть!</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__inputs">
          <div className="auth__div">
            <label className="auth__input-name">E-mail</label>
            <input className={`auth__input auth__input_type_email ${errors.email && 'input_invalid'}`} id="email" type="email" onChange={handleChange} value={formData.email} name="email" placeholder="example@yandex.ru" required pattern={REGEX_EMAIL} />
            <span className={`input-error email-input-error ${!isValid && 'input-error_active'}`}>{errors.email}</span>
          </div>
          <div className="auth__div">
            <label className="auth__input-name">Пароль</label>
            <input className={`auth__input auth__input_type_password ${errors.password && 'input_invalid'}`} id="password" type="password" onChange={handleChange} value={formData.password} name="password" placeholder="Пароль" minLength="2" maxLength="30" required />
            <span className={`input-error password-input-error ${!isValid && 'input-error_active'}`}>{errors.password}</span>
          </div>
        </div>
        {requestResult.status !== 200 && <span className="auth__submit-error">{requestResult.message}</span>}
        <button className={`auth__submit-btn button auth__submit-btn_page_signin ${!isValid && 'button_disabled'}`} disabled={!isValid || inProcess} type="submit">Войти</button>
      </form>
      <p className="auth__link-caption">Ещё не зарегистрированы? <Link to='/signup' className="auth__link link">Регистрация</Link></p>
    </main>
  )
}