import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Todo } from "../constants/constants";

function getLocalStorage(key:string, defaultValue:Todo[]) {
  const saved:string = localStorage.getItem(key)||'';
  const initial:Todo[] = JSON.parse(saved);
  return initial || defaultValue;
}

type SetValue<T> = Dispatch<SetStateAction<T>>
export const useLocalStorage = (key:string, defaultValue:Todo[]):[Todo[], SetValue<Todo[]>] => {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
