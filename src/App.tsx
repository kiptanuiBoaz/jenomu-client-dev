import AppRoutes from './config/routes';
import ThemeProvider from './theme'

const App = () => {


  return (
  <ThemeProvider>
    <AppRoutes />
  </ThemeProvider>



  );
};

export default App;
