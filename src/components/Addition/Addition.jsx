import React, {useState, useEffect, useContext} from "react";
import {AdditionContext} from "../../store/additionContext";
import Greeting from "../Greeting/Greeting";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import './addition.scss';

const Addition = () => {
  const context = useContext(AdditionContext);
  const [additionContext, setAdditionContext] = useState(context);
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
  }

  const handlePrevStep = () => {
    setStep(step - 1);
  }

  const handleFirstStep = () => {
    setStep(1);
  }

  const handleSwitchSteps = (param) => {
    switch(param) {
      case 1:
        return <Step1 onSubmit={handleNextStep} />;
      case 2:
        return <Step2 onGoBackBtnClick={handlePrevStep} onSubmit={handleNextStep} />;
      case 3:
        return <Step3 onGoBackBtnClick={handlePrevStep} onSubmit={handleNextStep} />;
      case 4:
        return <Step4 onGoBackBtnClick={handleFirstStep} onSubmit={handleNextStep} />;
      default:
        return <Step1 onSubmit={handleNextStep} />;
    }
  }

  useEffect(() => {
    setStep(1)
  }, []);

  useEffect(() => {
    handleSwitchSteps(step);
  }, [step]);

  return (
    <AdditionContext.Provider value={[
      {
        step: step,
        ...additionContext
      }, 
      setAdditionContext]}>
      <div className="addition-page-wrapper">
        <Greeting />
        <div className="addition">
          <h2 className="addition__heading">Операция сложения</h2>
          {handleSwitchSteps(step)}
        </div>
      </div>
    </AdditionContext.Provider>
  )
}

export default Addition