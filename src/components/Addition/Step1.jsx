import React, {useState, useEffect, useContext, useRef} from "react";
import Helmet from "react-helmet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {checkInputNumericOnly} from '../../helpers/helpers';
import {AdditionContext} from "../../store/additionContext";
import './addition.scss';
import Navigation from "../Navigation/Navigation";

const Step1 = (props) => {
  const [additionContext, setAdditionContext] = useContext(AdditionContext);
  const [inputList, setInputList] = useState([]);
  const [inputNum, setInputNum] = useState(0);
  const [inputValuesArr, setInputValuesArr] = useState([]);
  const [isInputTrigger, setIsInputTrigger] = useState(false);
  const [isInputErrors, setIsInputErrors] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [requiredInputValues, setRequiredInputValues] = useState({value1: '', value2: ''});
  const listRef = useRef();
  const title = "Шаг 1: Ввод данных";

  const handleInputValues = () => {
    const inputNodes = listRef.current.childNodes;
    const values = [];
    for (let i = 0; i < inputNodes.length; i++) {
      values.push(Number(inputNodes[i].childNodes[0].lastChild.value));
    }
    values.forEach((value, index) => {
      inputValuesArr.push({id: index + 1, value})
    })
    setInputValuesArr([...inputValuesArr])
  }

  const handleAddBtnClick = () => {
    if (inputNum >= 2) {
      addInputNode(inputNum + 1);
      setInputNum(inputNum + 1);
    }
  }

  const handleSubmitBtnClick = (e) => {
    e.preventDefault();
    handleInputValues()
    props.onSubmit();
    setAdditionContext({inputValuesArr: inputValuesArr});
  }

  const checkHasValue = (e) => {
    if (e.target) {
      if (e.target.value && e.target.value.startsWith(0)) {
        e.target.value = '';
        setErrorText('Введите корректное значение');
      }
      const id = e.target.attributes.id.value;
      Object.assign(requiredInputValues, {[`value${id}`]: e.target.value});
      setRequiredInputValues({...requiredInputValues});
      setIsInputTrigger(!isInputTrigger);
    }
  }

  const addInputNode = (num) => {
    for (let i = inputList.length; i < num; i++) {
      inputList.push(
        <li key={i} className="addition__list-item">
          <label className="addition__label" htmlFor={i+1}>
            Число {i+1}
            <input
              id={i+1}
              className="addition__input"
              type="text" 
              required={i === 0 || i === 1 ? true : false}
              onKeyDown={checkInputNumericOnly}
              onChange={checkHasValue} 
            />
          </label>
        </li>
      );
    };
  }

  useEffect(() => {
    setInputNum(2);
    addInputNode(2);
  }, []);

  useEffect(() => {
    if (isInputTrigger) {
      if (isInputErrors) {
        setErrorText('Введите первые два значения');
        setIsNextBtnDisabled(true);
      } else {
        setErrorText('');
        setIsNextBtnDisabled(false);
      }
    }
  }, [isInputTrigger, isInputErrors]);

  useEffect(() => {
    if (requiredInputValues.value1 && requiredInputValues.value2) {
      setIsInputErrors(false);
    } else {
      setIsInputErrors(true);
    }
  }, [requiredInputValues]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h3 className="addition__title">{title}</h3>
        <form className="addition__form">
          <p className="addition__form-error">{errorText}</p>
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
            nextBtnDisabled={isNextBtnDisabled}
          />
        </form> 
    </>
  )
}

export default Step1;