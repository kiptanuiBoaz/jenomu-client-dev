import { Provider as ReduxProvider, useSelector } from 'react-redux';
import AppRoutes from './config/routes'; import { getUserInfoState } from './redux/slices/authSlice';
import Navbar from './components/Navbar';

const App = () => {
  // Create a client
  const { isAuthenticated } = useSelector(getUserInfoState);

  return (<>
    {/* <Navbar isAuthenticated={isAuthenticated} /> */}
    <AppRoutes />
  </>



  );
};

export default App;
