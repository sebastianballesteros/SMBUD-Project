import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND)
    fetch(process.env.REACT_APP_BACKEND)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
