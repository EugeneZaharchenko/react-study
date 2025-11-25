import './App.css';
import HellComponent from './HellComponent';
import CounterComponent from './CounterComponent';
import ListComp from './ListComp';
import RenderComp from './RenderComp';
import TodoList from './TodoList';

function App() {
  const hell = 'Hi from J0Z';

  const myTodos = [
    { id: 1, todo: 'Вивчити React', done: false },
    { id: 2, todo: 'Зробити домашку', done: false },
    { id: 3, todo: 'Попити кави', done: true },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>{hell}</p>

        <HellComponent />
      </header>
      <ListComp />;
      <CounterComponent />;
      <RenderComp />
      <TodoList initialToDos={myTodos} title="🎯 Мої завдання на сьогодні" />
    </div>
  );
}

export default App;
