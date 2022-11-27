import React from 'react';
import logo from './logo.svg';
import TestComponent from './TestComponent';
import './App.css';
import {FirstCard} from "./FirstCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Wiadomość z backendu:
        </p>
        <TestComponent></TestComponent>
        <br/>
        <FirstCard></FirstCard>
      </header>
    </div>
  );
}

export default App;
