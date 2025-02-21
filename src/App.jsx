import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "../src/styles/variable.css";
import "../src/styles/global.css";
import AppRoutes from "./routes";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer";
import { UserProvider } from "../src/contexts/UserContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer style={{ backgroundColor: "red" }} />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
