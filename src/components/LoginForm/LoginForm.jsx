import React, {useState, useEffect, useRef} from 'react';
import Helmet from "react-helmet";
import {navigate} from "gatsby";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import './loginform.scss';

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    formErrors: {
      email: '', 
      password: ''
    },
    isEmailValid: false,
    isPasswordValid: false,
    isFormValid: false
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const errorEmailRef = useRef();
  const errorPasswordRef = useRef();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const validationResults = validateInput(name, value);
    setUserData({...userData, [name]: value, ...validationResults});
  }

  const validateInput = (inputName, value) => {
    const inputValidationErrors = userData.formErrors;
    let isEmailValid = userData.isEmailValid;
    let isPasswordValid = userData.isPasswordValid;

    switch(inputName) {
      case 'email':
        isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        inputValidationErrors.email = isEmailValid ? '' : 'Введите корректный email';
        break;
      case 'password':
        isPasswordValid = value.length >= 6;
        inputValidationErrors.password = isPasswordValid ? '': 'Пароль должен содержать не менее 6 символов';
        break;
      default:
        break;
    }

    return {
      formErrors: inputValidationErrors,
      isEmailValid: isEmailValid,
      isPasswordValid: isPasswordValid,
      isFormValid: isEmailValid && isPasswordValid
    };
  }

  const validateForm = () => {
    setUserData({
      ...userData,
      isFormValid: userData.isEmailValid && userData.isPasswordValid
    });
  }

  const submitForm = (e) => {
    e.preventDefault();
    validateForm();
    sessionStorage.setItem('isUserLoggedIn', true);
    sessionStorage.setItem('userEmail', userData.email);
    navigate("/addition");
  }

  useEffect(() => {
    if (userData.formErrors.email) {
      errorEmailRef.current.value = userData.formErrors.email
    } else if (userData.formErrors.password) {
      errorPasswordRef.current.value = userData.formErrors.password
    }
  }, [userData.formErrors])

  return (
    <>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <div className="app-page-wrapper">
        <h3 className="app-page-wrapper__title">Вход</h3>
        <form className="app-form app-form_login">
          <div className="app-form__field-wrapper">
            <label className="app-form__label" htmlFor="input-email">
              Логин
              <input
                required
                type="email"
                name="email"
                id="input-email" 
                className="app-form__input"
                value={userData.email}
                onChange={handleUserInput}
            />
            </label>
            <p ref={errorEmailRef} value={userData.formErrors.email || ''} className="app-form__error">
            {userData.formErrors.email}
            </p>
          </div>
          <div className="app-form__field-wrapper">
            <label className="app-form__label" htmlFor="input-password">
              Пароль
              <input
                required
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="input-password"
                className="app-form__input"
                value={userData.password}
                onChange={handleUserInput}
              />
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} onClick={handlePasswordVisibility} />
            </label>
            <p ref={errorPasswordRef} value={userData.formErrors.password || ''} className="app-form__error">
              {userData.formErrors.password}
              </p>
          </div>
          <button type="button" disabled={!userData.isFormValid} onClick={submitForm} className="app-form__submit">Войти</button>
        </form>
      </div>
    </>
  )
}

export default LoginForm