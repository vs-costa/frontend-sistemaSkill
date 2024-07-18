import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import Page404 from '../pages/Page404';
import ProtectedRoute from '../security/ProtectedRoute';

function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
