import { useState } from 'react';

function useValueState(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(newValue) {
    setValue(newValue);
  }

  return {
    value,
    handleChange,
  }
}

export default useValueState;
