import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import 'antd/dist/antd.less';
  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

`
  ;

export default GlobalStyle;
