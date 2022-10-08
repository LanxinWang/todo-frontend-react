import styled from "styled-components";

export const TodoFooterContainer = styled.div`
  display: ${(props) => (props.todoLength > 0 ? "flex" : "none")};
  color: #777;
  padding: 10px 15px;
  height: 20px;
  border-top: 1px solid #e6e6e6;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
  strong {
    font-weight: 300;
  }
`;

export const FilterMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid 0;
  flex-grow: 1;
  display: inline-flex;
  justify-content: center;

  li {
    cursor: pointer;
  }
`;

export const MenuButton = styled.button`
  color: inherit;
  font-weight: inherit;
  font-family: inherit;
  background: none;
  margin: 3px;
  padding: 3px 7px;
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: ${(props) =>
    props.selectedTodoStatusOption === props.id
      ? "rgba(175, 47, 47, 0.2)"
      : "none"};
`;

export const ClearButton = styled.button`
  background: none;
  font-family: inherit;
  font-weight: inherit;
  border: none;
  color: inherit;
`;
