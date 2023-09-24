import '../App/App.css';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({isLoggedIn}) {
  const location = useLocation();
  
  const onClick = () => {
    document.querySelector('.nav__menu').classList.toggle('nav__menu_visible');
  }

  return (
    <nav className="nav">
      {!isLoggedIn ? (
        <>
          <Link to="/signup"><button className="nav__btn button" type="button">Регистрация</button></Link>
          <Link to="/signin"><button className="nav__btn button nav__btn_type_signin" type="button">Войти</button></Link>
        </>
      ) : (
        <>
          <button className="nav__burger button" type="button" onClick={onClick}></button>
          <div className="nav__menu">
            <button className="nav__close-btn button" onClick={onClick}></button>
            <div className="nav__container">
              <div className="nav__links">
                <Link to="/" className={`nav__link link nav__link_type_main ${location.pathname === '/' ? 'nav__link_type_active' : ''}`} >Главная</Link>
                <Link to="/movies" className={`nav__link link ${location.pathname === '/movies' ? 'nav__link_type_active' : ''}`} >Фильмы</Link>
                <Link to="/saved-movies" className={`nav__link link ${location.pathname === '/saved-movies' ? 'nav__link_type_active' : ''}`} >Сохраненные фильмы</Link>
              </div>
              <Link to="/profile" className="nav__account-btn button">
                <p className="nav__account-title">Аккаунт</p>
                <div className="nav__account-icon"></div>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}