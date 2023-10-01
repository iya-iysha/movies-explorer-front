import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

export default function Main({ avatar, arrowBtn, planetImg }) {
  return (
    <main className="main">
      <Promo planetImg={planetImg} />
      <AboutProject />
      <Techs />
      <AboutMe avatar={ avatar } />
      <Portfolio arrowBtn={ arrowBtn }/>
    </main>
  )
}