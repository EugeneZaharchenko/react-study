import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Дочірній компонент ListItem
// Приймає props.children - це спеціальний prop, який містить все, що передається між відкриваючим і закриваючим тегом компонента
const ListItem = ({ children }) => {
  return <li>{children}</li>;
};

// Валідація props для ListItem
// PropTypes.node дозволяє будь-який React-контент: текст, числа, елементи, масиви тощо
ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

const ListComp = () => {
  const newElement = 'new element';
  const [items, setItems] = useState([newElement]);
  const [input, setInput] = useState([]);

  const onClickHandler = input => {
    const updatedElement = [...items, input];
    setItems(updatedElement);
    setInput('');
  };

  const onChangeHandler = e => {
    const value = e.target.value;
    setInput(value);
  };

  const onEnterHandler = e => {
    if (e.key === 'Enter') {
      const updatedElement = [...items, input];
      setItems(updatedElement);
      setInput('');
    }
  };

  return (
    <React.Fragment>
      <input
        onKeyDown={onEnterHandler}
        onChange={onChangeHandler}
        value={input}
      />

      <ul>
        <h2>Пунктів: {items.length}</h2>
        {items.map((element, index) => (
          // Використовуємо компонент ListItem
          // Все, що знаходиться між <ListItem> і </ListItem> стане props.children в компоненті
          <ListItem key={index}>
            {index} {element}
          </ListItem>
        ))}
      </ul>
      <button onClick={() => onClickHandler(input)}>Add new elements</button>
    </React.Fragment>
  );
};

export default ListComp;
