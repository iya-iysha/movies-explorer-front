import '../App/App.css';
import './Register.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useValidationForm from '../../hooks/useValidationForm';

export default function Register ({ onSubmit, inProcess, requestResult, setRequestResult }) {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    name: ''
  });
  const { errors, isValid, handleChange } = useValidationForm({ formData, setFormData });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      password: formData.password,
      email: formData.email,
      name: formData.name
    })
  }

  useEffect(() => {
    setRequestResult({message: '', status: 0});
  }, []);

  return (
    <>
      <main className="auth">
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__inputs">
            <div className="auth__div">
              <label className="auth__input-name">Имя</label>
              <input className={`auth__input auth__input_type_name ${errors.name && 'input_invalid'}`} name="name" type="text" onChange={handleChange} value={formData.name} placeholder="Имя" minLength="2" maxLength="30" required />
              <span className={`input-error name-input-error ${!isValid && 'input-error_active'}`}>{errors.name}</span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">E-mail</label>
              <input className={`auth__input auth__input_type_email ${errors.email && 'input_invalid'}`} name="email" type="email" onChange={handleChange} value={formData.email} placeholder="example@yandex.ru" required />
              <span className={`input-error email-input-error ${!isValid && 'input-error_active'}`}>{errors.email}</span>
            </div>
            <div className="auth__div">
              <label className="auth__input-name">Пароль</label>
              <input className={`auth__input auth__input_type_password ${errors.password && 'input_invalid'}`} name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Пароль" minLength="2" maxLength="30" required />
              <span className={`input-error password-input-error ${!isValid && 'input-error_active'}`}>{errors.password}</span>
            </div>
          </div>
          {requestResult.status !== 200 && <span className="auth__submit-error">{requestResult.message}</span>}
          <button className={`auth__submit-btn button ${!isValid && 'button_disabled'}`} disabled={!isValid || inProcess} type="submit">Зарегистрироваться</button>
        </form>
        <p className="auth__link-caption">Уже зарегистрированы? <Link to='/signin' className="auth__link link">Войти</Link></p>
      </main>
    </>
  )
}