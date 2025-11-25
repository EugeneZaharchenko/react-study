import React from 'react';

const RenderComp = () => {
  const falseRenderVal = false;
  const trueRenderVal = true;

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', margin: '20px' }}>
      <h2>Приклади умовного рендерингу</h2>

      {/* Приклад 1: Логічний оператор && */}
      <div style={{ marginBottom: '15px' }}>
        <h3>1. Логічний оператор &&</h3>
        {trueRenderVal && (
          <p style={{ color: 'green' }}>
            ✓ trueRenderVal = true - цей текст відображається
          </p>
        )}
        {falseRenderVal && (
          <p style={{ color: 'red' }}>
            ✗ falseRenderVal = false - цей текст НЕ відображається
          </p>
        )}
      </div>

      {/* Приклад 2: Тернарний оператор */}
      <div style={{ marginBottom: '15px' }}>
        <h3>2. Тернарний оператор ? :</h3>
        {trueRenderVal ? (
          <p style={{ color: 'green' }}>
            ✓ trueRenderVal = true - показується цей варіант
          </p>
        ) : (
          <p style={{ color: 'orange' }}>Альтернативний варіант</p>
        )}

        {falseRenderVal ? (
          <p style={{ color: 'red' }}>Цей текст не показується</p>
        ) : (
          <p style={{ color: 'blue' }}>
            ✓ falseRenderVal = false - показується альтернатива
          </p>
        )}
      </div>

      {/* Приклад 3: Умова в змінній */}
      <div style={{ marginBottom: '15px' }}>
        <h3>3. Збереження JSX в змінну</h3>
        {(() => {
          let content;
          if (trueRenderVal) {
            content = (
              <p style={{ color: 'green' }}>✓ Рендер через змінну (true)</p>
            );
          } else {
            content = <p style={{ color: 'red' }}>Альтернативний рендер</p>;
          }
          return content;
        })()}
      </div>

      {/* Приклад 4: Комбінована умова */}
      <div style={{ marginBottom: '15px' }}>
        <h3>4. Комбінована умова</h3>
        {trueRenderVal && !falseRenderVal && (
          <p style={{ color: 'purple' }}>
            ✓ Обидві умови виконані: true && !false
          </p>
        )}
      </div>

      {/* Приклад 5: Рендер з null */}
      <div style={{ marginBottom: '15px' }}>
        <h3>5. Повернення null (нічого не рендериться)</h3>
        {falseRenderVal ? <p>Цей блок не показується</p> : null}
        <p style={{ color: 'gray', fontStyle: 'italic' }}>
          Коли falseRenderVal = false, рендериться null
        </p>
      </div>
    </div>
  );
};

export default RenderComp;
