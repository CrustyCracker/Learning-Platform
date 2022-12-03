import React from 'react';
import '../style/App.css';
import {FirstCard} from "../components/FirstCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Pierwsza fiszka z bazy:
        </p>
        <FirstCard></FirstCard>
      </header>
    </div>
  );
}

export default App;
