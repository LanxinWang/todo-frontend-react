import { useState, useEffect } from "react";
import { Todo } from "../constants/constants";

function getLocalStorage(key:string, defaultValue:Todo[]) {
  const saved:string = localStorage.getItem(key)||'';
  const initial:Todo[] = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key:string, defaultValue:Todo[]) => {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
