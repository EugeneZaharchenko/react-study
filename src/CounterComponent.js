import { useState } from 'react';

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
    setCount(prevState => prevState + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Incr</button>
      <button onClick={decrement}>Decr</button>
    </div>
  );
};
export default CounterComponent;
