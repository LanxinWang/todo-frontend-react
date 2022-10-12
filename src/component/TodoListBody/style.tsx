import styled from "styled-components";
import TODO_STATUS from "../../constants/constants";

export const TodoListBodyContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  .todo-item {
    border-bottom: 1px solid #ededed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const ToggleLabel = styled.label`
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
  width: 40px;
  height: 40px;
`;

interface ToggleInputProps {
  todoStatus: string
}
export const ToggleInput = styled.input.attrs<ToggleInputProps>((props) => ({
  type: "checkbox",
  checked: props.todoStatus === TODO_STATUS.COMPLETED ? true : false,
}))<ToggleInputProps>`
  display: none;
  &:checked + label {
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E);
  }
`;

export const P = styled.p`
  word-break: break-all;
  font-size: 24px;
  line-height: 1.2em;
  flex-grow: 1;
  padding: 15px;
  margin: 0;
  color: ${(props) =>
    props.className === TODO_STATUS.COMPLETED ? "#d9d9d9" : ""};
  text-decoration: ${(props) =>
    props.className === TODO_STATUS.COMPLETED ? "line-through" : "none"};
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  margin: auto 10px auto 0;
  color: #cc9a9a;
  background: none;
  border: none;
  opacity: 0;
  font-size: 30px;
  font-weight: 300;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  &:hover,
  &:active {
    color: #af5b5e;
  }

  li:hover & {
    opacity: 1;
  }
`;
