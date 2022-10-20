import { Todo } from "../types";

export const getLocalStorage = (key:string, defaultValue:Todo[]) => {
  if (localStorage.getItem(key) === null) {
    return defaultValue;
  }
  const saved:string = localStorage.getItem(key)!;
  const initial:Todo[] = JSON.parse(saved);
  return initial ;
}
export const setLocalStorage = (key:string, value:Todo[]) => {
  localStorage.setItem(key, JSON.stringify(value));
}