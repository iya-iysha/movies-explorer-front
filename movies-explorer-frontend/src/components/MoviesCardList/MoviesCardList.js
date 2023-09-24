import '../App/App.css';
import './MoviesCardList.css';
import Card from '../MoviesCard/MoviesCard';

export default function MoviesCardList ({ cards }) {

  return (
    <section className="card-list">
      <div className="card-list__cards">
        {
          cards.map((card) => (
            <Card key={card._id} card={card}  />
          ))
        }
      </div>
      <button className="card-list__more-btn button">Ещё</button>
    </section>
  )
}