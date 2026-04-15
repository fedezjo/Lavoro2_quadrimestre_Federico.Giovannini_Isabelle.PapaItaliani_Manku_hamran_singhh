import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FighterCard({ fighter }) {
  const navigate = useNavigate();
  const initials = fighter.name
    ? fighter.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const wins = fighter.wins ?? 0;
  const losses = fighter.losses ?? 0;
  const draws = fighter.draws ?? 0;

  return (
    <div className="fighter-card fade-up" onClick={() => navigate(`/fighter/${fighter.id}`)}>
      <div className="fighter-card-avatar">{initials}</div>
      <div className="fighter-card-name">{fighter.name || 'Unknown Fighter'}</div>
      <div className="fighter-card-record">
        <strong>{wins}V</strong> – <span style={{ color: 'var(--accent)' }}>{losses}S</span>
        {draws > 0 && <span style={{ color: '#d97706' }}> – {draws}P</span>}
      </div>
      {fighter.weight && (
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-condensed)' }}>
          ⚖️ {fighter.weight}
        </div>
      )}
    </div>
  );
}
