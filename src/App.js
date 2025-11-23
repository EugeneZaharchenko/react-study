import logo from './logo.svg';
import './App.css';
import HellComponent from "./HellComponent";

function App() {
    const hell = "Hi from J0Z"
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
              {hell}
          </p>
        < HellComponent/>
      </header>
    </div>
  );
}

export default App;
