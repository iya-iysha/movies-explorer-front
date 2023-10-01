import '../App/App.css';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard ({ card, onClickSaveBtn, onClickDeleteBtn, isSaved }) {
  const location = useLocation().pathname;

  const onClickSave = () => {
    console.log(card);
    onClickSaveBtn(card);
  }

  const onClickDelete = () => {
    console.log(card);
    onClickDeleteBtn(card);
  }

  const onClickCard = () => {
    
  }

  console.log(card.trailerLink);

  return (
    <a className="card" href={card.trailerLink} target="_blank" rel="noreferrer">
      <div className="card__info" >
        <h2 className="card__title">{card.nameRU}</h2>
        <p className="card__duration">{`${Math.floor(card.duration/60)}ч ${card.duration%60}м`}</p>
      </div>
      <img className="card__image" src={location === '/movies' ? `https://api.nomoreparties.co/${card.image.url}` : `${card.image}`} alt={card.nameRU} />
      <button className={`card__save-btn button ${isSaved(card) ? 'card__save-btn_saved': ''} ${location === '/saved-movies' && 'card__del-btn'}`} type="button" onClick={isSaved(card) ? onClickDelete : onClickSave}>
        {
          !isSaved(card) && "Сохранить"
        }
      </button>
    </a>
  )
}