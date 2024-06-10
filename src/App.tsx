import { Provider } from 'react-redux';
import store from './redux/store/store';
import AppRoutes from './config/routes';

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
