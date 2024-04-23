import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Welcome from '../pages/Welcome';
import ProtectedRoute from '../security/ProtectedRoute';
import Page404 from '../pages/Page404';

function AppRouter() {
 return (
    <div>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/*' element={<Page404 />} />
      </Routes>
    </div>
 );
}

export default AppRouter;