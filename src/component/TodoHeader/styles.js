import styled from "styled-components";

export const TodoHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ededed;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;

export const ToggleAllLabel = styled.label`
  visibility: ${(props) => (props.todosNumber > 0 ? "visible" : "hidden")};
  width: 30px;
  height: 40px;
  text-align: center;
  transform: rotate(90deg);
  font-size: 22px;
  color: #e6e6e6;
  border: none;
`;
export const NewTodoInput = styled.input.attrs(() => ({
  placeholder: "What needs to be done?",
}))`
  flex-grow: 1;
  cursor: text;
  font-family: inherit;
  font-weight: 300;
  font-size: 24px;
  text-align: left;
  line-height: 1.4em;
  padding: 16px 16px 16px 26px;
  background: rgba(0, 0, 0, 0.003);
  border: none;
  outline: none;
  &::placeholder {
    color: #e6e6e6;
    font-style: italic;
  }
`;

export const ToggleAllCheckbox = styled.input.attrs((props) => ({
  type: "checkbox",
  checked: props.activeTodosNumber === 0 ? true : false,
}))`
  display: none;
  &:checked + label {
    color: #737373;
  }
`;
