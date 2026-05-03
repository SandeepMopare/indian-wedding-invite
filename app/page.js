"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ d: 9, h: 0, m: 0, s: 0 });
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const t = new Date("May 9, 2026 12:35:00").getTime(); // Corrected date to match invitation text
    const i = setInterval(() => {
      const now = Date.now();
      const diff = t - now;
      if (diff < 0) return;
      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const openInvite = () => {
    setOpen(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
    document.getElementById("music")?.play();
  };

  return (
    <div className="min-h-screen text-center p-6">
      {confetti && <Confetti />}

      <audio id="music" loop>
        <source src="/wedding_song.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!open && (
          <motion.div
            key="hero"
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col justify-center items-center"
          >
            <h1 className="text-6xl text-yellow-400 font-bold">
              Ranjeet & Asmita
            </h1>
            <button
              onClick={openInvite}
              className="mt-8 px-8 py-4 bg-yellow-500 text-black rounded-full"
            >
              Open Invitation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16 mt-10 max-w-lg mx-auto"
          >
            <Section>
              <div className="text-sm text-yellow-300 mx-auto w-fit">
                <img src="/ganesha1.png" class="hero-ganesha" />
              </div>
              <p className="text-yellow-300">ॐ श्री गणेशाय नमः</p>
              <h1 className="text-4xl text-yellow-400">शुभ विवाह</h1>
            </Section>

            <Section>
              <div className="section couple">
                <h3>TWO FAMILIES UNITED BY LOVE</h3>
                <div className="couple-grid">
                  <div className="mx-auto w-fit">
                    <img src="/Ranjeet1.png" alt="Ranjeet" />
                    <p className="name">Ranjeet</p>
                    <p className="metadata">
                      Son of Shivaji &amp; Rukmini Inamdar
                    </p>
                  </div>
                  <div className="heart">❤️</div>
                  <div>
                    <img src="/Asmita1.png" alt="Asmita" />
                    <p className="name">Asmita</p>
                    <p className="metadata">
                      Daughter of Chandrakant &amp; Rekha Mane
                    </p>
                  </div>
                </div>
                <p className="italic">Step into a lifetime of togetherness</p>
              </div>
            </Section>

            <Section>
              <div className="section" id="save-date">
                <h3>Save The Date</h3>
                <ScratchCard className="mx-auto w-fit">
                  <p className="date">9 MAY 2026</p>
                </ScratchCard>
                <img src="/3.png" alt="Save The Date" className="mx-auto" />
              </div>
            </Section>

            <section class="section details">
              <div>
                <h3>Pre-Wedding Celebrations</h3>
                <p> Haldi &amp; Sangeet</p>
                <p>Friday, 8th May 2026, Post 5 PM</p>
                <p class="venue">
                  Grooms Home, Mangasuli, Mangasuli, Karnataka 591234
                </p>
              </div>
              <div>
                <h3>Wedding Ceremony</h3>
                <p>Saturday, 9th May 2026</p>
                <p class="important">12:35 PM Muhurt</p>
                <p>Mauli Mangal Karyalaya, Near Khandoba Mandir, Mangasuli, Karnataka 591234</p>
                <a
                  href="https://maps.app.goo.gl/9PqFVYBeKcZnKMTa7"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Location 📍
                </a>
              </div>
              {/* <div>
                <h3>Reception</h3>
                <p>Tuesday, 5th May 2026</p>
                <p class="important">Time 6:00pm</p>
                <p class="venue">
                  Her Highness Banquets, 2nd Floor, Lunkad Sky Cruise, Clover
                  Park, Viman Nagar, Pune, Maharashtra 411014
                </p>
                <a
                  href="https://maps.app.goo.gl/u7UQGdBmEvLsmci39"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Location 📍
                </a>
              </div> */}
            </section>

            <Section>
              <h2 className="text-2xl text-yellow-400">9 May 2026</h2>
              <p>12:35 PM Muhurat</p>
            </Section>

            <Section>
              <h2 className="text-xl">Countdown</h2>
              <p className="text-sm text-gray-300 mb-4">
                Until 9 May 2026, 12:35 PM
              </p>
              <div className="grid grid-cols-4 gap-4">
                <Box v={time.d} l="Days" />
                <Box v={time.h} l="Hours" />
                <Box v={time.m} l="Minutes" />
                <Box v={time.s} l="Seconds" />
              </div>
            </Section>
            <section class="section closing">
              <p>With Love</p>
              <p class="message">
                Your presence will be our greatest gift and biggest blessing.
              </p>
              <p class="family">INAMDAR &amp; MANE FAMILY</p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScratchCard({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    // Set canvas size to match the container
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    // Draw the scratchable layer
    ctx.fillStyle = "#d4af37"; // Golden foil color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add a text hint
    ctx.fillStyle = "#2b0a0a";
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal Date", canvas.width / 2, canvas.height / 2);

    const scratch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMove = (e) => {
      if (e.buttons === 1 || e.type === "touchmove") {
        scratch(e);
      }
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("touchmove", handleMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[100px] flex flex-col justify-center items-center overflow-hidden rounded-xl bg-white/10">
      <div className="z-0">{children}</div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-10 cursor-pointer touch-none"
      />
    </div>
  );
}

function Section({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // Initial animation state
      whileInView={{ opacity: 1, y: 0 }} // Animation when in view
      className="text-center" // Added for centering content within the section
    >
      {children}
    </motion.div>
  );
}

function Box({ v, l }) {
  return (
    <div className="bg-black/40 p-4 rounded">
      <div>{v}</div>
      <div>{l}</div>
    </div>
  );
}
