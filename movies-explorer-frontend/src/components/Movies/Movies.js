import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

export default function Movies ({ isLoading, savedCards, shownMovies, onClickSaveBtn, onClickDeleteBtn, onSearch, onChangeFilter }) {
  const arrIsEmpty = (arr) => {
    return arr.length > 0;
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={onSearch} onChangeFilter={onChangeFilter}  />
      {
        isLoading ?
        <Preloader /> : <>
          {
            arrIsEmpty(shownMovies) ? 
            <MoviesCardList savedCards={savedCards} shownMovies={shownMovies} onClickSaveBtn={onClickSaveBtn} onClickDeleteBtn={onClickDeleteBtn} /> :
            <p className="movies__caption">Ничего не найдено</p>
          }
        </>
      }
    </main>
  )
}