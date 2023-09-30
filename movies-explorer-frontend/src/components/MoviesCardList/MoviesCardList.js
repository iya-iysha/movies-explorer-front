import '../App/App.css';
import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList ({ cards, savedCards, onClickSaveBtn, onClickDeleteBtn }) {
  const location = useLocation().pathname;

  const isSaved = (card) => {
    if (location === '/movies' && !!savedCards.find(movie => movie.movieId === card.id)) {
      return true
    } else if (location === '/saved-movies' && !!savedCards.includes(card)) {
      return true
    }
    else return false
  }

  return (
    <section className="card-list">
      <ul className="card-list__cards">
        {
          location === '/movies' ?
          cards.map((card) => (
            <li className="card-list__item" key={card.id}><Card key={card.id} card={card} onClickSaveBtn={onClickSaveBtn} onClickDeleteBtn={onClickDeleteBtn} isSaved={isSaved}  /></li>
          )) :
          savedCards.map((card) => (
            <li className="card-list__item" key={card._id}><Card key={card._id} card={card} onClickDeleteBtn={onClickDeleteBtn} isSaved={isSaved}  /></li>
          ))
        }
      </ul>
      <button className="card-list__more-btn button">Ещё</button>
    </section>
  )
}