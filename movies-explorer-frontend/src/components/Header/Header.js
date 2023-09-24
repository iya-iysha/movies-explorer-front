import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';

export default function Header({logo, isLoggedIn}) {
  const location = useLocation();
  const pathname = location.pathname;
  const pages = ['/', '/movies', '/saved-movies', '/signup', '/signin', '/profile'];

  return (
    pages.includes(pathname) && <>
      <header className={`header ${(pathname === '/signin' || pathname === '/signup') && 'header_page_auth'} ${pathname === '/' && 'header_page_about-project'}`}>
        <Link to='/'><img className="header__logo" src={logo} alt="Логотип киносервиса" /></Link>
        {(pathname !== '/signin' && pathname !== '/signup') && <Navigation isLoggedIn={isLoggedIn} />}
      </header>
    </>
  )
}