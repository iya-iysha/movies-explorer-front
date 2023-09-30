import logo from '../../images/logo.svg';
import avatar from '../../images/vitalik.png';
import arrowBtn from '../../images/arrow-btn.svg';
import './App.css';
import Header from '../Header/Header';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { useState } from 'react';
import * as auth from '../../utils/Auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // setIsLoggedIn(true);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const isLoggedIn = true;
  const user = {
    name: 'Виталий',
    email: 'example@yandex.ru'
  };

  const getMovies = () => {
    moviesApi.getMovies()
    .then((movies) => {
      setMovies(movies);
    })
    .catch((err) => console.log(err))
  };

  const saveMovie = (card) => {
    mainApi.createMovie({ 
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co/${card.image.url}`,
      trailerLink: card.trailerLink,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
      movieId: card.id
     })
    .then((movie) => {
      console.log(movie);
    })
    .catch((err) => console.log(err))
  };

  const deleteMovie = (card) => {
    console.log(card);
    mainApi.deleteMovie(savedMovies.find(movie => movie.movieId === card.id || movie._id === card._id)._id)
    .then(() => {
      setSavedMovies((state) => state.filter((c) => c._id !== card._id));
      setMovies(((state) => state.map((c) => c.id === card.movieId ? card : c)));
    })
  }

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
    .then((movies) => {
      setSavedMovies(movies.movies);
    })
    .catch((err) => console.log(err))
  }

  getMovies();
  getSavedMovies();

  return (
    <div className="page">
      <div className="root">
        <Header logo={logo} isLoggedIn={isLoggedIn}  />
        <Routes>
          <Route path="/" element={
            <Main avatar={avatar} arrowBtn={arrowBtn}/>
          } />
          <Route path="/movies" element={
            <Movies cards={movies} savedCards={savedMovies} onClickSaveBtn={saveMovie} onClickDeleteBtn={deleteMovie} />
          } />
          <Route path="/saved-movies" element={
            <Movies cards={movies} onClickDeleteBtn={deleteMovie} savedCards={savedMovies} />
          } />
          <Route path="/signup" element={
            <Register />
          } />
          <Route path="/signin" element={
            <Login />
          } />
          <Route path="/profile" element={
            <Profile user={user} />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
