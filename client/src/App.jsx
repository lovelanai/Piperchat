import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ContextUserProvider from "./context/ContextUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ContextUserProvider>
          <Layout />
        </ContextUserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
