import '../App/App.css';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';
import useValidationForm from '../../hooks/useValidationForm';

export default function Profile ({ onClickSignOut, onUpdateUser, requestResult, setRequestResult, inProcess }) {
  const currentUser = useContext(CurrentUserContext);
  const [editMode, setEditMode] = useState (false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const { errors, isValid, handleChange, setIsValid } = useValidationForm({ formData, setFormData })

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: formData.name,
      email: formData.email
    })
  }

  const clickEditBtn = (e) => {
    e.preventDefault();
    setEditMode(true);
  }

  useEffect(() => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser]);

  useEffect(() => {
    setRequestResult({message: '', status: 0});
  }, []);
  
  useEffect(() => {
    if (requestResult.status === 200) {
      setEditMode(false);
    }
  }, [requestResult]);

  useEffect(() => {
    setIsValid(!(formData.email === currentUser.email && formData.name === currentUser.name));
  }, [handleChange]);
  
  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__inputs">
            <div className="profile__input-div">
              <label className="profile__input-label">Имя</label>
              <input className={`profile__input profile__input_type_name ${errors.name && 'input_invalid'}`} placeholder="Имя" value={formData.name} onChange={handleChange} readOnly={!editMode} name="name" required minLength="2" maxLength="30"></input>
              <span className={`input-error name-input-error ${!isValid && 'input-error_active'} input-error_page_profile`}>{errors.name}</span>
            </div>
            <div className="profile__input-div">
              <label className="profile__input-label">E-mail</label>
              <input className={`profile__input profile__input_type_email ${errors.email && 'input_invalid'}`} type="email" placeholder="example@yandex.ru" value={formData.email} onChange={handleChange} readOnly={!editMode} name="email" required></input>
              <span className={`input-error email-input-error ${!isValid && 'input-error_active'} input-error_page_profile`}>{errors.email}</span>
            </div>
          </div>
          {
            !editMode ? 
              <div className="profile__buttons">
                {requestResult.status === 200 && <span className="profile__success-message">{requestResult.message}</span>}
                <button className="profile__edit-btn link" type="button" onClick={clickEditBtn}>Редактировать</button>
                <p className="profile__exit-btn link" onClick={onClickSignOut}>Выйти из аккаунта</p>
              </div> :
              <div className="submit-area">
                {requestResult.status !== 200 && <span className="submit-area__error">{requestResult.message}</span>}
                <button className={`submit-area__btn button ${!isValid && 'button_disabled'}`} type="submit" disabled={!isValid || inProcess}>Сохранить</button>
              </div>
              
          }
          
        </form>
      </section>
    </main>  
  )
}