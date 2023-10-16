import '../App/App.css';
import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useValidationForm from '../../hooks/useValidationForm';

export default function SearchForm ({ onSubmit, onChangeFilter, inProcess }) {
  const location = useLocation().pathname;
  const [formData, setFormData] = useState({
    movie: localStorage.getItem('movieName') ?? ''
  });

  const { errors, isValid, handleChange, resetValidation } = useValidationForm({ formData, setFormData });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.movie);
  }

  useEffect(() => {
    if (location === '/movies') {
      setFormData ({
        movie: localStorage.getItem('movieName') ?? ''
      })
    } else if (location === '/saved-movies') {
      setFormData ({
        movie: ''
      })
    }
    
    resetValidation();
  }, [location]);

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleSubmit}>
        <div className="search-form__line">
          <input className={`search-form__film ${errors.movie && 'search-form__film_invalid'}`} placeholder='Фильм' name="movie" onChange={handleChange} value={formData.movie} required />
          <span className={`input-error movie-input-error ${errors.movie && 'input-error_active'}`}>{errors.movie}</span>
          <button className={`search-form__submit button ${!isValid && 'button_disabled'}`} disabled={!isValid || inProcess} type="submit">Поиск</button>
        </div>
        <FilterCheckBox onChangeFilter={onChangeFilter}  />
      </form>
    </section>
  )
}