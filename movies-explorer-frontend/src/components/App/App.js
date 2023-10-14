import logo from '../../images/logo.svg';
import avatar from '../../images/vitalik.png';
import planetImg from '../../images/web-planet.svg';
import arrowBtn from '../../images/arrow-btn.svg';
import './App.css';
import Header from '../Header/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [shownMovies, setShownMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [requestResult, setRequestResult] = useState({});

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
    auth.singin({ password, email })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
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
    mainApi.updateUserInfo({ name, email })
    .then((data) => {
      setCurrentUser(data.user);
      setRequestResult({message: 'Данные успешно обновлены', status: 200});
    })
    .then(() => {
      
    })
    .catch((err) => {
      if (err.status === 409) {
        console.log(err.status);
        setRequestResult({ message: 'Пользователь с таким email уже существует', status: err.status});
        console.log(requestResult);
      }
    });
  }

  const getMovies = (movieName) => {
    setIsLoading(true);
    moviesApi.getMovies()
    .then((movies) => {
      setMovies(movies);
      searchMovies({
        movies: movies,
        movieName: movieName
      })
      setIsLoading(false);
    })
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
      setSavedMovies([movie, ...savedMovies]);
    })
    .catch((err) => console.log(err))
  };

  const deleteMovie = (card) => {
    mainApi.deleteMovie(savedMovies.find(movie => movie.movieId === card.id || movie._id === card._id)._id)
    .then(() => {
      if (location === '/movies') {
        setSavedMovies((state) => state.filter((c) => c.movieId !== card.id));
      } else if (location === '/saved-movies') {
        setSavedMovies((state) => state.filter((c) => c._id !== card._id));
      }
    })
  }

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
    .then((movies) => {
      if (!!movies.movies) {
        setSavedMovies(movies.movies.filter(movie => movie.owner === currentUser._id).reverse());
      }
    })
    .catch((err) => console.log(err))
  }

  const searchMovies = ({ movies, movieName }) => {
    if (location === '/movies') {
      setFoundMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase().trim()) || movie.nameEN.toLowerCase().includes(movieName.toLowerCase().trim())));
    } else if (location === '/saved-movies') {
      setFoundSavedMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase().trim()) || movie.nameEN.toLowerCase().includes(movieName.toLowerCase().trim())));
    }
  }

  const onSubmitSearch = (movieName) => {
    if (location === '/movies') {
      if (movies.length === 0) {
        getMovies(movieName);        
      } else {
        setIsLoading(true);
        searchMovies({
          movies: movies,
          movieName: movieName
        })
        setIsLoading(false);
      }
    } else if (location === '/saved-movies') {
      searchMovies({
        movies: savedMovies,
        movieName: movieName
      });
    }
  }

  const handleFilter = (check) => {
    setIsChecked(check);
  }

  const filterMovies = (movies) => {
    if (isChecked) {
      return movies.filter((movie) => movie.duration < 40);
    } else {
      return movies;
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getCurrentUser()
        .then((data) => {
          setCurrentUser(data.user);
        })
        .catch((err) => console.log(err));
    }}, [isLoggedIn]);  

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, [currentUser]);

  useEffect(() => {
    if (location === '/movies') {
      setFoundMovies([]);
    }
  }, [location]);

  useEffect(() => {
    if (location === '/saved-movies') {
      setFoundSavedMovies(savedMovies);
    }
  }, [location, savedMovies]);

  useEffect(() => {
    if (location === '/movies') {
      setShownMovies(filterMovies(foundMovies));
    }
  }, [location, foundMovies, isChecked]);

  useEffect(() => {
    if (location === '/saved-movies') {
      setShownMovies(filterMovies(foundSavedMovies));
    }
  }, [location, foundSavedMovies, isChecked])

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
                <Movies isLoading={isLoading} savedCards={savedMovies} shownMovies={shownMovies} onClickSaveBtn={saveMovie} onClickDeleteBtn={deleteMovie} onSearch={onSubmitSearch} onChangeFilter={handleFilter} />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies onClickDeleteBtn={deleteMovie} savedCards={foundSavedMovies} shownMovies={shownMovies} onSearch={onSubmitSearch} onChangeFilter={handleFilter} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile onClickSignOut={handleSignOut} onUpdateUser={updateUserInfo} requestResult={requestResult} setRequestResult={setRequestResult} />
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
