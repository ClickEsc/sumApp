import React from "react";
import Button from "../Button/Button";
import './navigation.scss';

const Navigation = ({
  hasPrevBtn, 
  hasNextBtn, 
  handleGoBackBtnClick, 
  handleSubmitBtnClick,
  prevBtnTitle,
  nextBtnDescription
}) => {
  return (
    <div className="navigation">
      {hasPrevBtn && <div className="navigation__wrapper">
        <Button role="prev" title={prevBtnTitle || "Назад"} onClick={handleGoBackBtnClick} />
      </div>}
      {hasNextBtn && <div className="navigation__wrapper">
        <p>{nextBtnDescription}</p>
        <Button role="next" title="Продолжить" onClick={handleSubmitBtnClick} />
      </div>}
    </div>
  )
}

export default Navigation;