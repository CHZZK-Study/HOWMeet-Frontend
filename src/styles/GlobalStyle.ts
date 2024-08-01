/* eslint-disable @typescript-eslint/naming-convention */
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'public/assets/font/font.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    scrollbar-width: none;
  }

  a {
    text-decoration: none;
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  button {
    box-sizing: content-box;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  html {
    overscroll-behavior-y: none;
  }

  body {
    width: 100vw;
    min-height: 100dvh;
    height: 100%;
    overflow: auto;
    background-color: #F4F5F5;
    font-family: 'Pretendard';

    @media screen and (min-width: 430px) {
      background-color: black;
    }
  }

  #root {
    width: 100%;
    min-height: 100dvh;
    height: fit-content;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0px auto;
    background-color: #F4F5F5;
    
    /* PC view setting */
    @media screen and (min-width: 430px) {
      width: 450px;
    }
  }
`;

export default GlobalStyle;
