import '../App/App.css';
import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';

export default function SearchForm () {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <div className="search-form__line">
          <input className="search-form__film" placeholder='Фильм' required />
          <button className="search-form__submit button" type="submit">Поиск</button>
        </div>
        <FilterCheckBox />
      </form>
    </section>
  )
}