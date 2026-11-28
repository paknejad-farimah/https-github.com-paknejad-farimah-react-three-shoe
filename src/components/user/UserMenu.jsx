import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addPendingCartItemIfAny, getDemoUser, setDemoUser } from '../../cartStorage';
import './usermenu.css';

const UserMenu = () => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getDemoUser()));
  const [formData, setFormData] = useState(() => {
    const savedUser = getDemoUser();
    return {
      username: savedUser?.username || '',
      email: savedUser?.email || '',
      password: '',
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const finishDemoAuth = (username, email) => {
    // Demo-only authentication. This does not verify credentials on a server.
    setDemoUser({ username, email, loggedInAt: new Date().toISOString() });
    setFormData((previous) => ({ ...previous, username }));
    setIsLoggedIn(true);
    addPendingCartItemIfAny();
    const returnTo = searchParams.get('returnTo');
    navigate(returnTo && returnTo.startsWith('/') ? returnTo : '/', { replace: true });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    finishDemoAuth(formData.email.split('@')[0] || 'کاربر تست', formData.email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    finishDemoAuth(formData.username || formData.email.split('@')[0] || 'کاربر تست', formData.email);
  };

  const handleLogout = () => {
    // منطق خروج کاربر
    setIsLoggedIn(false);
    localStorage.removeItem('demoUser');
    window.dispatchEvent(new Event('shoe-user-updated'));
    setFormData({ username: '', email: '', password: '' });
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="user-profile">
        <span className="username">{formData.username}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Exit
        </button>
        <div className="user-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    );
  }

  return (
    
    
    <div className="auth-form-container">
      <p className="demo-auth-note"> login</p>
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          login
        </button>
        <button 
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
           Registration
        </button>
      </div>

      {activeTab === 'login' ? (
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
          login
          </button>
          <p className="switch-auth" onClick={() => setActiveTab('register')}>
          You do not have an account? <span>Sign up  </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">username :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
          Registration
          </button>
          <p className="switch-auth" onClick={() => setActiveTab('login')}>
          Have you already registered?<span>log in </span>
          </p>
        </form>
      )}
    </div>
    
  );
};

export default UserMenu;