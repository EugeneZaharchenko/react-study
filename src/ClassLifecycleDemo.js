import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент на основі КЛАСУ для демонстрації життєвого циклу
 * Показує всі основні методи життєвого циклу класових компонентів
 */
class ClassLifecycleDemo extends Component {
  // ═══════════════════════════════════════════════════════════
  // 1️⃣ CONSTRUCTOR - Перший метод, що викликається
  // ═══════════════════════════════════════════════════════════
  constructor(props) {
    super(props); // ОБОВ'ЯЗКОВО викликати super(props)!

    console.log('🟡 CONSTRUCTOR: Компонент ініціалізується');
    console.log('Це ПЕРШИЙ метод життєвого циклу');
    console.log("Тут ініціалізуємо state та прив'язуємо методи");

    // Ініціалізація state
    this.state = {
      count: props.initialCount || 0,
      text: '',
      seconds: 0,
      updateLogs: [],
    };

    // Прив'язка методів до контексту (якщо не використовуємо стрілкові функції)
    // this.handleIncrement = this.handleIncrement.bind(this);
  }

  // ═══════════════════════════════════════════════════════════
  // 2️⃣ STATIC getDerivedStateFromProps
  // ═══════════════════════════════════════════════════════════
  // Викликається перед кожним render (і при mount, і при update)
  // Використовується рідко - тільки коли state залежить від props
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('🟣 getDerivedStateFromProps: props або state змінилися');
    console.log('Props:', nextProps);
    console.log('State:', prevState);

    // Повертаємо об'єкт для оновлення state, або null
    // Приклад: синхронізація state з props
    if (nextProps.resetCount && prevState.count !== 0) {
      return { count: 0 };
    }

    return null; // Не оновлюємо state
  }

  // ═══════════════════════════════════════════════════════════
  // 3️⃣ componentDidMount - Викликається ОДИН РАЗ після mount
  // ═══════════════════════════════════════════════════════════
  componentDidMount() {
    console.log('🟢 componentDidMount: Компонент змонтовано в DOM');
    console.log('Це відбувається ОДИН РАЗ після першого render');
    console.log('Тут робимо: API запити, підписки, таймери');

    // Приклад: Запуск таймера
    this.timerInterval = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }));
      console.log('⏱️ Таймер тік');
    }, 1000);

    // Приклад: Імітація API запиту
    console.log('📡 Імітація API запиту...');
    setTimeout(() => {
      console.log('✅ API запит завершено');
    }, 2000);
  }

  // ═══════════════════════════════════════════════════════════
  // 4️⃣ shouldComponentUpdate - Оптимізація рендерингу
  // ═══════════════════════════════════════════════════════════
  // Дозволяє контролювати, чи потрібно робити re-render
  shouldComponentUpdate(nextProps, nextState) {
    console.log('🔵 shouldComponentUpdate: Перевіряємо, чи потрібен re-render');
    console.log('Поточний state:', this.state);
    console.log('Новий state:', nextState);

    // Приклад оптимізації: не рендеримо, якщо count парне
    // (це просто для демонстрації, в реальності так не роблять!)
    // if (nextState.count % 2 === 0 && nextState.count !== this.state.count) {
    //   console.log('⛔ Пропускаємо render для парного числа');
    //   return false; // НЕ рендерити
    // }

    // Повертаємо true = рендерити, false = не рендерити
    return true;
  }

  // ═══════════════════════════════════════════════════════════
  // 5️⃣ getSnapshotBeforeUpdate - Перед оновленням DOM
  // ═══════════════════════════════════════════════════════════
  // Викликається безпосередньо перед тим, як зміни потраплять в DOM
  // Використовується рідко (наприклад, для збереження scroll позиції)
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('📸 getSnapshotBeforeUpdate: Зберігаємо snapshot перед update');
    console.log('Попередній state:', prevState);
    console.log('Поточний state:', this.state);

    // Повертаємо значення, яке передасться в componentDidUpdate
    // Приклад: зберігаємо попереднє значення count
    return prevState.count;
  }

  // ═══════════════════════════════════════════════════════════
  // 6️⃣ componentDidUpdate - Після кожного оновлення
  // ═══════════════════════════════════════════════════════════
  // Викликається після кожного re-render (крім першого)
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('🔵 componentDidUpdate: Компонент оновлено');
    console.log('Попередній state:', prevState);
    console.log('Поточний state:', this.state);
    console.log('Snapshot:', snapshot);

    // Типові дії: запити до API, оновлення DOM, аналітика
    if (prevState.count !== this.state.count) {
      console.log(
        `📊 Count змінився з ${prevState.count} на ${this.state.count}`,
      );

      // Зберігаємо лог змін
      this.setState(prevState => ({
        updateLogs: [
          ...prevState.updateLogs,
          `Count: ${prevState.count} → ${this.state.count}`,
        ].slice(-5), // Зберігаємо тільки останні 5
      }));

      // Приклад: збереження в localStorage
      localStorage.setItem('classComponentCount', this.state.count);
    }

    if (prevState.text !== this.state.text) {
      console.log(`✍️ Text змінився на: "${this.state.text}"`);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 7️⃣ componentWillUnmount - Перед видаленням компонента
  // ═══════════════════════════════════════════════════════════
  // Викликається ОДИН РАЗ перед unmount
  componentWillUnmount() {
    console.log('🔴 componentWillUnmount: Компонент видаляється');
    console.log('Тут очищаємо: таймери, підписки, слухачі подій');

    // Очищаємо таймер
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      console.log('⏰ Таймер зупинено');
    }

    // Очищаємо localStorage (опціонально)
    console.log('🧹 Cleanup завершено');
  }

  // ═══════════════════════════════════════════════════════════
  // 8️⃣ componentDidCatch - Обробка помилок (Error Boundary)
  // ═══════════════════════════════════════════════════════════
  componentDidCatch(error, errorInfo) {
    console.error('❌ componentDidCatch: Помилка в компоненті');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);

    // Можна зберегти помилку в state та показати fallback UI
    this.setState({ hasError: true, error: error.toString() });
  }

  // ═══════════════════════════════════════════════════════════
  // EVENT HANDLERS (стрілкові функції для автобіндингу)
  // ═══════════════════════════════════════════════════════════

  handleIncrement = () => {
    console.log('➕ Кнопка +1 натиснута');
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  handleDecrement = () => {
    console.log('➖ Кнопка -1 натиснута');
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  };

  handleReset = () => {
    console.log('🔄 Скидання');
    this.setState({
      count: 0,
      seconds: 0,
      text: '',
      updateLogs: [],
    });
  };

  handleTextChange = event => {
    this.setState({ text: event.target.value });
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER - Викликається при кожному рендері
  // ═══════════════════════════════════════════════════════════
  render() {
    console.log('🎨 RENDER: Компонент рендериться');

    const { count, text, seconds, updateLogs } = this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>🏛️ Class Component - Життєвий цикл</h2>

        <div style={styles.section}>
          <h3>📊 Лічильник (тригерить componentDidUpdate)</h3>
          <p style={styles.count}>Count: {count}</p>
          <div style={styles.buttonGroup}>
            <button onClick={this.handleDecrement} style={styles.button}>
              -1
            </button>
            <button onClick={this.handleReset} style={styles.buttonReset}>
              Reset
            </button>
            <button onClick={this.handleIncrement} style={styles.button}>
              +1
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h3>⏱️ Таймер (componentDidMount + componentWillUnmount)</h3>
          <p style={styles.timer}>Секунд з моменту mount: {seconds}</p>
        </div>

        <div style={styles.section}>
          <h3>✍️ Текстове поле</h3>
          <input
            type="text"
            value={text}
            onChange={this.handleTextChange}
            placeholder="Введіть текст..."
            style={styles.input}
          />
          <p>
            Ви ввели: <strong>{text || '(порожньо)'}</strong>
          </p>
        </div>

        {updateLogs.length > 0 && (
          <div style={styles.section}>
            <h3>📜 Історія змін (componentDidUpdate)</h3>
            <ul style={styles.list}>
              {updateLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={styles.info}>
          <h4>💡 Відкрийте консоль (F12) для перегляду логів!</h4>
          <ul style={styles.list}>
            <li>🟡 constructor - ініціалізація</li>
            <li>🟢 componentDidMount - після mount</li>
            <li>🔵 componentDidUpdate - після update</li>
            <li>🔴 componentWillUnmount - перед unmount</li>
            <li>🎨 render - при кожному рендері</li>
          </ul>
        </div>
      </div>
    );
  }
}

// ═══════════════════════════════════════════════════════════
// PROP TYPES
// ═══════════════════════════════════════════════════════════
ClassLifecycleDemo.propTypes = {
  initialCount: PropTypes.number,
  resetCount: PropTypes.bool,
};

ClassLifecycleDemo.defaultProps = {
  initialCount: 0,
  resetCount: false,
};

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff3e0',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    border: '3px solid #ff9800',
  },
  title: {
    textAlign: 'center',
    color: '#e65100',
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
    color: '#FF5722',
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
    backgroundColor: '#FF9800',
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
    border: '2px solid #FF9800',
    borderRadius: '4px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  info: {
    backgroundColor: '#fff3e0',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #FF9800',
  },
  list: {
    lineHeight: '1.8',
    marginTop: '10px',
  },
};

export default ClassLifecycleDemo;
