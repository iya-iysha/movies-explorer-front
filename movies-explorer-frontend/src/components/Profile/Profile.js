import '../App/App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';
import './Profile.css';

export default function Profile ({ onClickSignOut, onUpdateUser, requestResult, setRequestResult }) {
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
  }

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
                {requestResult.status === 200 && <span className="profile__success-message">{requestResult.message}</span>}
                <button className="profile__edit-btn link" type="button" onClick={clickEditBtn}>Редактировать</button>
                <p className="profile__exit-btn link" onClick={onClickSignOut}>Выйти из аккаунта</p>
              </div> :
              <div className="submit-area">
                {requestResult.status === 409 && <span className="submit-area__error">{requestResult.message}</span>}
                <button className="submit-area__btn button" type="submit">Сохранить</button>
              </div>
              
          }
          
        </form>
      </section>
    </main>  
  )
}