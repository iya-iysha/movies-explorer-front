import './Promo.css';
import NavTab from '../NavTab/NavTab';

export default function Main({ planetImg }) {
  return (
    <section className="promo">
      <div className="promo__cover">
        <img className="promo__image" src={planetImg} alt="Картинка планеты web"/>
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__caption">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <NavTab />
    </section>
  )
}