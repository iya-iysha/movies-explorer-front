import '../App/App.css';
import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

export default function MoviesCardList ({ cards }) {

  return (
    <section className="card-list">
      <ul className="card-list__cards">
        {
          cards.map((card) => (
            <li className="card-list__item" key={card._id}><Card key={card._id} card={card} /></li>
          ))
        }
      </ul>
      <button className="card-list__more-btn button">Ещё</button>
    </section>
  )
}