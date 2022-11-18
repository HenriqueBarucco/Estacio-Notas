import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    font-family: Arial, Helvetica, sans-serif
  }
`;

export default GlobalStyle;