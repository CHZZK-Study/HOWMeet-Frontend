import { ThemeProvider } from 'styled-components';
import { Toaster } from 'sonner';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import Router from './routes';
import theme from './styles/theme';

// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" closeButton richColors />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
