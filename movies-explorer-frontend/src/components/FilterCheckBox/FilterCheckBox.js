import '../App/App.css';
import './FilterCheckBox.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function FilterCheckBox ({ onChangeFilter }) {
  const location = useLocation().pathname;
  const [formData, setFormData] = useState({
    check: false
  });

  const onChange = (e) => {
    const {name, checked} = e.target;

    setFormData({
      ...formData,
      [name]: checked
    })
  }

  useEffect(() => {
    if (location === '/movies' || location === '/saved-movies') {
      setFormData({
        check: false
      })
    }
  }, [location]);

  useEffect(() => {
    onChangeFilter(formData.check);
  }, [formData.check]);

  return (
    <div className="filter">
      <label className="filter__switch button">
        <input className="filter__switch-input" type="checkbox" onChange={onChange} name="check" checked={formData.check} />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  )
}