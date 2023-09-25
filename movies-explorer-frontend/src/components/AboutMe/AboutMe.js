import '../App/App.css';
import '../Main/Main.css';
import './AboutMe.css';

export default function AboutMe ({ avatar }) {
  return (
    <section className="about-me">
      <h2 className="main__title">Студент</h2>
      <div className="about-me__profile">
        <img className="about-me__avatar" src={avatar} alt="Аватарка"/>
        <h3 className="about-me__name">Виталий</h3>
        <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className="about-me__github link" target="_blank" href="https://github.com/iya-iysha" rel="noreferrer">Github</a>
      </div>
    </section>
  )
}