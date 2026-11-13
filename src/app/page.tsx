import { redirect } from "next/navigation";
import { PUBLIC_ROLES } from "@/lib/roles-public";
import { lockedRole, codesEnabled } from "@/lib/session.server";
import RoleChooser from "@/components/RoleChooser";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const role = await lockedRole();
  if (role) redirect(`/roll/${role}`);
  return <main>
    <header className="site-hero">
      <p className="eyebrow">VINTERN 1897 <span className="ornament">✦</span> PRIVATA ROLLKORT</p>
      <div className="crest" aria-hidden="true">♜</div>
      <h1>Mysteriet på<br /><em>Gräddnos gods</em></h1>
      <div className="hero-divider" aria-hidden="true"><span>❦</span></div>
      <p className="hero-intro">En greve är död. Snön faller tung över herrgården.<br />Åtta gäster bär på hemligheter.</p>
      <p className="hero-cta">Vem är du denna afton?</p>
    </header>
    <RoleChooser roles={PUBLIC_ROLES} codesRequired={codesEnabled()} />
    <footer className="home-footer"><span>ETT VAL PER MOBIL</span><span>❦</span><span>HÅLL HEMLIGHETERNA HEMLIGA</span></footer>
  </main>;
}
