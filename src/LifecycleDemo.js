import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MountUnmountExample from './MountUnmountExample';

/**
 * Компонент для демонстрації життєвого циклу React компонента
 * Показує три основні фази: Mounting, Updating, Unmounting
 */
const LifecycleDemo = ({ initialCount = 0 }) => {
  // =============== STATE ===============
  const [count, setCount] = useState(initialCount);
  const [text, setText] = useState('');
  const [seconds, setSeconds] = useState(0);

  // =============== MOUNTING PHASE (componentDidMount) ===============
  // useEffect з порожнім масивом залежностей [] виконується ТІЛЬКИ ОДИН РАЗ після першого рендера
  useEffect(() => {
    // console.log('🟢 MOUNTING: Компонент змонтовано (componentDidMount)');
    // console.log('Це виконається тільки один раз при створенні компонента');

    // Приклад: запит до API, ініціалізація, підписка на події
    // console.log('📡 Можна робити API запити тут');

    // Cleanup функція виконається при unmount
    return () => {
      // console.log('🔴 UNMOUNTING: Компонент демонтується');
      // console.log('Тут очищаємо ресурси: підписки, таймери, слухачі подій');
    };
  }, []); // Порожній масив = виконується тільки при mount/unmount

  // =============== UPDATING PHASE (componentDidUpdate для count) ===============
  // useEffect з залежністю [count] виконується КОЖЕН РАЗ, коли змінюється count
  useEffect(() => {
    console.log(`🔵 UPDATING: Count змінився на ${count}`);
    console.log('Це виконується при кожній зміні count');

    // Приклад: збереження в localStorage, аналітика
    if (count > 0) {
      localStorage.setItem('savedCount', count.toString());
      console.log(`💾 Збережено count=${count} в localStorage`);
    }
  }, [count]); // Виконується при зміні count

  // =============== UPDATING PHASE (componentDidUpdate для text) ===============
  useEffect(() => {
    if (text) {
      // console.log(`🔵 UPDATING: Text змінився на "${text}"`);
      // console.log('Можна валідувати введення або робити дебаунс запити');
    }
  }, [text]); // Виконується при зміні text

  // =============== TIMER EFFECT (з cleanup) ===============
  // Демонструє важливість cleanup функції для таймерів
  useEffect(() => {
    console.log('⏰ Запускаємо таймер');

    // Створюємо інтервал, який оновлюється кожну секунду
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds + 1;
        console.log(`⏱️ Таймер: ${newSeconds} секунд`);
        return newSeconds;
      });
    }, 1000);

    // ВАЖЛИВО: cleanup функція для очищення таймера
    return () => {
      console.log('⏰ Зупиняємо таймер (clearInterval)');
      clearInterval(intervalId);
    };
  }, []); // Запускається один раз при mount

  // =============== RENDER PHASE ===============
  // console.log('🎨 RENDER: Компонент рендериться');

  // =============== EVENT HANDLERS ===============
  const handleIncrement = () => {
    // console.log('➕ Кнопка +1 натиснута');
    setCount(count + 1);
  };

  const handleDecrement = () => {
    // console.log('➖ Кнопка -1 натиснута');
    setCount(count - 1);
  };

  const handleReset = () => {
    // console.log('🔄 Скидання лічильника');
    setCount(0);
    setSeconds(0);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };

  // =============== JSX ===============
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔄 Демонстрація життєвого циклу компонента</h2>

      <div style={styles.section}>
        <h3>📊 Лічильник (тригерить update при зміні)</h3>
        <p style={styles.count}>Count: {count}</p>
        <div style={styles.buttonGroup}>
          <button onClick={handleDecrement} style={styles.button}>
            -1
          </button>
          <button onClick={handleReset} style={styles.buttonReset}>
            Reset
          </button>
          <button onClick={handleIncrement} style={styles.button}>
            +1
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h3>⏱️ Таймер (демонструє cleanup)</h3>
        <p style={styles.timer}>Секунд з моменту mount: {seconds}</p>
      </div>

      <div style={styles.section}>
        <h3>✍️ Текстове поле (тригерить update при введенні)</h3>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Введіть текст..."
          style={styles.input}
        />
        <p>
          Ви ввели: <strong>{text || '(порожньо)'}</strong>
        </p>
      </div>

      <div style={styles.info}>
        <h4>💡 Відкрийте консоль браузера (F12), щоб побачити логи!</h4>
        <ul style={styles.list}>
          <li>🟢 Mounting - компонент створюється</li>
          <li>🔵 Updating - компонент оновлюється</li>
          <li>🔴 Unmounting - компонент видаляється</li>
          <li>🎨 Render - компонент рендериться</li>
        </ul>
      </div>

      {/* Додатковий приклад для чіткого розуміння Mount vs Unmount */}
      <MountUnmountExample />
    </div>
  );
};

// =============== PROP TYPES ===============
LifecycleDemo.propTypes = {
  initialCount: PropTypes.number,
};

// =============== STYLES ===============
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  count: {
    fontSize: '24px',
    textAlign: 'center',
    margin: '20px 0',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  timer: {
    fontSize: '20px',
    textAlign: 'center',
    color: '#FF9800',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonReset: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  info: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #2196F3',
  },
  list: {
    lineHeight: '1.8',
    marginTop: '10px',
  },
};

export default LifecycleDemo;
