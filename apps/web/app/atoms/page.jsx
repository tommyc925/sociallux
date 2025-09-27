"use client";
import { useEffect, useState } from "react";

export default function AtomsPage() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/atoms", { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setErr(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Atoms</h1>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Request failed: {err}</p>}

      {!loading &&
        !err &&
        (Array.isArray(data) ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.map((a, i) => (
              <li
                key={a._id || i}
                style={{
                  border: "1px solid #ddd",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <div>
                  <strong>{a.name || "(no name)"}</strong>
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{a._id || ""}</div>
              </li>
            ))}
          </ul>
        ) : (
          <pre
            style={{
              background: "#f6f8fa",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        ))}
    </main>
  );
}
