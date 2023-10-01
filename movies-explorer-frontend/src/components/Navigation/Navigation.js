import '../App/App.css';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';

export default function Navigation({ isLoggedIn }) {
  const location = useLocation();
  const [menuOpened, setMenuOpened] = useState(false);
  
  const closeNav = () => {
    setMenuOpened(false);
  }

  const openNav = () => {
    setMenuOpened(true);
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
          <button className="nav__burger button" type="button" onClick={openNav}></button>
          <div className={`nav__menu ${menuOpened && 'nav__menu_visible'}`}>
            <button className="nav__close-btn button" type="button" onClick={closeNav}></button>
            <div className="nav__container">
              <div className="nav__links">
                <Link to="/" className={`nav__link link nav__link_type_main ${location.pathname === '/' && 'nav__link_type_active'}`} onClick={closeNav} >Главная</Link>
                <Link to="/movies" className={`nav__link link ${location.pathname === '/movies' && 'nav__link_type_active'}`} onClick={closeNav} >Фильмы</Link>
                <Link to="/saved-movies" className={`nav__link link ${location.pathname === '/saved-movies' && 'nav__link_type_active'}`} onClick={closeNav} >Сохраненные фильмы</Link>
              </div>
              <Link to="/profile" className="nav__account-btn button" onClick={closeNav}>
                <p className={`nav__account-title ${location.pathname === '/profile' && 'nav__link_type_active'}`}>Аккаунт</p>
                <div className="nav__account-icon"></div>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}