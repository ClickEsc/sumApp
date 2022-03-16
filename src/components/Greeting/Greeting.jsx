import React from "react";
import './greeting.scss';

const Greeting = () => {
  const userEmail = sessionStorage.getItem('userEmail');
  const emailNameLettersArr = userEmail.split('@')[0].split('');
  const emailName = emailNameLettersArr.map((item, index) => {
    if (index === 0) {
      return item.toUpperCase();
    }
    return item
  }).join('').toString();
  const domainLettersArr = userEmail.split('@')[1].split('.')[0].split('');
  const domainZone = userEmail.split('@')[1].split('.')[1];
  const secretDomain = domainLettersArr.map((item, index) => {
    if (index > 0) {
      const newItem = "*"
      return newItem
    }
    return item
  }).join('').toString();

  const finalUserGreeting = `${emailName}@${secretDomain}.${domainZone}`;

  return (
    <div className="greeting">
      <div className="greeting__emoji">👋</div>
      <h3 className="greeting__title">Привет, {finalUserGreeting}!</h3>
    </div>
  )
}

export default Greeting;