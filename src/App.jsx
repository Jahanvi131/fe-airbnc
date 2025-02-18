import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "../src/styles/variable.css";
import AppRoutes from "./routes";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer";
import { UserProvider } from "../src/contexts/UserContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <UserProvider>
          <Header />
        </UserProvider>
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
