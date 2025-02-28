'use strict';

const calculatorButtons = document.querySelectorAll('.calculator-button');
const displayNumber = document.querySelector('.display-number');
const displayOperator = document.querySelector('.display-operator');

const calculator = {
    currentNum: '',
    previousNum: '',
    operation: '',
};

// -------Functions----------

const init = function () {
    calculator.currentNum = '';
    calculator.previousNum = '';
    calculator.operation = '';

    displayNum();
    displayOp();
};

// Displaying Info

const clearDisplay = function () {
    displayNumber.textContent = '';
};

const displayNum = function () {
    displayNumber.textContent = calculator.currentNum;
};

const displayOp = function () {
    displayOperator.textContent = calculator.operation;
};

// Getting Info
const getNum = function (e) {
    if (!e.target.classList.contains('number')) return;
    if (calculator.currentNum.length >= 9) return;
    calculator.currentNum += e.target.textContent;
    displayNum();
};

const getOperator = function (e) {
    if (!e.target.classList.contains('operator') || e.target.id === 'equals')
        return;

    calculator.operation = e.target.textContent;
    displayOp();
    switchNum();
};

// Switching Num
const switchNum = function () {
    calculator.previousNum = calculator.currentNum;
    calculator.currentNum = '';
};

// Completing Calculation
const calculate = function (e) {
    if (e.target.id !== 'equals' || calculator.operation === '') return;

    // Convert strings to numbers
    const num1 = parseFloat(calculator.previousNum);
    const num2 = parseFloat(calculator.currentNum);
    let answer;

    switch (calculator.operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = num1 / num2;
            break;
    }

    calculator.currentNum = answer;
    calculator.previousNum = answer;
    displayNum();
    calculator.operation = '';
    displayOp();
};

// Clear display
const clear = function (e) {
    if (e.target.id === 'ac') {
        init();
    }
};

// Add +/-
const changeSide = function (e) {
    if (!(e.target.id === 'plus-minus')) return;

    if (!calculator.currentNum.includes('-')) {
        calculator.currentNum = '-' + calculator.currentNum;
        displayNum();
    } else {
        calculator.currentNum = calculator.currentNum.slice(1);
        displayNum();
    }
};

// Add %
const percentage = function (e) {
    if (!(e.target.id === 'percent')) return;
    calculator.currentNum = (
        parseFloat(calculator.currentNum) / 100
    ).toString();
    displayNum();
};

const calculatorFunc = function (e) {
    getNum(e);
    getOperator(e);
    calculate(e);
    changeSide(e);
    percentage(e);
    clear(e);
};

// Event Listeners
calculatorButtons.forEach((button) => {
    button.addEventListener('click', calculatorFunc);
});
