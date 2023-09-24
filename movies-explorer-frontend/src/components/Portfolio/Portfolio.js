import '../App/App.css';
import './Portfolio.css';

export default function Portfolio ({ arrowBtn }) {
  return (
    <section className="portfolio">
        <p className="portfolio__title">Портфолио</p>
        <ul className="portfolio__list">
            <li className="portfolio__item link">
            <a className="portfolio__project" href="https://github.com/iya-iysha/how-to-learn">
                Статичный сайт<img className="portfolio__arrow-img" src={arrowBtn} alt="Стрелка"></img>
            </a>
            </li>
            <li className="portfolio__item link">
            <a className="portfolio__project" href="https://iya-iysha.github.io/russian-travel/">
                Адаптивный сайт<img className="portfolio__arrow-img" src={arrowBtn} alt="Стрелка"></img>
            </a>
            </li>
            <li className="portfolio__item link">
            <a className="portfolio__project" href="https://mesto-react.iya-iysha.nomoreparties.co/sign-in">
                Одностраничное приложение<img className="portfolio__arrow-img" src={arrowBtn} alt="Стрелка"></img>
            </a>
            </li>
        </ul>
      </section>
  )
}