import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
