import React from "react";
import Button from "../Button/Button";
import './navigation.scss';

const Navigation = ({
  hasPrevBtn, 
  hasNextBtn, 
  handleGoBackBtnClick, 
  handleSubmitBtnClick,
  prevBtnTitle,
  nextBtnDescription,
  nextBtnDisabled
}) => {
  return (
    <div className="navigation">
      {hasPrevBtn && <div className="navigation__wrapper">
        <Button role="prev" title={prevBtnTitle || "Назад"} onClick={handleGoBackBtnClick} />
      </div>}
      {hasNextBtn && <div className="navigation__wrapper">
        <p>{nextBtnDescription}</p>
        <Button role="next" title="Продолжить" onClick={handleSubmitBtnClick} disabled={nextBtnDisabled} />
      </div>}
    </div>
  )
}

export default Navigation;