import './App.css';
import DynamicTable from './components/DynamicTable';
import { ReactTable } from './views';

function App() {
  return (
    <div className="App">
      <DynamicTable />
      <ReactTable />
    </div>
  );
}

export default App;
