import { useState, useEffect } from 'react';

export default function useHandleDisplayMovies ({ shownMovies }) {
  const [displayMovies, setDisplayMovies] = useState(0);
  const [addMovies, setAddMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleSetSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const controlResize = () => {
    setTimeout(() => {
      handleSetSize();
    }, 1500);
  }

  const handleAddBtn = () => {
    setDisplayMovies(displayMovies + addMovies);
  };
  
  useEffect(() => {
    if (windowWidth >= 1279) {
      setDisplayMovies(12);
      setAddMovies(3);
    } else if (windowWidth >= 765 && windowWidth < 1279) {
      setDisplayMovies(8);
      setAddMovies(2);
    } else if (windowWidth < 765) {
      setDisplayMovies(5);
      setAddMovies(2);
    }
  }, [windowWidth, shownMovies]);

  return { displayMovies, handleSetSize, controlResize, handleAddBtn }
};