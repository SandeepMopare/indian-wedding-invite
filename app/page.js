"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const TARGET = new Date("May 9, 2026 12:35:00").getTime();

export default function Page() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [confetti, setConfetti] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const audioRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        scale: 0.6 + Math.random() * 1.1,
        hue: Math.random() > 0.5 ? "rose" : "gold",
      })),
    []
  );

  const openInvite = () => {
    setOpen(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      audioRef.current
        .play()
        .then(() => setMusicOn(true))
        .catch(() => {});
    }
    setTimeout(
      () => window.scrollTo({ top: 0, behavior: "smooth" }),
      50
    );
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setMusicOn(true)).catch(() => {});
    } else {
      a.pause();
      setMusicOn(false);
    }
  };

  return (
    <>
      {/* Floating petals — purely decorative */}
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.scale})`,
            background:
              p.hue === "gold"
                ? "radial-gradient(circle at 30% 30%, #fff5d6, #d4af37 70%)"
                : "radial-gradient(circle at 30% 30%, #ffb199, #c2185b 70%)",
          }}
        />
      ))}

      {confetti && (
        <Confetti
          width={size.w}
          height={size.h}
          numberOfPieces={260}
          recycle={false}
          colors={[
            "#d4af37",
            "#fff5d6",
            "#c2185b",
            "#f08a24",
            "#8a1a1a",
            "#e6c66a",
          ]}
        />
      )}

      <audio ref={audioRef} loop>
        <source src="/wedding_song.mp3" type="audio/mpeg" />
      </audio>

      {open && (
        <button
          onClick={toggleMusic}
          className="music-toggle"
          aria-label="Toggle music"
          title={musicOn ? "Pause music" : "Play music"}
        >
          {musicOn ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.section
            key="hero"
            className="hero-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-card">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />

              <motion.img
                src="/ganesha1.png"
                alt="Lord Ganesha"
                className="hero-ganesha"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9 }}
              />

              <p className="sanskrit-blessing devanagari">
                ॐ श्री गणेशाय नमः
              </p>

              <div className="divider">
                <span className="diamond" />
              </div>

              <p className="hero-tag">Together with their families</p>

              <h1 className="hero-names gold-text">
                Ranjeet
                <span className="hero-amp"> &amp; </span>
                Asmita
              </h1>

              <p className="hero-tag">Request the honour of your presence</p>

              <div className="divider">
                <span className="diamond" />
              </div>

              <p
                className="devanagari"
                style={{ color: "var(--gold-200)", fontSize: "1.2rem" }}
              >
                शुभ विवाह
              </p>
              <p
                style={{
                  color: "var(--ivory)",
                  opacity: 0.85,
                  fontStyle: "italic",
                  marginTop: "0.4rem",
                }}
              >
                Saturday, 9th May 2026
              </p>

              <motion.button
                onClick={openInvite}
                className="invite-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                ✦ Open Invitation ✦
              </motion.button>
            </div>
          </motion.section>
        ) : (
          <motion.main
            key="invite"
            className="invite-container section-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Blessing */}
            <Card>
              <img
                src="/ganesha1.png"
                alt="Ganesha"
                style={{
                  width: "7rem",
                  margin: "0 auto 0.5rem",
                  display: "block",
                  filter:
                    "drop-shadow(0 6px 18px rgba(212,175,55,0.45))",
                }}
              />
              <p className="devanagari" style={{ color: "var(--gold-200)" }}>
                ॐ श्री गणेशाय नमः
              </p>
              <Divider />
              <p className="section-eyebrow">With the blessings of</p>
              <h2 className="section-title gold-text devanagari">
                शुभ विवाह
              </h2>
              <p style={{ color: "var(--ivory)", opacity: 0.85, fontStyle: "italic" }}>
                A sacred union of two souls
              </p>
            </Card>

            {/* Couple */}
            <Card>
              <p className="section-eyebrow">Two Families United By Love</p>
              <h2 className="section-title gold-text">The Couple</h2>
              <Divider />
              <div className="couple-grid">
                <div>
                  <div className="portrait">
                    <img src="/Ranjeet1.png" alt="Ranjeet" />
                  </div>
                  <p className="couple-name gold-text">Ranjeet</p>
                  <p className="couple-meta">
                    Son of Shivaji &amp; Rukmini Inamdar
                  </p>
                </div>
                <div className="couple-heart">💖</div>
                <div>
                  <div className="portrait">
                    <img src="/Asmita1.png" alt="Asmita" />
                  </div>
                  <p className="couple-name gold-text">Asmita</p>
                  <p className="couple-meta">
                    Daughter of Chandrakant &amp; Rekha Mane
                  </p>
                </div>
              </div>
              <p
                style={{
                  marginTop: "0.75rem",
                  fontStyle: "italic",
                  color: "var(--gold-200)",
                }}
              >
                "Step into a lifetime of togetherness"
              </p>
            </Card>

            {/* Save the date */}
            <Card>
              <p className="section-eyebrow">Mark Your Calendar</p>
              <h2 className="section-title gold-text">Save the Date</h2>
              <Divider />
              <ScratchCard />
              <p
                style={{
                  marginTop: "0.9rem",
                  color: "var(--gold-200)",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "1.4rem",
                }}
              >
                with love &amp; blessings
              </p>
            </Card>

            {/* Events */}
            <Card>
              <p className="section-eyebrow">The Celebrations</p>
              <h2 className="section-title gold-text">Wedding Events</h2>
              <Divider />
              <div className="events-grid">
                <div className="event-card">
                  <h4>Pre-Wedding</h4>
                  <p className="event-name gold-text">Haldi &amp; Sangeet</p>
                  <p>Friday, 8th May 2026</p>
                  <p className="muted">Post 5:00 PM</p>
                  <p className="muted" style={{ marginTop: "0.5rem" }}>
                    Groom's Home, Mangasuli,<br />
                    Karnataka 591234
                  </p>
                </div>
                <div className="event-card">
                  <h4>The Wedding</h4>
                  <p className="event-name gold-text">Wedding Ceremony</p>
                  <p>Saturday, 9th May 2026</p>
                  <span className="muhurat">Muhurat · 12:35 PM</span>
                  <p className="muted" style={{ marginTop: "0.6rem" }}>
                    Mauli Mangal Karyalaya,<br />
                    Near Khandoba Mandir,<br />
                    Mangasuli, Karnataka 591234
                  </p>
                  <a
                    className="map-link"
                    href="https://maps.app.goo.gl/9PqFVYBeKcZnKMTa7"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Location
                  </a>
                </div>
              </div>
            </Card>

            {/* Countdown */}
            <Card>
              <p className="section-eyebrow">The Big Day Awaits</p>
              <h2 className="section-title gold-text">Countdown</h2>
              <Divider />
              <p style={{ color: "var(--gold-200)", opacity: 0.9 }}>
                Until 9 May 2026, 12:35 PM
              </p>
              <div className="countdown-grid">
                <CountBox v={time.d} l="Days" />
                <CountBox v={time.h} l="Hours" />
                <CountBox v={time.m} l="Minutes" />
                <CountBox v={time.s} l="Seconds" />
              </div>
            </Card>

            {/* Closing */}
            <Card>
              <p className="closing-script">With love &amp; gratitude</p>
              <Divider />
              <p className="closing-message">
                Your presence at our wedding will be our greatest gift
                and biggest blessing as we begin this beautiful journey
                of togetherness.
              </p>
              <p className="closing-family gold-text">
                INAMDAR &nbsp;◆&nbsp; MANE
              </p>
              <p
                style={{
                  marginTop: "0.6rem",
                  color: "var(--gold-200)",
                  opacity: 0.85,
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                }}
              >
                — Families —
              </p>
            </Card>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Components ---------------- */

function Card({ children }) {
  return (
    <motion.section
      className="royal-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
    >
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {children}
      </div>
    </motion.section>
  );
}

function Divider() {
  return (
    <div className="divider">
      <span className="diamond" />
    </div>
  );
}

function CountBox({ v, l }) {
  return (
    <div className="count-box">
      <div className="count-value gold-text">
        {String(v).padStart(2, "0")}
      </div>
      <div className="count-label">{l}</div>
    </div>
  );
}

function ScratchCard() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");

    const setup = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Golden foil background
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#b8860b");
      grad.addColorStop(0.5, "#d4af37");
      grad.addColorStop(1, "#8a6508");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle pattern dots
      ctx.fillStyle = "rgba(255,245,214,0.18)";
      for (let y = 8; y < canvas.height; y += 14) {
        for (let x = 8; x < canvas.width; x += 14) {
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = "#2a0808";
      ctx.font = "bold 14px 'Cinzel Decorative', serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "✦ SCRATCH TO REVEAL ✦",
        canvas.width / 2,
        canvas.height / 2
      );
    };
    setup();

    let drawing = false;
    const pos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    };
    const scratch = (e) => {
      const { x, y } = pos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
    };
    const onDown = (e) => {
      drawing = true;
      scratch(e);
    };
    const onMove = (e) => {
      if (!drawing) return;
      e.preventDefault();
      scratch(e);
    };
    const onUp = () => (drawing = false);

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="scratch-wrap" ref={wrapRef}>
      <div className="scratch-reveal">
        <div className="scratch-day">Saturday</div>
        <div className="scratch-date">9 · MAY · 2026</div>
        <div className="scratch-day">12:35 PM Muhurat</div>
      </div>
      <canvas ref={canvasRef} className="scratch-canvas" />
    </div>
  );
}
