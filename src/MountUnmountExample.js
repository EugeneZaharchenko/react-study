import React, { useEffect, useState } from 'react';

/**
 * Простий приклад для розуміння різниці між Mount і Unmount
 */
const MountUnmountExample = () => {
  const [count, setCount] = useState(0);

  // ════════════════════════════════════════════════════════
  // Приклад 1: Mount + Unmount (з cleanup)
  // ════════════════════════════════════════════════════════
  useEffect(() => {
    // 🟢 MOUNT CODE - виконується при створенні
    console.log('═══════════════════════════════════════');
    console.log('🟢 MOUNT: Компонент створено!');
    console.log('Цей код виконується ЗАРАЗ (при mount)');
    console.log('═══════════════════════════════════════');

    // 🔴 UNMOUNT CODE - виконається при видаленні
    return () => {
      console.log('═══════════════════════════════════════');
      console.log('🔴 UNMOUNT: Компонент видаляється!');
      console.log('Цей код виконається ПІЗНІШЕ (при unmount)');
      console.log('═══════════════════════════════════════');
    };
  }, []);

  // ════════════════════════════════════════════════════════
  // Приклад 2: Таймер з cleanup
  // ════════════════════════════════════════════════════════
  useEffect(() => {
    // 🟢 MOUNT: Запускаємо таймер
    console.log('⏰ Mount: Запускаємо setInterval');
    const intervalId = setInterval(() => {
      console.log('⏱️ Tick! (таймер працює)');
    }, 2000);

    // 🔴 UNMOUNT: Зупиняємо таймер
    return () => {
      console.log('⏰ Unmount: Зупиняємо setInterval');
      console.log(
        '❌ Якби не було цього cleanup, таймер продовжував би працювати!',
      );
      clearInterval(intervalId);
    };
  }, []);

  // ════════════════════════════════════════════════════════
  // Приклад 3: Update effect (для порівняння)
  // ════════════════════════════════════════════════════════
  useEffect(() => {
    console.log(`🔵 UPDATE: Count змінився на ${count}`);
    // Цей effect виконується при кожній зміні count
  }, [count]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mount vs Unmount Example</h2>

      <div style={styles.box}>
        <p style={styles.instruction}>
          👉 Відкрийте консоль браузера (F12) і спостерігайте за логами!
        </p>

        <div style={styles.section}>
          <h3>Що відбувається зараз:</h3>
          <ul style={styles.list}>
            <li>🟢 Mount код вже виконався (подивіться в консоль)</li>
            <li>⏱️ Таймер працює (логує кожні 2 секунди)</li>
            <li>
              🔴 Unmount код виконається, коли ви натиснете &quot;Сховати&quot;
              в App
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Тест Update:</h3>
          <p style={styles.count}>Count: {count}</p>
          <button onClick={() => setCount(count + 1)} style={styles.button}>
            +1 (подивіться в консоль)
          </button>
        </div>

        <div style={styles.warning}>
          <h4>⚠️ Важливо:</h4>
          <p>
            Натисніть кнопку &quot;Сховати Lifecycle Demo&quot; у верхній
            частині сторінки, щоб побачити Unmount логи в консолі!
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  box: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  instruction: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FF5722',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#FFF3E0',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  list: {
    lineHeight: '2',
    fontSize: '16px',
  },
  count: {
    fontSize: '24px',
    textAlign: 'center',
    margin: '15px 0',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  warning: {
    backgroundColor: '#FFEBEE',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #f44336',
    marginTop: '20px',
  },
};

export default MountUnmountExample;
