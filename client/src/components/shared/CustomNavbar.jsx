import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import usePostLogout from '../../hooks/auth/usePostLogout';
import { Link } from 'react-router-dom';
import { Button, DarkThemeToggle, Navbar } from 'flowbite-react';

const CustomNavbar = () => {
  const { user: loggedInUser } = useAuth();
  const { postLogout } = usePostLogout();

  const handleLogout = async () => {
    postLogout();
  };

  return (
    <Navbar fluid>
      <Navbar.Brand as={NavLink} to="/">
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Erasmus Portal Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Erasmus Portal
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {loggedInUser ? (
          <>
            <Button className="ml-4" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button as={Link} to="/auth/login" className="ml-4">
            Login
          </Button>
        )}
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      {loggedInUser && (
        <Navbar.Collapse>
          <NavLink to="/" end>
            {({ isActive }) => (
              <Navbar.Link as="div" active={isActive}>
                Home
              </Navbar.Link>
            )}
          </NavLink>
          {['admin', 'coordinator'].includes(loggedInUser?.role) && (
            <NavLink to="/users">
              {({ isActive }) => (
                <Navbar.Link as="div" active={isActive}>
                  Users
                </Navbar.Link>
              )}
            </NavLink>
          )}
          {loggedInUser?.role === 'admin' && (
            <NavLink to="/subjectAreas">
              {({ isActive }) => (
                <Navbar.Link as="div" active={isActive}>
                  Subject areas
                </Navbar.Link>
              )}
            </NavLink>
          )}
          <NavLink to="/studyProgrammes">
            {({ isActive }) => (
              <Navbar.Link as="div" active={isActive}>
                Study programmes
              </Navbar.Link>
            )}
          </NavLink>
          <NavLink to="/departments">
            {({ isActive }) => (
              <Navbar.Link as="div" active={isActive}>
                Departments
              </Navbar.Link>
            )}
          </NavLink>
          <NavLink to="/institutions">
            {({ isActive }) => (
              <Navbar.Link as="div" active={isActive}>
                Institutions
              </Navbar.Link>
            )}
          </NavLink>
          <NavLink to="/mobilities">
            {({ isActive }) => (
              <Navbar.Link as="div" active={isActive}>
                Mobilities
              </Navbar.Link>
            )}
          </NavLink>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
