import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router"
import AppFooter from "./components/Footer"
import { AuthProvider } from "./api/AuthContext"

function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <AppFooter />
      </AuthProvider>
    </>
  )
}

export default App
