import logo from '../../images/logo.svg';
import avatar from '../../images/vitalik.png';
import planetImg from '../../images/web-planet.svg';
import arrowBtn from '../../images/arrow-btn.svg';
import './App.css';
import Header from '../Header/Header';
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
import { useState, useEffect } from 'react';
import * as auth from '../../utils/Auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const handleSignUp = ({password, email, name}) => {
    auth.signup({ password, email, name })
    .then(() => {
      handleSignIn({ password, email })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSignIn = ({ password, email }) => {
    console.log('sign in');
    auth.singin({ password, email })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        console.log('token received');
      }
    })
    .then(() => {
      handleSuccessSignIn();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSuccessSignIn = () => {
    console.log('handleSuccess');
    setIsLoggedIn(true);
    navigate("/", { replace: true });
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((data) => {
        if (data) {
          handleSuccessSignIn();
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({});
  }

  const updateUserInfo = ({ name, email }) => {
    console.log('update');
    mainApi.updateUserInfo({ name, email })
    .then((data) => {
      console.log('updated');
      setCurrentUser(data.user);
    })
    .catch((err) => console.log(err));
  }

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
      if (!!movies.movies) {
        setSavedMovies(movies.movies.filter(movie => movie.owner === currentUser._id));
      }
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('loggedin');
      mainApi.getCurrentUser()
        .then((data) => {
          console.log(data.user);
          setCurrentUser(data.user);
        })
        .then(() => {
          console.log(currentUser);
        })
        .catch((err) => console.log(err));
    }}, [isLoggedIn]);  

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  })

  getMovies();
  


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header logo={logo} isLoggedIn={isLoggedIn}  />
          <Routes>
            <Route path="/" element={
              <Main avatar={avatar} arrowBtn={arrowBtn} planetImg={planetImg}/>
            } />
            <Route path="/signup" element={
              <Register onSubmit={handleSignUp} />
            } />
            <Route path="/signin" element={
              <Login onSubmit={handleSignIn} />
            } />
            <Route path="/movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies cards={movies} savedCards={savedMovies} onClickSaveBtn={saveMovie} onClickDeleteBtn={deleteMovie} />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies cards={movies} onClickDeleteBtn={deleteMovie} savedCards={savedMovies} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile onClickSignOut={handleSignOut} onUpdateUser={updateUserInfo} />
              </ProtectedRoute>
            } />
            <Route path="*" element={
              <NotFound />
            } />
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
