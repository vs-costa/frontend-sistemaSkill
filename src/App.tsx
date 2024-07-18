import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd';
import AppRouter from "./router";
import AppFooter from "./components/Footer";
import { AuthProvider } from "./api/AuthContext";
import "./global.css";
import AppHeader from "./components/Header";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ConfigProvider>
            <AppHeader />
            <AppRouter />
            <AppFooter />
          </ConfigProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
