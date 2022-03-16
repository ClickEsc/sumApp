import React from "react";
import Helmet from "react-helmet";
import AdditionTable from "../Table/Table";
import Navigation from "../Navigation/Navigation";
import './addition.scss';

const Step2 = (props) => {
  const title = "Шаг 2: Подтверждение данных";

  const handleSubmitBtnClick = (e) => {
    e.preventDefault();
    props.onSubmit();
  }

  const handleGoBackBtnClick = (e) => {
    e.preventDefault();
    props.onGoBackBtnClick();
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h3 className="addition__title">{title}</h3>
      <AdditionTable />
      <Navigation 
        hasPrevBtn 
        hasNextBtn 
        handleGoBackBtnClick={handleGoBackBtnClick} 
        handleSubmitBtnClick={handleSubmitBtnClick} 
        nextBtnDescription="Перейти к рассчету данных" 
      />
    </>
  )
}

export default Step2;