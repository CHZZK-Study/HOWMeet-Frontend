import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import setupLocatorUI from '@locator/runtime';
import GlobalStyle from './styles/GlobalStyle';
import Router from './routes';
import theme from './styles/theme';
import { toasterStyle } from './styles/ToasterStyles';

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI();
}
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: toasterStyle,
        }}
      />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
