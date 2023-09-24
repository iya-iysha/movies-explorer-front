import '../App/App.css';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard ({ card }) {
  const location = useLocation();

  return (
    <div className="card">
      <div className="card__info">
        <p className="card__title">{card.title}</p>
        <p className="card__duration">{card.duration}</p>
      </div>
      <img className="card__image" src={card.image} alt={card.title} />
      <button className={`card__save-btn button ${card.saved ? 'card__save-btn_saved': ''} ${location.pathname === '/saved-movies' && 'card__del-btn'}`} type="button">
        {
          !card.saved && "Сохранить"
        }
      </button>
    </div>
  )
}