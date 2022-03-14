import React from 'react';
import {Link} from "gatsby";
import './main.scss';

const Main = () => {
  return (
    <main className="app-main">
      <title>SUMmer App</title>
      <h1 className="app-main__title"><span role="img" aria-label="Sunflower emoji">🌻</span> SUMmer App</h1>
      <h2 className="app-main__subtitle">Приложение для сложения чисел</h2>
      <Link to="/login" className="app-main__link">Вход</Link>
    </main>
  )
}

export default Main