import '../App/App.css';
import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useHandleDisplayMovies from '../../hooks/useHandleDisplayMovies';

export default function MoviesCardList ({ savedCards, shownMovies, onClickSaveBtn, onClickDeleteBtn, inProcess }) {
  const location = useLocation().pathname;
  const { displayMovies, controlResize, handleSetSize, handleAddBtn } = useHandleDisplayMovies();

  const isSaved = (card) => {
    if (location === '/movies' && !!savedCards.find(movie => movie.movieId === card.id)) {
      return true
    } else if (location === '/saved-movies' && !!savedCards.includes(card)) {
      return true
    }
    else return false
  }

  useEffect(() => {
    handleSetSize();
    window.addEventListener('resize', controlResize);
    return () => window.removeEventListener('resize', controlResize);
  }, []);

  return (
    <section className="card-list">
      <ul className="card-list__cards">
        {
          location === '/movies' ?
          shownMovies.slice(0, displayMovies).map((card) => (
            <li className="card-list__item" key={card.id}><Card key={card.id} card={card} onClickSaveBtn={onClickSaveBtn} onClickDeleteBtn={onClickDeleteBtn} isSaved={isSaved} inProcess={inProcess} /></li>
          )) :
          shownMovies.map((card) => (
            <li className="card-list__item" key={card._id}><Card key={card._id} card={card} onClickDeleteBtn={onClickDeleteBtn} isSaved={isSaved} inProcess={inProcess} /></li>
          ))
        }
      </ul>
      {location === '/movies' && shownMovies.length > displayMovies && <button className="card-list__more-btn button" onClick={handleAddBtn}>Ещё</button>}
    </section>
  )
}