import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import GlobalStyle from './styles/GlobalStyle';
import Router from './routes';
import theme from './styles/theme';
import { toasterStyle } from './styles/ToasterStyles';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        closeButton
        richColors
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
