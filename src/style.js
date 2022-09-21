import styled from "styled-components";
export const H1 = styled.h1`
  width: 100%;
  margin: 80px 0 50px 0;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
`;
export const Div = styled.div`
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
export const Footer = styled.footer`
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  color: #bfbfbf;
  font-size: 10px;
  margin-top: 65px;
  p {
    line-height: 1;
  }
  a {
    text-decoration: none;
    font-weight: 400;
    color: inherit;
    &:hover,
    &:active {
      -webkit-text-decoration-line: underline;
      text-decoration-line: underline;
    }
  }
`;
