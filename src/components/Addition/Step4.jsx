import React from "react";
import Helmet from "react-helmet";
import Navigation from "../Navigation/Navigation";
import AdditionTable from "../Table/Table";
import "./addition.scss";

const Step4 = (props) => {
  const title = "Шаг 4: Результат";

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
      <AdditionTable withSumRow />
      <Navigation
        hasPrevBtn
        handleGoBackBtnClick={handleGoBackBtnClick}
        prevBtnTitle="Вернуться к вводу данных"
      />
    </>
  )
}

export default Step4;