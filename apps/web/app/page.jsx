"use client";
import Link from "next/link";

function LightbulbLogo(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      width={props.size || 64}
      height={props.size || 64}
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd76a" />
          <stop offset="1" stopColor="#ffb347" />
        </linearGradient>
      </defs>
      <path
        d="M32 6c-10.5 0-19 8.5-19 19 0 7 3.8 12.3 8.1 15.2 1.7 1.2 2.9 3.1 3.3 5.1l.2 1H39.4l.2-1c.4-2 1.6-3.9 3.3-5.1C47.2 37.3 51 32 51 25 51 14.5 42.5 6 32 6z"
        fill="url(#g)"
      />
      <rect x="24" y="46" width="16" height="4" rx="2" fill="#333" />
      <rect x="23" y="52" width="18" height="4" rx="2" fill="#333" />
      <circle cx="32" cy="25" r="10" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

export default function Home() {
  const wrap = {
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
  };
  const hero = {
    padding: "64px 24px",
    background:
      "radial-gradient(1200px 600px at 20% -10%, #ffe8b5 0%, transparent 50%), linear-gradient(180deg,#0f1115,#0b0d11)",
  };
  const container = { maxWidth: 980, margin: "0 auto" };
  const title = {
    fontSize: 48,
    lineHeight: 1.1,
    fontWeight: 800,
    color: "white",
    margin: "16px 0 8px",
  };
  const subtitle = {
    color: "rgba(255,255,255,0.8)",
    fontSize: 18,
    maxWidth: 720,
  };
  const ctaRow = { display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" };
  const primaryBtn = {
    padding: "12px 16px",
    borderRadius: 10,
    background: "white",
    color: "#0f1115",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  };
  const ghostBtn = {
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    textDecoration: "none",
    display: "inline-block",
  };
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 40,
  };
  const card = {
    background:
      "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 16,
    color: "white",
  };
  const footer = {
    marginTop: "auto",
    padding: "20px 24px",
    color: "#8892a6",
    borderTop: "1px solid #1a1d24",
    background: "#0b0d11",
  };

  return (
    <div style={wrap}>
      <header style={{ ...hero }}>
        <div style={container}>
          <LightbulbLogo size={60} />
          <h1 style={title}>Sociallux</h1>
          <p style={subtitle}>
            A universal, ultra-flexible data layer: build an <em>atom</em> for
            anything — contacts, clinics, notes, tasks — and layer{" "}
            <em>lexemes</em> to give atoms structure when you need it.
          </p>

          <div style={ctaRow}>
            <Link href="/atoms" style={primaryBtn}>
              View Atoms
            </Link>
            <a
              href="https://github.com/tommyc925/sociallux"
              style={ghostBtn}
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repo
            </a>
          </div>

          <div style={grid}>
            <div style={card}>
              <h3 style={{ margin: "0 0 6px" }}>Atoms</h3>
              <p style={{ margin: 0, opacity: 0.85 }}>
                Minimal, schema-light records where each value is an explicit
                key + typed slot.
              </p>
            </div>
            <div style={card}>
              <h3 style={{ margin: "0 0 6px" }}>Lexemes</h3>
              <p style={{ margin: 0, opacity: 0.85 }}>
                Optional descriptors that define structure, validation, and
                views—apply them when needed.
              </p>
            </div>
            <div style={card}>
              <h3 style={{ margin: "0 0 6px" }}>API-first</h3>
              <p style={{ margin: 0, opacity: 0.85 }}>
                Clean REST endpoints for create, list, patch, and delete—easy to
                integrate with any UI.
              </p>
            </div>
            <div style={card}>
              <h3 style={{ margin: "0 0 6px" }}>Extensible</h3>
              <p style={{ margin: 0, opacity: 0.85 }}>
                Start primitive (strings, numbers, booleans); add richer types
                and relations later.
              </p>
            </div>
          </div>
        </div>
      </header>

      <footer style={footer}>
        <div style={container}>
          <span>
            © {new Date().getFullYear()} Sociallux • Built with Next.js +
            Express + MongoDB
          </span>
        </div>
      </footer>
    </div>
  );
}
