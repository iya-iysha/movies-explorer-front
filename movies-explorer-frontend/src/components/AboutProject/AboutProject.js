import '../Main/Main.css';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="main__title">О проекте</h2>
      <div className="about-project__info">
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__terms">
        <p className="about-project__term about-project__term_type_frontend">1 неделя</p>
        <p className="about-project__term about-project__term_type_backend">4 недели</p>
      </div>
      <div className="about-project__steps">
        <p className="about-project__step">Back-end</p>
        <p className="about-project__step">Front-end</p>
      </div>
    </section>
  )
}