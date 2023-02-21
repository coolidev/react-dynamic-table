import { createTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import Comparison from './views';

function App() {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Comparison />
      </div>
    </ThemeProvider>
  );
}

export default App;
