import React from 'react';
import Footer from '../Footer/Footer';
import './layout.scss';

export default function Layout({ children }) {
  return (
    <div className='app-page'>
      {children}
      <Footer />
    </div>
  )
}