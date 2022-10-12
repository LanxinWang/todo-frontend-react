export const ENTER_KEY = "Enter";
export const TITLE = "Todos";
export const TODO_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
};
export const TODO_MENU = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export type Todo ={
  id: string,
  status: string,
  name: string,
}

export default TODO_STATUS;
