import React, { useEffect, useState } from 'react';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getCartItems, getDemoUser } from '../../cartStorage';
import './navbar.css';

const getCartCount = () =>
  getCartItems().reduce((total, item) => total + (Number(item.quantity) || 1), 0);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);
  const [currentUser, setCurrentUser] = useState(() => getDemoUser());

  useEffect(() => {
    const refreshCart = () => setCartCount(getCartCount());
    const refreshUser = () => setCurrentUser(getDemoUser());

    window.addEventListener('shoe-cart-updated', refreshCart);
    window.addEventListener('storage', refreshCart);
    window.addEventListener('shoe-user-updated', refreshUser);
    window.addEventListener('storage', refreshUser);

    return () => {
      window.removeEventListener('shoe-cart-updated', refreshCart);
      window.removeEventListener('storage', refreshCart);
      window.removeEventListener('shoe-user-updated', refreshUser);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">shoe store</Link>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item"><Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li className="navbar-item"><Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>about</Link></li>
        </ul>

        <div className="navbar-icons">
          <Link to="/login" className="navbar-link navbar-icon user-nav-link" aria-label="حساب کاربری">
            <FaUser />
            {currentUser?.username && <span className="navbar-username">{currentUser.username}</span>}
          </Link>

          <Link to="/cart" className="navbar-link navbar-icon cart-icon" aria-label="سبد خرید">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        <button className="navbar-toggle" type="button" onClick={toggleMenu} aria-label="باز کردن منو">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
