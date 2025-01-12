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
import SubjectAreas from './components/subjectAreas/SubjectAreas';
import StudyProgrammes from './components/studyProgrammes/studyProgrammes';
import Departments from './components/departments/departments';
import Institutitons from './components/institutions/Institutions';
import Applications from './components/applications/Applications';

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

        {/*Subject area page */}
        <Route path="/subjectAreas" element={<SubjectAreas />} />
        {/*Study programme page */}
        <Route path="/studyProgrammes" element={<StudyProgrammes />} />
        {/*Institution page */}
        <Route path="/institutions" element={<Institutitons />} />
        {/*Applications page */}
        <Route path="/applications" element={<Applications />} />
        <Route path="/departments" element={<Departments />} />

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
