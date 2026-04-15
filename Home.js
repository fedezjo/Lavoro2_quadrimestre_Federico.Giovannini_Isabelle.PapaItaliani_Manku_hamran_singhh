import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── SFONDO PIENO – immagine pugile + grafici ── */}
      <img
        src="/images/bg.png"
        alt="background"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* overlay leggero */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'rgba(220, 232, 255, 0.40)'
      }} />

      {/* ── NAVBAR – stile Figma: azzurro, logo a sinistra, bottoni a destra ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: 'rgba(190, 215, 255, 0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '2px solid rgba(26,60,255,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 16px rgba(26,60,255,0.08)'
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.1rem', letterSpacing: '2px',
          color: 'var(--primary)', textDecoration: 'none'
        }}>
          Jab Lab
        </Link>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: '9px 24px', fontSize: '0.95rem' }}>
            Accedi
          </Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '9px 24px', fontSize: '0.95rem' }}>
            Registrati
          </Link>
        </div>
      </nav>

      {/* ── CONTENUTO ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        paddingTop: 64,
      }}>
        {/* "Introduzione" – top-left come nel Figma */}
        <div style={{ padding: '24px 28px 0', maxWidth: 760 }}>
          <h2 style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 700,
            color: 'var(--primary)',
            letterSpacing: '1px',
            display: 'inline-block',
            background: 'rgba(255,255,255,0.50)',
            backdropFilter: 'blur(8px)',
            padding: '6px 18px',
            borderRadius: 8,
          }}>
            Introduzione
          </h2>
          <p style={{
            marginTop: 18,
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            lineHeight: 1.75,
            color: '#17203d',
            background: 'rgba(255,255,255,0.82)',
            padding: '18px 20px',
            borderRadius: 16,
            boxShadow: '0 20px 40px rgba(15, 37, 89, 0.10)',
            maxWidth: 720,
          }}>
            Jab La"Benvenuti su Jab Lab, l'ecosistema digitale dove ogni jab, gancio e montante viene trasformato in un dato statistico di valore. In un mondo sportivo sempre più guidato dai numeri, ci poniamo come l'osservatorio principale per il pugilato d'élite, aggregando informazioni da oltre 18 categorie di peso e dalle principali organizzazioni mondiali. Il nostro obiettivo è offrire a tecnici, atleti e appassionati uno strumento di navigazione rapido ma profondo: dai grafici sulle vittorie per KO alle heatmap dei combattimenti più iconici. Esplora le carriere dei lottatori attraverso metriche dettagliate e scopri come la potenza si sposa con la strategia, il tutto racchiuso in un'interfaccia professionale pensata per chi non si accontenta di un semplice verdetto, ma vuole capire come questo è stato costruito."b è un sito di analitica che racconta i dati e le percentuali principali dei match di pugilato. Qui puoi esplorare statistiche sulle vittorie, le sconfitte e l'andamento dei combattimenti, con grafici e numeri chiari. L'obiettivo è offrire una visione rapida e professionale dei risultati dei match e delle performance degli atleti.
          </p>
        </div>
      </div>

      {/* BOXING badge – bottom right */}
      <div style={{
        position: 'fixed', bottom: 68, right: 28, zIndex: 10,
        background: 'rgba(255,255,255,0.80)',
        borderRadius: 12, padding: '8px 14px',
        border: '2px solid rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
      }}>
        <span style={{ fontSize: '1.4rem' }}>🥊</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '0.8rem',
          letterSpacing: '2px', color: '#222', lineHeight: 1
        }}>BOXING</span>
      </div>

      {/* Bandiere – bottom right */}
      <div style={{
        position: 'fixed', bottom: 22, right: 28, zIndex: 10,
        display: 'flex', gap: 10
      }}>
        <span style={{ fontSize: '2rem', cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>🇮🇹</span>
        <span style={{ fontSize: '2rem', cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}>🇬🇧</span>
      </div>
    </div>
  );
}
