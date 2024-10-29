let currentValue = '';
let previousValue = '';
let calculation = null;
let resetDisplay = false;

const display = document.getElementById('display');
display.value = '0';

document.querySelectorAll('.container button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('clear')) {
      clear();
    } else if (button.classList.contains('operator')) {
      inputOperator(button.textContent);
    } else if (button.classList.contains('num')) {
      inputNumber(button.textContent);
    } else if (button.classList.contains('equals')) {
      calculate();
    } else if (button.classList.contains('decimal')) {
      inputDecimal();
    }
  });
});

function clear() {
  display.value = '0';
  currentValue = '';
  previousValue = '';
  calculation = null;
}

function inputOperator(operator) {
  if (calculation !== null) calculate();
  previousValue = display.value;
  calculation = operator;
  display.value = operator;
  resetDisplay = true;
}

function inputNumber(number) {
  if (resetDisplay) {
    display.value = number;
    resetDisplay = false;
  } else {
    display.value = display.value === '0' ? number : display.value + number;
  }
  currentValue = display.value;
}

function calculate() {
  if (calculation === null || resetDisplay) return;
  
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (calculation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  display.value = Math.round(result * 1000000) / 1000000;
  calculation = null;
  currentValue = display.value;
  resetDisplay = true;
}

function inputDecimal() {
  if (resetDisplay) {
    display.value = '0.';
    resetDisplay = false;
  } else if (!display.value.includes('.')) {
    display.value += '.';
  }
  currentValue = display.value;
}

