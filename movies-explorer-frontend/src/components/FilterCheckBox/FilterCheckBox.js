import './FilterCheckBox.css';

export default function FilterCheckBox () {
  return (
    <div className="filter">
      <label className="filter__switch">
        <input className="filter__switch-input" type="checkbox" />
        <span className="filter__slider"></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  )
}