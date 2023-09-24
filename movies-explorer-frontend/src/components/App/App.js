import logo from '../../images/logo.svg';
import avatar from '../../images/vitalik.png';
import arrowBtn from '../../images/arrow-btn.svg';
import './App.css';
import Header from '../Header/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import { cards, savedCards } from '../../utils/constants';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // setIsLoggedIn(true);
  const isLoggedIn = true;
  const user = {
    name: 'Виталий',
    email: 'example@yandex.ru'
  }

  return (
    <div className="page">
      <div className="root">
        <Header logo={logo} isLoggedIn={isLoggedIn}  />
        <Routes>
          <Route path="/" element={
            <Main avatar={avatar} arrowBtn={arrowBtn}/>
          } />
          <Route path="/movies" element={
            <Movies cards={cards} />
          } />
          <Route path="/saved-movies" element={
            <Movies cards={savedCards} />
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
