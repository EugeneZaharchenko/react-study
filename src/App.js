import './App.css';
import HellComponent from './HellComponent';
import CounterComponent from './CounterComponent';
import ListComp from './ListComp';
import RenderComp from './RenderComp';
import TodoList from './TodoList';

function App() {
  const hell = 'Hi from J0Z';

  return (
    <div className="App">
      <header className="App-header">
        <p>{hell}</p>

        <HellComponent />
      </header>
      <ListComp />;
      <CounterComponent />;
      <RenderComp />
      <TodoList />
    </div>
  );
}

export default App;
