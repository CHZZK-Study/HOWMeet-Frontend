import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Router from './routes';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
