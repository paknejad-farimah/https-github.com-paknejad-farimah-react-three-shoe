import './App.css';
import Cart from './components/cart/Cart';
import UserMenu from './components/user/UserMenu';
import AboutUs from './pages/aboutus/AboutUs';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<UserMenu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
