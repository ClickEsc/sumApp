import React, {useState, useEffect} from "react";
import {checkInputNumericOnly} from '../../helpers/helpers';
import './addition.scss';

const Addition = () => {
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

  const handleSubmitBtnClick = () => {
    sumValues();
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
    <div className="app-page-wrapper">
      <h2>Операция сложения</h2>
      <h3>Шаг 1: Ввод данных</h3>
      <ul className="addition__list">
        {inputList}
      </ul>
      <button className="addition__button addition__button_add" onClick={handleAddBtnClick} type="button">Добавить поле ввода</button>
      <button className="addition__button addition__button_submit" onClick={handleSubmitBtnClick} type="submit">Перейти к подтверждению данных</button>
    </div>
  )
}

export default Addition