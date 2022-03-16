import React, {useEffect, useContext} from "react";
import Helmet from "react-helmet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {AdditionContext} from "../../store/additionContext";
import './addition.scss';

const Step3 = (props) => {
  const [additionContext, setAdditionContext] = useContext(AdditionContext);
  const inputValuesArr = additionContext.inputValuesArr;
  const title = "Шаг 3: Расчет данных";
  
  const sumValues = () => {
    const values = inputValuesArr.map(item => item.value);
    const sum = values.reduce((prev, next) => prev + next);
    setAdditionContext({inputValuesArr: additionContext.inputValuesArr, sum: sum})
  }

  useEffect(() => {
    sumValues();
    setTimeout(() => {
      props.onSubmit();
    }, 5000)
  }, [])

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h3 className="addition__title">Шаг 3: Расчет данных</h3>
      <div className="addition__preloader">
        <FontAwesomeIcon className="addition__preloader-icon" icon={faSpinner} />
      </div>
    </>
  )
}

export default Step3;