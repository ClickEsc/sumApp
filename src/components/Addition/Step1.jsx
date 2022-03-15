import React, {useState, useEffect, useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {checkInputNumericOnly} from '../../helpers/helpers';
import { AdditionContext } from "../../store/additionContext";
import './addition.scss';

const Step1 = (props) => {
  const additionContext = useContext(AdditionContext);
  const [inputList, setInputList] = useState([]);
  const [inputNum, setInputNum] = useState(0);
  const [inputValuesObj, setInputValuesObj] = useState({});
  const [sum, setSum] = useState(0);

  const handleChangeInputValue = (e) => {
    const value = Number(e.target.value);
    const newValuesObj = Object.assign(inputValuesObj, {[e.target.id]: value});
    setInputValuesObj(newValuesObj)
  }

  const handleAddBtnClick = () => {
    setInputNum(inputNum + 1)
  }

  const handleSubmitBtnClick = (e) => {
    e.preventDefault();
    sumValues();
    props.onSubmit();
    additionContext.numbersArr = Object.values(inputValuesObj);
  }

  const sumValues = () => {
    const sum = Object.values(inputValuesObj).reduce((prev, next) => prev + next);
    console.log('sum', sum)
  }

  const addInputNode = (num) => {
    for (let i = inputList.length; i < num; i++) {
      inputList.push(
        <li key={i} className="addition__list-item">
          <label className="addition__label" htmlFor={`number${i+1}`}>
            Число {i+1}
            <input className="addition__input" id={`number${i+1}`} type="text" required={i === 0 || i === 1 ? true : false} onChange={handleChangeInputValue} onKeyDown={checkInputNumericOnly} />
          </label>
        </li>
      );
    };
  }

  useEffect(() => {
    setInputNum(2);
    addInputNode(2)
  }, [])

  useEffect(() => {
    if (inputNum >= 2) {
      addInputNode(inputNum + 1)
    }
  }, [inputNum])

  return (
    <div>
      <h3 className="addition__title">Шаг 1: Ввод данных</h3>
        <form>
        <ul className="addition__list">
          {inputList}
        </ul>
        <button
          type="button"
          className="addition__button addition__button_add" 
          onClick={handleAddBtnClick}
        >
          <FontAwesomeIcon className="addition__icon" icon={faPlus} />
          Добавить поле ввода
        </button>

        <div className="addition__next">
          <p className="addition__next-description">Перейти к подтверждению данных</p>
          <button
            type="submit"
            className="addition__button addition__button_submit"
            onClick={handleSubmitBtnClick}
            // disabled
          >
              Шаг 2
              <FontAwesomeIcon className="addition__icon" icon={faArrowRight} />
          </button>
        </div>
        </form>
    </div>
  )
}

export default Step1;