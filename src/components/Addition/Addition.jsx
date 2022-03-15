import React, {useState, useEffect, useContext} from "react";
import { AdditionContext } from "../../store/additionContext";
import Step1 from './Step1';
import Step2 from './Step2';
import './addition.scss';

const Addition = () => {
  const [step, setStep] = useState(0);
  // const [steps, setSteps] = useState({});

  const additionContext = useContext(AdditionContext)

  const handleNextStep = () => {
    setStep(step + 1);
  }

  const handleSwitchSteps = (param) => {
    switch(param) {
      case 1:
        return <Step1 onSubmit={handleNextStep} />;
      case 2:
        return <Step2 onSubmit={handleNextStep} />;
      default:
        return <Step1 step={step} />;
    }
  }

  useEffect(() => {
    // setSteps({
    //   step1: {
    //     current: true,
    //     complete: false
    //   }
    // })
    setStep(1)
  }, []);

  useEffect(() => {
    handleSwitchSteps(step);
  }, [step]);

  return (
    <AdditionContext.Provider value={{
      step: step,
      numbersArr: []
    }} >
      <div className="app-page-wrapper">
        <h2 className="addition__heading">Операция сложения</h2>
        {handleSwitchSteps(step)}
      </div>
    </AdditionContext.Provider>
  )
}

export default Addition