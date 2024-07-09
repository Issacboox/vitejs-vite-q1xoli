import { useState, useEffect } from 'react';

type LocalStorageValue<T> = T | null;

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [LocalStorageValue<T>, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const initialStoredValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<LocalStorageValue<T>>(initialStoredValue);

  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, updateValue];
}

export default useLocalStorage;
