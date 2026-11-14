import "./App.css";
import ThriftHappensApp from "./Components/ThriftHappensApp";
import { products } from "./data/data";

function App() {
  return <ThriftHappensApp data={products} />;
}

export default App;
