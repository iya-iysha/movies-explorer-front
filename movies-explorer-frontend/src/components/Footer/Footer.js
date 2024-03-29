import '../App/App.css';
import { useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer () {
  const location = useLocation();

  return (
    <>
      {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') && 
        <footer className="footer">
          <p className="footer__caption footer__caption_type_title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__info">
            <p className="footer__caption footer__caption_type_year">&#169; 2020</p>
            <ul className="footer__links">
              <li className="footer__link"><a className="footer__caption link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
              <li className="footer__link"><a className="footer__caption link" href="https://github.com/iya-iysha" target="_blank" rel="noreferrer">Github</a></li>
            </ul>
          </div>
        </footer>
      }
    </>
  )
}