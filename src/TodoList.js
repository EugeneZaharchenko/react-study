import React, { useState, useId, useMemo } from 'react';
import PropTypes from 'prop-types';

const defaultTodos = [
  { todo: '1st todo', done: false },
  { todo: '2nd todo', done: false },
  { todo: '3rd todo', done: false },
  { todo: '4th todo', done: false },
];

const TodoList = ({ initialToDos = defaultTodos, title = '📝 Todo List' }) => {
  // Генеруємо унікальний префікс для цього компонента
  const idPrefix = useId();

  // Створюємо todos з унікальними ID на основі useId префіксу
  const todosWithIds = useMemo(() => {
    return initialToDos.map((todo, index) => ({
      ...todo,
      id: todo.id || `${idPrefix}-${index}`,
    }));
  }, [initialToDos, idPrefix]);

  const [toDos, setToDos] = useState(todosWithIds);

  const toggleTodo = id => {
    const updatedToDos = toDos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
    setToDos(updatedToDos);
  };

  const deleteTodo = id => {
    const updatedToDos = toDos.filter(todo => todo.id !== id);
    setToDos(updatedToDos);
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '2px solid #4CAF50',
        margin: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2>{title}</h2>
      <p style={{ color: '#666' }}>
        Всього завдань: {toDos.length} | Виконано:{' '}
        {toDos.filter(t => t.done).length} | Залишилось:{' '}
        {toDos.filter(t => !t.done).length}
      </p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {toDos.map(item => (
          <li
            key={item.id}
            style={{
              padding: '12px',
              margin: '8px 0',
              backgroundColor: item.done ? '#e8f5e9' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleTodo(item.id)}
                style={{
                  marginRight: '12px',
                  cursor: 'pointer',
                  width: '18px',
                  height: '18px',
                }}
              />
              <span
                style={{
                  textDecoration: item.done ? 'line-through' : 'none',
                  color: item.done ? '#888' : '#333',
                  fontSize: '16px',
                }}
              >
                {item.todo}
              </span>
            </div>

            <button
              onClick={() => deleteTodo(item.id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>

      {toDos.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            color: '#999',
            fontSize: '18px',
            marginTop: '20px',
          }}
        >
          🎉 Всі завдання виконано!
        </p>
      )}
    </div>
  );
};

TodoList.propTypes = {
  initialToDos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      todo: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
  title: PropTypes.string,
};

export default TodoList;
