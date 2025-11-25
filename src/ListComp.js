import React, { useState } from 'react';

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
          <li key={index}>
            {index} {element}
          </li>
        ))}
      </ul>
      <button onClick={() => onClickHandler(input)}>Add new elements</button>
    </React.Fragment>
  );
};

export default ListComp;
