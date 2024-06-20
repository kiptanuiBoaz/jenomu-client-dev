import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store/store';
import './index.css';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </ReduxProvider>

)
