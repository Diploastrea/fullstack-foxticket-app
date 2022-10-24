import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import UnLoggedHeader from './components/UnLoggedHeader';
import LoggedHeader from './components/LoggedHeader';
import UnLoggedFooter from './components/UnLoggedFooter';
import LoggedFooter from './components/LoggedFooter';
import Cart from './components/Cart';
import Landing from './pages/Landing';
import AdminNews from './pages/AdminNews';
import Login from './pages/Login';
import Register from './pages/Registration';
import Profile from './pages/Profile';
import Tickets from './pages/Tickets';
import Shopping from './pages/Shopping';
import NotImplemented from './pages/NotImplemented';
import './assets/css/Footer.css';
import './assets/css/index.css';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? (
        <>
          <LoggedHeader />
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/shop" element={<Shopping />} />
            <Route exact path="/admin/news" element={<AdminNews />} />
            <Route path="/*" element={<NotImplemented />} />
          </Routes>
          <Cart />
          <LoggedFooter />
        </>
      ) : (
        <>
          <UnLoggedHeader />
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotImplemented />} />
          </Routes>
          <UnLoggedFooter />
        </>
      )}
    </div>
  );
}

export default App;
