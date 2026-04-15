import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FighterCard from '../components/FighterCard';
import { useBoxingAPI } from '../hooks/useBoxingAPI';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getFightersByIds, loading } = useBoxingAPI();
  const { favorites } = useFavorites();
  const [fighters, setFighters] = useState([]);

  useEffect(() => { if (!user) { navigate('/login'); return; } }, [user, navigate]);
  useEffect(() => {
    if (favorites.length > 0) getFightersByIds(favorites).then(setFighters);
    else setFighters([]);
  }, [favorites, getFightersByIds]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden' }}>
      <img src="/images/bg.png" alt="bg" style={{ position:'fixed', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'rgba(220,232,255,0.55)' }} />

      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100, height:64,
        background:'rgba(190,215,255,0.88)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
        borderBottom:'2px solid rgba(26,60,255,0.20)',
        display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px',
        boxShadow:'0 2px 16px rgba(26,60,255,0.08)'
      }}>
        <Link to="/dashboard" style={{ fontFamily:'var(--font-display)', fontSize:'2.1rem', letterSpacing:'2px', color:'var(--primary)', textDecoration:'none' }}>
          Jab Lab
        </Link>
        <button onClick={handleLogout} className="btn btn-danger" style={{ padding:'9px 22px', fontSize:'0.95rem' }}>Esci</button>
      </nav>

      <div style={{ position:'relative', zIndex:2, padding:'90px 32px 60px' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.6rem)', letterSpacing:'3px', color:'var(--primary)' }}>
            Giocatori preferiti
          </h1>
        </div>

        {loading ? <div className="spinner" /> :
          fighters.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 24px', background:'rgba(255,255,255,0.65)', borderRadius:16, maxWidth:400, margin:'0 auto', backdropFilter:'blur(10px)' }}>
              <div style={{ fontSize:'3.5rem', marginBottom:12 }}>⭐</div>
              <div style={{ fontFamily:'var(--font-condensed)', fontSize:'1.1rem', color:'var(--text-muted)', marginBottom:20 }}>
                Nessun pugile nei preferiti ancora.
              </div>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ fontSize:'1rem', padding:'12px 32px' }}>
                Esplora pugili
              </button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(190px, 1fr))', gap:18 }}>
              {fighters.map((fighter, i) => (
                <div key={fighter.id} style={{ animationDelay:`${i*0.05}s` }}>
                  <FighterCard fighter={fighter} />
                </div>
              ))}
            </div>
          )
        }
      </div>

      <div style={{ position:'fixed', bottom:68, right:28, zIndex:10, background:'rgba(255,255,255,0.80)', borderRadius:12, padding:'8px 14px', border:'2px solid rgba(0,0,0,0.12)', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
        <span style={{ fontSize:'1.4rem' }}>🥊</span>
        <span style={{ fontFamily:'var(--font-display)', fontSize:'0.8rem', letterSpacing:'2px', color:'#222', lineHeight:1 }}>BOXING</span>
      </div>
      <div style={{ position:'fixed', bottom:22, right:28, zIndex:10, display:'flex', gap:10 }}>
        <span style={{ fontSize:'2rem', cursor:'pointer' }}>🇮🇹</span>
        <span style={{ fontSize:'2rem', cursor:'pointer' }}>🇬🇧</span>
      </div>
    </div>
  );
}
