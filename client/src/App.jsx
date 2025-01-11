import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';
import CustomNavbar from './components/shared/CustomNavbar';
import CustomFooter from './components/shared/CustomFooter';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import NotFound from './components/shared/NotFound';
import Users from './components/users/Users';

function App() {
  // const { user } = useAuth();
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:userId/:token"
          element={<ResetPassword />}
        />

        {/* User page */}
        <Route path="/users" element={<Users />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CustomFooter />
    </BrowserRouter>
  );
}

export default App;
