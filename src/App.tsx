import { createTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import Comparison from './views';
import { AlertContextProvider } from './providers/alert';

function App() {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <AlertContextProvider>
        <Comparison />
      </AlertContextProvider>
    </ThemeProvider>
  );
}

export default App;
