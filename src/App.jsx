import { useState } from 'react';
import './App.css';
import Keypad from './components/Keypad';

const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    switch (value) {
      case '=':
        calculate();
        break;
      case 'C':
        clear();
        break;
      case 'AC':
        allClear();
        break;
      default:
        setInput(prevInput => prevInput + value);
        break;
    }
  };

  const calculate = () => {
    let num1 = '';
    let op = null;
    let num2 = '';

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
        op = ch;
        num1 = parseFloat(num1);
      } else if (!op) {
        num1 += ch;
      } else {
        num2 += ch;
      }
    }

    num2 = parseFloat(num2);

    switch (op) {
      case '+':
        setInput(String(num1 + num2));
        break;
      case '-':
        setInput(String(num1 - num2));
        break;
      case '*':
        setInput(String(num1 * num2));
        break;
      case '/':
        if (num2 === 0) {
          setInput("Error");
        } else {
          setInput(String(num1 / num2));
        }
        break;
      default:
        break;
    }
  };

  const clear = () => {
    setInput(prevInput => prevInput.slice(0, -1));
  };

  const allClear = () => {
    setInput("");
  };

  return (
    <div className="container">
      <form>
        <input type="text" value={input} readOnly />
      </form>
      <Keypad handleClick={handleClick} />
    </div>
  );
};

export default App;
