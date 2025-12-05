import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Демонстрація різниці між useEffect та useLayoutEffect
 *
 * КЛЮЧОВА РІЗНИЦЯ:
 * - useEffect: виконується АСИНХРОННО після того, як браузер намалював зміни (після paint)
 * - useLayoutEffect: виконується СИНХРОННО перед тим, як браузер малює зміни (перед paint)
 */

// ════════════════════════════════════════════════════════════════════
// Компонент 1: Демонстрація мерехтіння (flicker) з useEffect
// ════════════════════════════════════════════════════════════════════
const FlickerWithUseEffect = () => {
  const [number, setNumber] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);

  // ❌ useEffect - виконується ПІСЛЯ paint
  // Це призводить до мерехтіння, бо користувач спочатку бачить "0", потім "100"
  useEffect(() => {
    console.log('⏰ useEffect: виконується ПІСЛЯ paint');
    if (number === 0) {
      // Штучна затримка для демонстрації
      const start = performance.now();
      while (performance.now() - start < 100) {
        // Блокуємо на 100мс
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayNumber(100); // Змінюємо на 100 (навмисно для демонстрації)
    }
  }, [number]);

  return (
    <div style={styles.demoBox}>
      <h3>❌ З useEffect (мерехтіння)</h3>
      <p style={styles.explanation}>
        Натисніть кнопку і побачите як число спочатку показує 0, потім стрибає
        на 100
      </p>
      <div style={styles.numberDisplay}>{displayNumber}</div>
      <button
        onClick={() => {
          setDisplayNumber(0);
          setNumber(Math.random());
        }}
        style={styles.button}
      >
        Запустити (побачите flicker)
      </button>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// Компонент 2: Без мерехтіння з useLayoutEffect
// ════════════════════════════════════════════════════════════════════
const NoFlickerWithUseLayoutEffect = () => {
  const [number, setNumber] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);

  // ✅ useLayoutEffect - виконується ПЕРЕД paint
  // Браузер чекає поки виконається цей код, потім малює ОДРАЗУ "100"
  useLayoutEffect(() => {
    console.log('⚡ useLayoutEffect: виконується ПЕРЕД paint');
    if (number === 0) {
      // Штучна затримка для демонстрації
      const start = performance.now();
      while (performance.now() - start < 100) {
        // Блокуємо на 100мс
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayNumber(100); // Змінюємо на 100 (навмисно для демонстрації)
    }
  }, [number]);

  return (
    <div style={styles.demoBox}>
      <h3>✅ З useLayoutEffect (без мерехтіння)</h3>
      <p style={styles.explanation}>
        Натисніть кнопку - число одразу покаже 100, без проміжного стану 0
      </p>
      <div style={styles.numberDisplay}>{displayNumber}</div>
      <button
        onClick={() => {
          setDisplayNumber(0);
          setNumber(Math.random());
        }}
        style={styles.button}
      >
        Запустити (без flicker)
      </button>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// Компонент 3: Вимірювання DOM елементів
// ════════════════════════════════════════════════════════════════════
const MeasureElement = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const boxRef = useRef(null);

  // ✅ useLayoutEffect - вимірюємо ПЕРЕД paint
  // Гарантуємо, що розміри коректні до того, як користувач побачить елемент
  useLayoutEffect(() => {
    console.log('📏 useLayoutEffect: Вимірюємо елемент');
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setHeight(rect.height);
      setWidth(rect.width);
      console.log(`Розміри: ${rect.width}x${rect.height}`);
    }
  }, [items]); // При зміні items - перевимірюємо

  return (
    <div style={styles.demoBox}>
      <h3>📏 Вимірювання DOM елементів</h3>
      <p style={styles.explanation}>
        useLayoutEffect гарантує коректні розміри перед відображенням
      </p>

      <div
        ref={boxRef}
        style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '10px',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: 'white',
              borderRadius: '4px',
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div style={styles.measurements}>
        <strong>Виміряні розміри:</strong>
        <br />
        Ширина: {width.toFixed(2)}px
        <br />
        Висота: {height.toFixed(2)}px
      </div>

      <button
        onClick={() => setItems([...items, `Item ${items.length + 1}`])}
        style={styles.button}
      >
        Додати елемент
      </button>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// Компонент 4: Позиціонування тултіпу
// ════════════════════════════════════════════════════════════════════
const TooltipDemo = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  // ✅ useLayoutEffect - розраховуємо позицію ПЕРЕД показом
  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      console.log('🎯 useLayoutEffect: Розраховуємо позицію тултіпу');

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Розраховуємо позицію над кнопкою
      setTooltipPosition({
        top: buttonRect.top - tooltipRect.height - 10,
        left: buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2,
      });
    }
  }, [showTooltip]);

  return (
    <div style={styles.demoBox}>
      <h3>🎯 Позиціонування тултіпу</h3>
      <p style={styles.explanation}>
        Тултіп з&apos;являється в правильній позиції без стрибків
      </p>

      <button
        ref={buttonRef}
        onClick={() => setShowTooltip(!showTooltip)}
        style={{ ...styles.button, marginTop: '100px' }}
      >
        {showTooltip ? 'Сховати тултіп' : 'Показати тултіп'}
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            backgroundColor: '#333',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000,
            whiteSpace: 'nowrap',
          }}
        >
          Я тултіп! 🎈
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// Компонент 5: Порівняльна таблиця
// ════════════════════════════════════════════════════════════════════
const ComparisonTable = () => {
  return (
    <div style={styles.tableContainer}>
      <h3>📊 Порівняння useEffect vs useLayoutEffect</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Аспект</th>
            <th style={styles.th}>useEffect</th>
            <th style={styles.th}>useLayoutEffect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>
              <strong>Коли виконується</strong>
            </td>
            <td style={styles.td}>Після paint (асинхронно)</td>
            <td style={styles.td}>Перед paint (синхронно)</td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Блокує рендеринг</strong>
            </td>
            <td style={styles.td}>❌ Ні</td>
            <td style={styles.td}>✅ Так</td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Візуальні оновлення</strong>
            </td>
            <td style={styles.td}>Може мерехтіти</td>
            <td style={styles.td}>Без мерехтіння</td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Продуктивність</strong>
            </td>
            <td style={styles.td}>✅ Краще (не блокує)</td>
            <td style={styles.td}>⚠️ Може сповільнити</td>
          </tr>
          <tr>
            <td style={styles.td}>
              <strong>Використання</strong>
            </td>
            <td style={styles.td}>90% випадків</td>
            <td style={styles.td}>10% випадків</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════
// Головний компонент
// ════════════════════════════════════════════════════════════════════
const UseLayoutEffectDemo = ({ title }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title || '⚡ useLayoutEffect Demo'}</h2>

      <div style={styles.infoBox}>
        <h4>💡 Коли використовувати useLayoutEffect:</h4>
        <ul style={styles.list}>
          <li>📏 Вимірювання DOM елементів (getBoundingClientRect)</li>
          <li>🎯 Позиціонування елементів (тултіпи, модальні вікна)</li>
          <li>🎨 Синхронні DOM маніпуляції перед paint</li>
          <li>🚫 Запобігання візуальному мерехтінню</li>
          <li>📊 Читання layout інформації перед відображенням</li>
        </ul>
        <p style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '10px' }}>
          ⚠️ Використовуйте useLayoutEffect ТІЛЬКИ коли useEffect викликає
          візуальні проблеми!
        </p>
      </div>

      <ComparisonTable />

      <div style={styles.demosGrid}>
        <FlickerWithUseEffect />
        <NoFlickerWithUseLayoutEffect />
        <MeasureElement />
        <TooltipDemo />
      </div>

      <div style={styles.timeline}>
        <h3>⏱️ Timeline виконання:</h3>
        <div style={styles.timelineContent}>
          <div style={styles.timelineItem}>
            <strong>useEffect:</strong>
            <br />
            1️⃣ Render → 2️⃣ Paint (браузер показує) → 3️⃣ useEffect виконується
          </div>
          <div style={styles.timelineItem}>
            <strong>useLayoutEffect:</strong>
            <br />
            1️⃣ Render → 2️⃣ useLayoutEffect виконується → 3️⃣ Paint (браузер
            показує)
          </div>
        </div>
      </div>
    </div>
  );
};

UseLayoutEffectDemo.propTypes = {
  title: PropTypes.string,
};

// ════════════════════════════════════════════════════════════════════
// Стилі
// ════════════════════════════════════════════════════════════════════
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#1976d2',
    marginBottom: '20px',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    borderLeft: '4px solid #1976d2',
  },
  list: {
    lineHeight: '1.8',
    marginTop: '10px',
  },
  demosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  demoBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  explanation: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
  },
  numberDisplay: {
    fontSize: '48px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: '15px',
    color: '#1976d2',
  },
  measurements: {
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    marginBottom: '10px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  tableContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  th: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  timeline: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  timelineContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '15px',
  },
  timelineItem: {
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    borderLeft: '4px solid #1976d2',
  },
};

export default UseLayoutEffectDemo;
