import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { useBoxingAPI } from '../hooks/useBoxingAPI';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#1a3cff', '#ff3c1a', '#f59e0b', '#10b981'];

export default function FighterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getFighterById, loading } = useBoxingAPI();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getFighterById(parseInt(id)).then(setFighter);
  }, [id, user, navigate, getFighterById]);

  if (loading || !fighter) return (
    <div style={{ minHeight:'100vh', position:'relative' }}>
      <img src="/images/bg.png" alt="bg" style={{ position:'fixed', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
      <div style={{ position:'fixed', inset:0, zIndex:1, background:'rgba(220,232,255,0.55)' }} />
      <div style={{ position:'relative', zIndex:2, paddingTop:100 }}><div className="spinner" /></div>
    </div>
  );

  const wins = fighter.wins ?? 0;
  const losses = fighter.losses ?? 0;
  const draws = fighter.draws ?? 0;
  const winsKo = fighter.wins_ko ?? Math.floor(wins * 0.6);
  const winsDecision = wins - winsKo;
  const total = wins + losses + draws;
  const initials = fighter.name ? fighter.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '??';
  const winRate = total > 0 ? Math.round((wins/total)*100) : 0;
  const fav = isFavorite(fighter.id);

  const recordData = [
    { name:'Vittorie', value:wins, color:'#1a3cff' },
    { name:'Sconfitte', value:losses, color:'#ff3c1a' },
    { name:'Pareggi', value:draws, color:'#f59e0b' },
  ];
  const pieData = [
    { name:'KO/TKO', value:winsKo },
    { name:'Decisione', value:winsDecision },
  ];

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

      <div style={{ position:'relative', zIndex:2, padding:'82px 32px 60px', maxWidth:1000, margin:'0 auto' }}>

        <button onClick={() => navigate(-1)} className="btn btn-outline"
          style={{ marginBottom:24, fontSize:'0.9rem', padding:'8px 20px', background:'rgba(255,255,255,0.7)' }}>
          ← Indietro
        </button>

        <div className="glass-card" style={{ padding:'28px', marginBottom:24, display:'flex', gap:28, flexWrap:'wrap', alignItems:'center', background:'rgba(255,255,255,0.75)', backdropFilter:'blur(16px)', animation:'fadeUp 0.5s ease both' }}>
          <div style={{ width:100, height:100, borderRadius:'50%', background:'linear-gradient(135deg,var(--primary) 0%,var(--primary-light) 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'2.2rem', color:'#fff', boxShadow:'0 8px 28px rgba(26,60,255,0.3)', flexShrink:0 }}>
            {initials}
          </div>
          <div style={{ flex:1, minWidth:180 }}>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing:'2px', color:'var(--text)', marginBottom:8 }}>{fighter.name}</h1>
            <div style={{ display:'flex', gap:18, flexWrap:'wrap', marginBottom:10 }}>
              {fighter.weight && <span style={{ fontFamily:'var(--font-condensed)', color:'var(--text-muted)', fontSize:'0.95rem', fontWeight:500 }}>⚖️ {fighter.weight}</span>}
              {fighter.birth_date && <span style={{ fontFamily:'var(--font-condensed)', color:'var(--text-muted)', fontSize:'0.95rem', fontWeight:500 }}>📅 {fighter.birth_date}</span>}
              {fighter.nationality && <span style={{ fontFamily:'var(--font-condensed)', color:'var(--text-muted)', fontSize:'0.95rem', fontWeight:500 }}>🌍 {fighter.nationality}</span>}
            </div>
            <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', color:'var(--text-muted)', fontWeight:600, marginBottom:4 }}>WIN RATE: {winRate}%</div>
            <div style={{ height:7, background:'var(--border)', borderRadius:4, overflow:'hidden', width:180 }}>
              <div style={{ height:'100%', width:`${winRate}%`, background:'linear-gradient(90deg,var(--primary),var(--primary-light))', borderRadius:4 }} />
            </div>
          </div>
          <div className="stats-grid" style={{ gridTemplateColumns:'repeat(3,86px)' }}>
            <div className="stat-box" style={{ background:'rgba(255,255,255,0.8)' }}>
              <div className="stat-value" style={{ color:'var(--primary)' }}>{wins}</div>
              <div className="stat-label">Vittorie</div>
            </div>
            <div className="stat-box" style={{ background:'rgba(255,255,255,0.8)' }}>
              <div className="stat-value" style={{ color:'var(--accent)' }}>{losses}</div>
              <div className="stat-label">Sconfitte</div>
            </div>
            <div className="stat-box" style={{ background:'rgba(255,255,255,0.8)' }}>
              <div className="stat-value" style={{ color:'#d97706' }}>{draws}</div>
              <div className="stat-label">Pareggi</div>
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18, marginBottom:20 }}>
          <div className="glass-card" style={{ padding:'22px', background:'rgba(255,255,255,0.75)', backdropFilter:'blur(16px)', animation:'fadeUp 0.5s 0.1s ease both' }}>
            <div style={{ fontFamily:'var(--font-condensed)', fontWeight:700, fontSize:'0.95rem', color:'var(--text)', marginBottom:14, textTransform:'uppercase', letterSpacing:'1px' }}>📊 Record</div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={recordData} barSize={36}>
                <XAxis dataKey="name" tick={{ fontFamily:'var(--font-condensed)', fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontFamily:'var(--font-condensed)', borderRadius:8, border:'1px solid var(--border)' }} />
                <Bar dataKey="value" radius={[6,6,0,0]}>
                  {recordData.map((e,i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card" style={{ padding:'22px', background:'rgba(255,255,255,0.75)', backdropFilter:'blur(16px)', animation:'fadeUp 0.5s 0.15s ease both' }}>
            <div style={{ fontFamily:'var(--font-condensed)', fontWeight:700, fontSize:'0.95rem', color:'var(--text)', marginBottom:14, textTransform:'uppercase', letterSpacing:'1px' }}>🏆 Vittorie per KO</div>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value"
                  label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((e,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontFamily:'var(--font-condensed)', borderRadius:8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding:'22px', marginBottom:20, background:'rgba(255,255,255,0.75)', backdropFilter:'blur(16px)', animation:'fadeUp 0.5s 0.2s ease both' }}>
          <div style={{ fontFamily:'var(--font-condensed)', fontWeight:700, fontSize:'0.95rem', color:'var(--text)', marginBottom:14, textTransform:'uppercase', letterSpacing:'1px' }}>🤖 Previsione Risultato</div>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            {[{label:'Vittoria',pct:50,color:'var(--primary)'},{label:'Pareggio',pct:20,color:'#f59e0b'},{label:'Sconfitta',pct:30,color:'var(--accent)'}].map(item => (
              <div key={item.label} style={{ flex:1, minWidth:130 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.88rem', fontWeight:600 }}>{item.label}</span>
                  <span style={{ fontFamily:'var(--font-display)', color:item.color }}>{item.pct}%</span>
                </div>
                <div style={{ height:7, background:'var(--border)', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${item.pct}%`, background:item.color, borderRadius:4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <label className="checkbox-label glass-card" style={{ padding:'16px 22px', cursor:'pointer', background:'rgba(255,255,255,0.75)', backdropFilter:'blur(16px)', animation:'fadeUp 0.5s 0.25s ease both' }}>
          <input type="checkbox" checked={fav} onChange={() => fav ? removeFavorite(fighter.id) : addFavorite(fighter.id)} />
          <span style={{ fontSize:'1.05rem' }}>{fav ? '⭐ Nei preferiti' : 'Inserisci tra i preferiti'}</span>
        </label>
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