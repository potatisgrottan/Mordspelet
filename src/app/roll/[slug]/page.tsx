import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import { findPublicRole, isRoleSlug } from "@/lib/roles-public";
import { getRoleCard } from "@/lib/roles.server";
import { lockedRole } from "@/lib/session.server";
import { PortraitPlaceholder } from "@/components/RoleChooser";
import RoleLock from "@/components/RoleLock";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };
export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const lock = await lockedRole();
  if (!lock) redirect("/");
  // Access to a different role always redirects back to the role locked to this device.
  if (lock !== slug) redirect(`/roll/${lock}`);
  if (!isRoleSlug(slug)) notFound();
  const role = findPublicRole(slug);
  if (!role) notFound();
  // This is the only place where the server-only private text is read.
  const card = getRoleCard(slug);
  return <main className="private-page">
    <RoleLock />
    <header className="private-header">
      <p className="eyebrow">GRÄDDNOS GODS <span className="ornament">✦</span> VINTERN 1897</p>
      <p className="private-stamp">FÖRSEGLAT · ENDAST FÖR DIG</p>
      <h1>{role.name}</h1>
      <p className="private-subtitle">{role.title}</p>
    </header>
    <div className="private-layout">
      <div className="private-portrait gold-frame">
        {role.portrait ? <Image src={role.portrait} alt={`Porträtt av ${role.name}`} width={900} height={1146} priority
          className="private-image" sizes="(max-width: 780px) 92vw, 310px" /> : <PortraitPlaceholder role={role.slug} />}
        <span className="private-portrait-label">{role.name}</span>
      </div>
      <div className="private-content">
        <Section num="I" title="Exempel att använda i din introduktion" text={card.intro} hint="Berätta gärna med egna ord – detta får de andra veta." />
        <Section num="II" title="Din bakgrund" text={card.background} />
        <Section num="III" title="Det här säger du om ditt alibi" text={card.alibi} isAlibi />
        <div className="secrecy-divider" aria-hidden="true">✦ &nbsp; FÖRTROLIGT &nbsp; ✦</div>
        <Section num="IV" title="Hemligt – bara för dig" text={card.secret} isPrivate />
        <Section num="V" title="Det här vet du" text={card.knowledge} isPrivate />
        <Section num="VI" title="Ditt mål" text={card.goal} isPrivate />
      </div>
    </div>
    <footer className="private-footer"><span>❦</span> Visa inte detta kort för någon annan. Du får ljuga om egna handlingar, men aldrig hitta på nya bevis.</footer>
  </main>;
}

function Section({ num, title, text, hint, isPrivate, isAlibi }: {
  num: string; title: string; text: string; hint?: string; isPrivate?: boolean; isAlibi?: boolean;
}) {
  return <section className={`role-section ${isPrivate ? "role-section-private" : ""}`}>
    <div className="section-top"><span className="section-numeral">{num}</span><h2>{title}</h2>{isPrivate && <span className="secret-icon" aria-label="Privat">✧</span>}</div>
    {hint && <p className="section-hint">{hint}</p>}
    <p className={isAlibi ? "alibi-text" : ""}>{text}</p>
  </section>;
}
