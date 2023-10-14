import '../App/App.css';
import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm ({ onSubmit, onChangeFilter }) {
  const location = useLocation().pathname;
  const [errors, setErrors] = useState([])
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    movie: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());

    console.log(formData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.movie);
  }

  useEffect(() => {
    formData.movie = '';
  }, [location])

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleSubmit}>
        <div className="search-form__line">
          <input className="search-form__film" placeholder='Фильм' name="movie" onChange={handleChange} value={formData.movie} required />
          <span className="input-error input-error_active movie-input-error"></span>
          <button className="search-form__submit button" type="submit">Поиск</button>
        </div>
        <FilterCheckBox onChangeFilter={onChangeFilter}  />
      </form>
    </section>
  )
}