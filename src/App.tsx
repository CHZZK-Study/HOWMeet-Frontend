import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import setupLocatorUI from '@locator/runtime';
import GlobalStyle from './styles/GlobalStyle';
import Router from './routes';
import theme from './styles/theme';
import { toasterStyle } from './styles/ToasterStyles';
import { getUserProfile } from './apis/user.api';
import { getMemberType } from './utils/auth';
import useUserStore from './store/userStore';
import { getTokenFromStorage } from './utils/token';

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI();
}
const queryClient = new QueryClient();

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const getProfile = async () => {
    const { id, nickname } = await getUserProfile();
    return {
      id,
      username: nickname,
      isMember: getMemberType().isMember,
    };
  };

  useEffect(() => {
    const { accessToken } = getTokenFromStorage();

    if (accessToken) {
      const fetchProfile = async () => {
        const profile = await getProfile();
        setUser(profile);
      };

      fetchProfile();
    }
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: toasterStyle,
          }}
        />
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
