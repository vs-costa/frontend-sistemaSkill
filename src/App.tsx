import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'antd';
import AppRouter from "./router"
import AppFooter from "./components/Footer"
import { AuthProvider } from "./api/AuthContext"
import "./global.css"
import AppHeader from "./components/Header";

function App() {
  return (
    <>
      <AuthProvider>
        <AppHeader/>
        <BrowserRouter>
          <ConfigProvider>
            <AppRouter />
          </ConfigProvider>
        </BrowserRouter>
        <AppFooter />
      </AuthProvider>
    </>
  )
}

export default App
