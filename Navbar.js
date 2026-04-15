import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to={user ? '/dashboard' : '/'} className="navbar-logo">
        Jab Lab <span />
      </Link>

      <div className="navbar-actions">
        <div className="lang-flags">
          <span className="lang-flag" title="Italiano">🇮🇹</span>
          <span className="lang-flag" title="English">🇬🇧</span>
        </div>

        {user ? (
          <>
            <Link to="/favorites" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
              ⭐ Preferiti
            </Link>
            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
              Esci
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
              Accedi
            </Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
              Registrati
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
