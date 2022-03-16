import React, {useState, useEffect, useContext, useRef} from "react";
import Helmet from "react-helmet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {checkInputNumericOnly} from '../../helpers/helpers';
import { AdditionContext } from "../../store/additionContext";
import './addition.scss';
import Navigation from "../Navigation/Navigation";

const Step1 = (props) => {
  const [additionContext, setAdditionContext] = useContext(AdditionContext);
  const [inputList, setInputList] = useState([]);
  const [inputNum, setInputNum] = useState(0);
  const [inputValuesArr, setInputValuesArr] = useState([]);
  const listRef = useRef();
  const title = "Шаг 1: Ввод данных";

  const handleInputValues = () => {
    const inputNodes = listRef.current.childNodes;
    const values = [];
    for (let i = 0; i < inputNodes.length; i++) {
      values.push(Number(inputNodes[i].childNodes[0].lastChild.value));
    }
    console.log(values)
    values.forEach((value, index) => {
      inputValuesArr.push({id: index + 1, value})
    })
    // inputValuesArr.push({id: e.target.id, value});
    setInputValuesArr([...inputValuesArr])
  }

  const handleAddBtnClick = () => {
    setInputNum(inputNum + 1)
  }

  const handleSubmitBtnClick = (e) => {
    e.preventDefault();
    handleInputValues()
    props.onSubmit();
    setAdditionContext({inputValuesArr: inputValuesArr});
  }

  const addInputNode = (num) => {
    for (let i = inputList.length; i < num; i++) {
      inputList.push(
        <li key={i} className="addition__list-item">
          <label className="addition__label" htmlFor={i+1}>
            Число {i+1}
            <input className="addition__input" min="1" id={i+1} type="text" required={i === 0 || i === 1 ? true : false} onKeyDown={checkInputNumericOnly} />
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
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h3 className="addition__title">{title}</h3>
        <form className="addition__form">
          <ul ref={listRef} className="addition__list">
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
          <Navigation
            hasNextBtn
            handleSubmitBtnClick={handleSubmitBtnClick} 
            nextBtnDescription="Перейти к подтверждению данных" 
          />
        </form> 
    </>
  )
}

export default Step1;