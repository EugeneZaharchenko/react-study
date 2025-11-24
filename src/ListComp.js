import React, { useState } from 'react';

const ListComp = () => {
  const newElement = 'new element';
  const [item, setItem] = useState([newElement]);
  const [input, setInput] = useState([]);

  const onClickHandler = input => {
    const updatedElement = [...item, input];
    setItem(updatedElement);
    setInput('');
  };

  const onChangeHandler = e => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <React.Fragment>
      <input onChange={onChangeHandler} value={input} />

      <ul>
        {item.map((element, index) => (
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
