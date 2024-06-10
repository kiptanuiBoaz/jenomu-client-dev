import { Provider } from 'react-redux';
import store from './redux/store/store';
import AppRoutes from './config/routes';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>

    </Provider>
  );
};

export default App;
