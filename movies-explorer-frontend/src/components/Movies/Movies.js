import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

export default function Movies ({ cards, savedCards, onClickSaveBtn, onClickDeleteBtn }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} savedCards={savedCards} onClickSaveBtn={onClickSaveBtn} onClickDeleteBtn={onClickDeleteBtn} />
    </main>
  )
}