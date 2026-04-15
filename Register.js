import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, API_BASE } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', password:'' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // ── Chiama PHP register ───────────────────────────────────
      const res  = await fetch(`${API_BASE}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        login(data.user);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Registrazione fallita');
      }
    } catch (err) {
      setError('Impossibile raggiungere il server. Assicurati che XAMPP sia attivo e i file PHP siano in htdocs/jablab/backend/php/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden' }}>
      <img src="/images/bg.png" alt="bg" style={{ position:'fixed', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'rgba(220,232,255,0.45)' }} />

      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100, height:64,
        background:'rgba(190,215,255,0.88)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
        borderBottom:'2px solid rgba(26,60,255,0.20)',
        display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px',
        boxShadow:'0 2px 16px rgba(26,60,255,0.08)'
      }}>
        <Link to="/" style={{ fontFamily:'var(--font-display)', fontSize:'2.1rem', letterSpacing:'2px', color:'var(--primary)', textDecoration:'none' }}>
          Jab Lab
        </Link>
        <div style={{ display:'flex', gap:12 }}>
          <Link to="/login"    className="btn btn-primary" style={{ padding:'9px 24px', fontSize:'0.95rem' }}>Accedi</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding:'9px 24px', fontSize:'0.95rem' }}>Registrati</Link>
        </div>
      </nav>

      <div style={{ position:'relative', zIndex:2, minHeight:'100vh', paddingTop:64, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'100%', maxWidth:420, padding:'0 24px', animation:'fadeUp 0.5s ease both' }}>
          <div className="glass-card" style={{ padding:'40px 36px', background:'rgba(255,255,255,0.78)', backdropFilter:'blur(20px)' }}>
            <h2 style={{ fontFamily:'var(--font-condensed)', fontSize:'1.55rem', fontWeight:700, color:'var(--primary)', textAlign:'center', marginBottom:28 }}>
              Inserisci i tuoi dati per registrarti
            </h2>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:13 }}>
              <input className="form-input" type="text"     name="first_name" placeholder="Nome"              value={form.first_name} onChange={handleChange} required />
              <input className="form-input" type="text"     name="last_name"  placeholder="Cognome"           value={form.last_name}  onChange={handleChange} required />
              <input className="form-input" type="email"    name="email"      placeholder="Inserisci email"   value={form.email}      onChange={handleChange} required />
              <input className="form-input" type="password" name="password"   placeholder="Inserisci password" value={form.password}   onChange={handleChange} required minLength={6} />
              {error && <div className="error-msg">{error}</div>}
              <button type="submit" className="btn btn-primary" disabled={loading}
                style={{ marginTop:8, justifyContent:'center', fontSize:'1rem', padding:'13px' }}>
                {loading ? 'Registrazione...' : 'Registrati'}
              </button>
            </form>
            <p style={{ textAlign:'center', marginTop:18, fontFamily:'var(--font-condensed)', fontSize:'0.9rem', color:'var(--text-muted)' }}>
              Hai già un account?{' '}
              <Link to="/login" style={{ color:'var(--primary)', fontWeight:600 }}>Accedi</Link>
            </p>
          </div>
        </div>
      </div>

      <div style={{ position:'fixed', bottom:22, right:28, zIndex:10, display:'flex', gap:10 }}>
        <span style={{ fontSize:'2rem', cursor:'pointer' }}>🇮🇹</span>
        <span style={{ fontSize:'2rem', cursor:'pointer' }}>🇬🇧</span>
      </div>
    </div>
  );
}
