import { Provider } from 'react-redux';
import store from './redux/store/store';
import AppRoutes from './config/routes';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  // Create a client
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
