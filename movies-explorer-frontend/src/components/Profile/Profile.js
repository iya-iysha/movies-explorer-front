import '../App/App.css';
import { useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile ({ user }) {
  const [editMode, setEditMode] = useState (false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const clickEditBtn = () => {
    setEditMode(!editMode);
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (!editMode) {
    Array.from(document.querySelectorAll('.profile__input')).forEach((input) => {
      input.setAttribute("readOnly", "");
    });
  } else {
    Array.from(document.querySelectorAll('.profile__input')).forEach((input) => {
      input.removeAttribute("readOnly", "");
    });
  }}, [editMode]);

  

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {user.name}!</h1>
      <form className="profile__form">
        <div className="profile__inputs">
          <div className="profile__input-div">
              <label className="profile__input-label">Имя</label>
              <input className="profile__input profile__input_type_name" placeholder="Имя" value={name} onChange={handleNameChange}></input>
          </div>
          <div className="profile__input-div">
              <label className="profile__input-label">E-mail</label>
              <input className="profile__input profile__input_type_email" placeholder="example@yandex.ru" value={email} onChange={handleEmailChange}></input>
          </div>
        </div>
        {
          !editMode ? 
            <div className="profile__buttons">
              <button className="profile__edit-btn link" type='button' onClick={clickEditBtn}>Редактировать</button>
              <Link className="profile__exit-btn link" to='/'>Выйти из аккаунта</Link>
            </div> :
            <button className="profile__submit-btn button" type="submit" onClick={clickEditBtn}>Сохранить</button>
        }
      </form>
    </main>  
  )
}