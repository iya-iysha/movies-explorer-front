import '../App/App.css';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound () {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <div className="not-found__message">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__caption">Страница не найдена</p>
      </div>
      <button className="not-found__back-btn link" type="button" onClick={goBack}>Назад</button>
    </main>
  )
}