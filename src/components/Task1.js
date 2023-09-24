import React, { useState, useEffect } from 'react';
import './Task1.css';

function Task1() {
  const [result, setresult] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [themeChanged, setThemeChanged] = useState(false);

  const handleclick = (e) => {
    setresult(result.concat(e.target.name));
  };

  const handleKeyboardInput = (e) => {
    const keyValue = e.key;

    if (!isNaN(keyValue) || keyValue === '.' || keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/' || keyValue === '%' || keyValue === 'Enter') {
      if (keyValue === 'Enter') {
        e.preventDefault(); // Prevent form submission behavior
        calculate();
      } else {
        setresult(result.concat(keyValue));
      }
    } else if (keyValue === 'Backspace') {
      backspace();
    }
  };

  const clear = () => {
    setresult('');
  };

  const calculate = () => {
    try {
      setresult(eval(result).toString());
    } catch (err) {
      setresult('error');
    }
  };

  const backspace = () => {
    setresult(result.slice(0, -1));
  };



  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    setThemeChanged(true); // Set themeChanged to true when theme changes
  };

  const applyFunction = (func) => {
    try {
      const resultValue = eval(result);
      switch (func) {
        case 'sin':
          setresult(Math.sin(resultValue).toString());
          break;
        case 'cos':
          setresult(Math.cos(resultValue).toString());
          break;
        case 'tan':
          setresult(Math.tan(resultValue).toString());
          break;
        case 'cot':
          setresult(1 / Math.tan(resultValue).toString());
          break;
        case 'inv':
          setresult(1 / resultValue);
          break;
        case 'mod':
          setresult(resultValue % 1);
          break;
        default:
          break;
      }
    } catch (err) {
      setresult('error');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardInput);
    return () => {
      document.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyboardInput]);

  // Use the themeChanged state to control the theme class
  const themeClass = `App ${isMaximized ? 'maximized' : ''} ${isDarkTheme ? 'dark-theme' : 'light-theme'} ${themeChanged ? 'theme-changed' : ''}`;

  return (
    <div className={themeClass}>
      <div className="container-fluid">
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
          <input type="text" value={result} style={{ textAlign: 'right' }} readOnly />
        </form>

        <div className="keypad">
          <button className="highlight" onClick={clear} id="clear">
            clear
          </button>
          <button className="highlight" onClick={backspace} id="backspace">
            c
          </button>
          <button className="highlight" name="/" onClick={handleclick}>
            &divide;
          </button>
          <button className="highlight" name="*" onClick={handleclick}>
            &times;
          </button>
          <button name="9" onClick={handleclick}>
            9
          </button>
          <button name="8" onClick={handleclick}>
            8
          </button>
          <button name="7" onClick={handleclick}>
            7
          </button>
          <button className="highlight" name="-" onClick={handleclick}>
            &ndash;
          </button>
          <button name="6" onClick={handleclick}>
            6
          </button>
          <button name="5" onClick={handleclick}>
            5
          </button>
          <button name="4" onClick={handleclick}>
            4
          </button>
          <button className="highlight" name="+" onClick={handleclick}>
            +
          </button>
          <button name="3" onClick={handleclick}>
            3
          </button>
          <button name="2" onClick={handleclick}>
            2
          </button>
          <button name="1" onClick={handleclick}>
            1
          </button>
          <button className="highlight" name="0" onClick={handleclick}>
            0
          </button>
          <button className="highlight" name="." onClick={handleclick}>
            .
          </button>
          <button className="highlight" name="=" onClick={calculate} id="result">
            =
          </button>
          <button className="highlight" onClick={() => applyFunction('sin')}>
            sin
          </button>
          <button className="highlight" onClick={() => applyFunction('cos')}>
            cos
          </button>
          <button className="highlight" onClick={() => applyFunction('tan')}>
            tan
          </button>
          <button className="highlight" onClick={() => applyFunction('cot')}>
            cot
          </button>
          <button className="highlight" onClick={() => applyFunction('inv')}>
            1/x
          </button>
          <button className="highlight" onClick={() => applyFunction('mod')}>
            %
          </button>
        </div>
    
      </div>

      <button className="theme-toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

export default Task1;
