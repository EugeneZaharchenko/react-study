import './App.css';
import { useState } from 'react';
import HellComponent from './HellComponent';
import CounterComponent from './CounterComponent';
import ListComp from './ListComp';
import RenderComp from './RenderComp';
import TodoList from './TodoList';
import LifecycleDemo from './LifecycleDemo';
// import ClassLifecycleDemo from './ClassLifecycleDemo';
import UseLayoutEffectDemo from './UseLayoutEffectDemo';

function App() {
  const hell = 'Hi from J0Z';

  const myTodos = [
    { id: 1, todo: 'Вивчити React', done: false },
    { id: 2, todo: 'Зробити домашку', done: false },
    { id: 3, todo: 'Попити кави', done: true },
  ];

  // State для контролю видимості LifecycleDemo компонента
  const [showLifecycle, setShowLifecycle] = useState(true);
  // State для контролю видимості ClassLifecycleDemo компонента
  const [showClassLifecycle, setShowClassLifecycle] = useState(true);
  // State для контролю видимості UseLayoutEffectDemo компонента
  const [showLayoutEffect, setShowLayoutEffect] = useState(true);

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
      {/* Кнопка для демонстрації mounting/unmounting функціонального компонента */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => setShowLifecycle(!showLifecycle)}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: showLifecycle ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showLifecycle
            ? '🔴 Сховати Function Component (unmount)'
            : '🟢 Показати Function Component (mount)'}
        </button>
      </div>
      {/* Умовний рендеринг LifecycleDemo */}
      {showLifecycle && <LifecycleDemo initialCount={5} />}
      {/* Розділювач */}
      <hr style={{ margin: '40px 0', border: '2px solid #FF9800' }} />
      {/* Кнопка для демонстрації mounting/unmounting класового компонента */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => setShowClassLifecycle(!showClassLifecycle)}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: showClassLifecycle ? '#f44336' : '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showClassLifecycle
            ? '🔴 Сховати Class Component (componentWillUnmount)'
            : '🟢 Показати Class Component (componentDidMount)'}
        </button>
      </div>
      {/* Умовний рендеринг ClassLifecycleDemo */}
      {/*{showClassLifecycle && <ClassLifecycleDemo initialCount={10} />}*/}
      {/* Розділювач */}
      <hr style={{ margin: '40px 0', border: '2px solid #1976d2' }} />
      {/* Кнопка для демонстрації useLayoutEffect */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => setShowLayoutEffect(!showLayoutEffect)}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: showLayoutEffect ? '#f44336' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showLayoutEffect
            ? '🔴 Сховати useLayoutEffect Demo'
            : '🟢 Показати useLayoutEffect Demo'}
        </button>
      </div>
      {/* Умовний рендеринг UseLayoutEffectDemo */}
      {showLayoutEffect && (
        <UseLayoutEffectDemo title="⚡ useLayoutEffect vs useEffect" />
      )}
    </div>
  );
}

export default App;
