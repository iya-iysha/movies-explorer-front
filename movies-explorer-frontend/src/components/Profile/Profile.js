import '../App/App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile ({ onClickSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [editMode, setEditMode] = useState (false);

  const [formData, setFormData] = useState({
    name: '',
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
    onUpdateUser({
      name: formData.name,
      email: formData.email
    })
    clickEditBtn();
  }

  const clickEditBtn = () => {
    setEditMode(!editMode);
  }

  useEffect(() => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser]);
  
  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__inputs">
            <div className="profile__input-div">
                <label className="profile__input-label">Имя</label>
                <input className="profile__input profile__input_type_name" placeholder="Имя" value={formData.name} onChange={handleChange} readOnly={!editMode} name="name"></input>
            </div>
            <div className="profile__input-div">
                <label className="profile__input-label">E-mail</label>
                <input className="profile__input profile__input_type_email" placeholder="example@yandex.ru" value={formData.email} onChange={handleChange} readOnly={!editMode} name="email"></input>
            </div>
          </div>
          {
            !editMode ? 
              <div className="profile__buttons">
                <button className="profile__edit-btn link" type='button' onClick={clickEditBtn}>Редактировать</button>
                <p className="profile__exit-btn link" onClick={onClickSignOut}>Выйти из аккаунта</p>
              </div> :
              <button className="profile__submit-btn button" type="submit">Сохранить</button>
          }
        </form>
      </section>
    </main>  
  )
}