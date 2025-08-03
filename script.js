let display = document.getElementById('display');
let historyList = document.getElementById('history');

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(display.value);
    let entry = `${display.value} = ${result}`;
    display.value = result;
    addToHistory(entry);
  } catch {
    display.value = 'Error';
  }
}

function calculateSqrt() {
  try {
    const value = eval(display.value);
    if (value < 0 || isNaN(value)) {
      throw new Error();
    }
    const result = Math.sqrt(value);
    addToHistory(`√(${display.value}) = ${result}`);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}


function addToHistory(entry) {
  let logs = JSON.parse(localStorage.getItem('calcHistory')) || [];
  logs.push(entry);
  localStorage.setItem('calcHistory', JSON.stringify(logs));
  renderHistory();
}

function renderHistory() {
  let logs = JSON.parse(localStorage.getItem('calcHistory')) || [];
  historyList.innerHTML = '';
  logs.forEach(item => {
    let li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem('calcHistory');
  renderHistory();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

function initDarkMode() {
  const dark = localStorage.getItem('darkMode') === 'true';
  if (dark) {
    document.body.classList.add('dark');
    document.getElementById('darkToggle').checked = true;
  }
}

window.onload = () => {
  renderHistory();
  initDarkMode();
};
