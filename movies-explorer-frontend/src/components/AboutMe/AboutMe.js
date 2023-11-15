import '../App/App.css';
import '../Main/Main.css';
import './AboutMe.css';

export default function AboutMe ({ avatar }) {
  return (
    <section className="about-me">
      <h2 className="main__title">Студент</h2>
      <div className="about-me__profile">
        <img className="about-me__avatar" src={avatar} alt="Аватарка"/>
        <h3 className="about-me__name">Ия</h3>
        <p className="about-me__job">Фронтенд-разработчик, 22 года</p>
        <div className="about-me__bio">
          <p className="about-me__bio-caption">Фронтенд-разработка привлекает меня в первую очередь тем, что мы пользуемся веб-продуктами каждый день и очень приятно чувствовать себя причастной. Видеть, как сайт становится реальным.</p>
          <p className="about-me__bio-caption">Считаю себя довольно творческим человеком, а разработка всегда оставляет простор для творчества - и в процессе принятия решений, и в процессе исправления результатов некоторых из этих решений :)</p>
          <p className="about-me__bio-caption">На данный момент стараюсь набивать руку на фриланс-заказах, но хотелось бы попробовать поработать в команде под руководством более опытных разработчиков. Интересно было бы освоить новые технологии и почувствовать себя увереннее в том, с чем уже знакома.</p>
        </div>
        <a className="about-me__github link" target="_blank" href="https://github.com/iya-iysha" rel="noreferrer">Github</a>
      </div>
    </section>
  )
}