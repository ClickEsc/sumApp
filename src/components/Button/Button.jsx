import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import './button.scss';

const Button = ({title, onClick, disabled, role}) => {
  return (
    <button
      // type="submit"
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      {role === "prev" && <FontAwesomeIcon className="button__icon button__icon_prev" icon={faArrowLeft} />}
      {title}
      {role === "next" && <FontAwesomeIcon className="button__icon button__icon_next" icon={faArrowRight} />}
    </button>
  )
}

export default Button;