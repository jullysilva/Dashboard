import "./App.css";
import { Dashboard } from "./Pages/Dasboard";

const App = () => {
  return (
    <div className="App">
      <Dashboard title="Dashboard" widgets={null} />
    </div>
  );
};

export default App;
