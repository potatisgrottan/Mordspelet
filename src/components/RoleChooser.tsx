"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PublicRole } from "@/lib/roles-public";

type Props = { roles: readonly PublicRole[]; codesRequired: boolean };

export default function RoleChooser({ roles, codesRequired }: Props) {
  const [selected, setSelected] = useState<PublicRole | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) { setSelected(null); setError(""); }
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected, busy]);

  async function claim() {
    if (!selected || busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/claim", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "same-origin", cache: "no-store",
        body: JSON.stringify({ slug: selected.slug, code }),
      });
      const data: { error?: string; slug?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Kunde inte öppna rollkortet.");
      // replace() removes the chooser from the browser's ordinary back stack.
      window.location.replace(`/roll/${selected.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel inträffade.");
      setBusy(false);
    }
  }

  return <>
    <section className="role-selection" aria-labelledby="choose-title">
      <div className="section-intro">
        <p className="eyebrow">VÄLJ DIN KARAKTÄR</p>
        <h2 id="choose-title">Herrgårdens misstänkta</h2>
        <p>Tryck på ditt namn. Bekräfta först när du är säker – sedan går ditt val inte att ändra på denna mobil.</p>
      </div>
      <div className="role-grid">
        {roles.map((role, index) => <button key={role.slug} className="role-tile" onClick={() => {
          setSelected(role); setCode(""); setError("");
        }} aria-label={`Välj ${role.name}`}>
          <div className="portrait-wrap">
            {role.portrait ? <Image src={role.portrait} alt={`Porträtt av ${role.name}`} fill
              sizes="(max-width: 680px) 44vw, (max-width: 1100px) 28vw, 220px"
              priority={index < 2} className="portrait-img" /> : <PortraitPlaceholder role={role.slug} />}
            <span className="portrait-index">{role.num}</span>
          </div>
          <div className="role-tile-bottom"><h3>{role.name}</h3><span>{role.title.split(" / ")[0]}</span><b className="tile-chevron" aria-hidden="true">›</b></div>
        </button>)}
      </div>
      <p className="selection-footnote">❦ Inga hemligheter visas här. Din roll är privat när den öppnas.</p>
    </section>
    {selected && <div className="dialog-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget && !busy) setSelected(null);
    }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Bekräfta ditt rollval" tabIndex={-1} className="confirmation-dialog">
        <p className="eyebrow">EN GÅNG FÖR ALLA</p>
        <span className="dialog-flourish" aria-hidden="true">❦</span>
        <h2>Är du <em>{selected.name}</em>?</h2>
        <p>När du öppnar kortet låses den här webbläsaren till just denna roll. Du kan inte gå tillbaka för att välja någon annan.</p>
        {codesRequired && <label className="code-label">Din personliga rollkod
          <input autoComplete="off" type="password" value={code} onChange={e=>setCode(e.target.value)} placeholder="Kod från spelledaren" />
        </label>}
        {error && <p role="alert" className="error-message">{error}</p>}
        <div className="dialog-actions"><button className="button-quiet" onClick={() => setSelected(null)} disabled={busy}>Avbryt</button>
          <button className="button-main" onClick={claim} disabled={busy || (codesRequired && !code.trim())}>{busy ? "Förseglar…" : "Ja, lås min roll"}</button></div>
      </div>
    </div>}
  </>;
}

export function PortraitPlaceholder({ role }: { role: string }) {
  const police = role.includes("sigge");
  return <div className="portrait-missing" aria-label="Porträtt saknas">
    <span className="placeholder-emblem" aria-hidden="true">{police ? "⚜" : "☼"}</span>
    <span className="placeholder-label">PORTRÄTT<br />KOMMER SNART</span>
  </div>;
}
