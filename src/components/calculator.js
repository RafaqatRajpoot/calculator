import React, { useState } from 'react';
import '../App.css';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const handleNumberClick = (number) => {
        if (displayValue === '0' || waitingForSecondOperand) {
            setDisplayValue(number);
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue(displayValue + number);
        }
    };

    const handleOperatorClick = (selectedOperator) => {
        const inputValue = parseFloat(displayValue);

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplayValue(result.toString());
        }

        setWaitingForSecondOperand(true);
        setOperator(selectedOperator);
    };

    const handleEqualsClick = () => {
        const inputValue = parseFloat(displayValue);

        if (firstOperand === null) {
            return;
        }

        if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand, inputValue, operator)

            if (result % 1 === 0) {
                setDisplayValue(result.toFixed(0).toString());
            } else {
                setDisplayValue(result.toFixed(4).toString());
            }
            setFirstOperand(null)
            setOperator(null);
        }
    };

    const calculate = (firstOperand, secondOperand, operator) => {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            case '%':
                return (firstOperand / 100) * secondOperand;
            default:
                return secondOperand;
        }
    };

    const handleClear = () => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    return (
        <div className="calculator">
            <div className="display">{displayValue}</div>
            <div className="keypad">
                <div className="row">
                    <button onClick={handleClear} className="clear-btn">AC</button>
                    <button onClick={() => handleOperatorClick('%')} className="operator-btn">%</button>
                    <button onClick={() => handleOperatorClick('/')} className="operator-btn">/</button>
                </div>
                <div className="row">
                    <button onClick={() => handleNumberClick('7')} className='num-btn'>7</button>
                    <button onClick={() => handleNumberClick('8')} className='num-btn'>8</button>
                    <button onClick={() => handleNumberClick('9')} className='num-btn'>9</button>
                    <button onClick={() => handleOperatorClick('*')} className="operator-btn">*</button>
                </div>
                <div className="row">
                    <button onClick={() => handleNumberClick('4')} className='num-btn'>4</button>
                    <button onClick={() => handleNumberClick('5')} className='num-btn'>5</button>
                    <button onClick={() => handleNumberClick('6')} className='num-btn'>6</button>
                    <button onClick={() => handleOperatorClick('-')} className="operator-btn">-</button>
                </div>
                <div className="row">
                    <button onClick={() => handleNumberClick('1')} className='num-btn'>1</button>
                    <button onClick={() => handleNumberClick('2')} className='num-btn'>2</button>
                    <button onClick={() => handleNumberClick('3')} className='num-btn'>3</button>
                    <button onClick={() => handleOperatorClick('+')} className="operator-btn">+</button>
                </div>
                <div className="row">
                    <button onClick={() => handleNumberClick('0')} className='num-btn'>0</button>
                    <button onClick={() => handleNumberClick('.')} className='num-btn'>.</button>
                    <button onClick={handleEqualsClick} className="equal-btn">=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
