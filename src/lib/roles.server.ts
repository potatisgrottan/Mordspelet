import "server-only";
import type { RoleSlug } from "./roles-public";

/** IMPORTANT: keep this module server-only; never import in a 'use client' component. */
export interface RoleSecrets {
  intro: string;
  background: string;
  alibi: string;
  secret: string;
  knowledge: string;
  goal: string;
}

const CARDS: Record<RoleSlug, RoleSecrets> = {
  "axel-hastsvans": {
    "intro": "Godsets stallmästare; sköter hästarna; charmig och självsäker; tycker att adeln gör allt onödigt svårt.",
    "background": "Du sköter stallet och säljer ibland hö vid sidan av. Greven hade börjat granska förrådet och hotat med avsked.",
    "alibi": "”Jag arbetade i stallet kl. 21.20–22.00. Grinden i den norra boxen var trasig.”",
    "secret": "Du gömde kvitton från svart höhandel i höloftet 21.28–21.34. Ingen såg dig. Dina stövlar var leriga efter ett besök på gården.",
    "knowledge": "Före middagen, omkring 20.50, såg du en stor tom linnevagn stå i tjänstegångens förrum. Du vet inte vem som senare använde den.",
    "goal": "Rädda anställningen och håll höaffären hemlig. Få andra att förklara sina tider."
  },
  "doktor-gosta-krakspark": {
    "intro": "Familjens läkare; stolt över sin medicinska kunskap; en smula dramatisk; vill framstå som fullt respektabel.",
    "background": "Greven övervägde att ersätta dig efter några mycket märkliga behandlingar. Du anser dig missförstådd av medicinhistorien.",
    "alibi": "”Jag satt i mitt arbetsrum i västra flygeln 21.25–21.50, sedan gick jag till salongen.”",
    "secret": "Du gick till medicinskåpet i västra korridoren 21.39–21.44 och bytte ut en felmärkt flaska. En äldre journal är förfalskad. Dessutom är du förälskad i Valdemar, men har även fattat tycke för Bertil. Du har skickat båda varsin svulstig kärleksdikt och hoppas innerligt att de aldrig jämför dem.",
    "knowledge": "Din preliminära bedömning är att skadan i bakhuvudet kan ha uppstått någon gång omkring 21.30–21.50. Du kan inte bestämma ett exakt klockslag.",
    "goal": "Skydda journalerna och dina kärleksdikter. Försök diskret ta reda på vem Valdemar och Bertil egentligen föredrar."
  },
  "greve-valdemar-von-vrang": {
    "intro": "Förmögen societetsgreve; älskar champagne och mopsen Gustav; generös i offentliga sammanhang; älskar uppmärksamhet.",
    "background": "Du finansierar kostsamma fester och talar gärna om välgörenhet. Greven hade nyligen blivit oroväckande intresserad av dina kontakter i vinhandeln.",
    "alibi": "”Jag rökte på salongens veranda från ungefär 21.25 till 21.50 och gick sedan tillbaka till kortbordet.”",
    "secret": "DU ÄR MÖRDAREN. Du förde bort 9 000 kr ur Vinterhjälpen via Maison Étoile & Co. Du gav Gottfrid ett möteskort märkt ”B.” på elfenbensfärgat, guldstänkt papper. Du lämnade kortbordet med Gustav 21.24, mötte Gottfrid i vinterträdgården 21.35 och slog honom ca 21.40 med en bronsfigur. Du körde kroppen på linnevagnen till biblioteket, slog sönder glaset och vred klockvisarna till 22.06. Gustavs vinröda rosett fastnade vid hjulet. Du återvände ca 21.55. Du har hemligt lovat både Gösta och Bertil romantisk trohet, fast du är förtjust i dem båda. Ingen av dem får veta vad du sagt till den andre.",
    "knowledge": "Endast du vet hela händelseförloppet. Du får ljuga om ditt eget alibi och motiv, men inte uppfinna vittnen, föremål eller nya fynd.",
    "goal": "Dölj mordet och förskingringen. Håll Gösta och Bertil på gott humör, men använd gärna deras svartsjuka som villospår."
  },
  "baron-bertil-von-fjart": {
    "intro": "En adelsman med storhetsdrömmar; förtjust i sin praktfulla röda väst; stolt familjenamn; ekonomin är ett ömt ämne.",
    "background": "Du är svårt skuldsatt och greven krävde återbetalning av ett lån. Din praktfulla vinröda väst är knappt betald.",
    "alibi": "”Jag var i biljardrummet från strax efter 21.30 till omkring 21.50.”",
    "secret": "Du försökte bränna ett skuldebrev i biljardrummets kamin 21.34–21.49. Ingen kan styrka alibit. Du är hemligt förälskad i både Valdemar och Gösta. Du har anförtrott Valdemar att han är den ende, men kysst Gösta bakom en bokhylla tidigare under kvällen. Du vill inte att någon av dem ska jämföra era löften.",
    "knowledge": "Du spelade kort tidigare och såg en ask tjocka, elfenbensfärgade visitkort med guldstänk intill Valdemars plats. Han använde dem gärna till små hälsningar.",
    "goal": "Dölj skulden och det romantiska dubbelspelet. Försök förstå varför både Gösta och Valdemar uppför sig så egendomligt."
  },
  "fru-dagmar-pannkaka": {
    "intro": "Förmögen änka och tesalongsägare; älskar katter, bakelser, skvaller och korrekt serverat te; självutnämnd smakdomare.",
    "background": "Du driver en dyr tesalong och anser dig ha uppfunnit god smak. Greven krävde besked om en betalning ur Vinterhjälpen.",
    "alibi": "”Jag spelade kort till omkring 21.25, ordnade sedan te i serveringsrummet och var i salongen vid 21.55.”",
    "secret": "Du tog 1 200 kr ur Vinterhjälpen till tesalongens hyra och hoppades kunna betala tillbaka. Du såg ingen del av mordet.",
    "knowledge": "Vid kortbordet omkring 21.24 såg du Valdemar gå därifrån med Gustav efter sig. När du kom tillbaka vid 21.53 satt han ännu inte vid bordet.",
    "goal": "Skydda tesalongens rykte. Avslöja inte din skuld utan anledning."
  },
  "froken-rut-ratta": {
    "intro": "Grevens systerdotter; nyss hemkommen från Paris; modeintresserad, dyr i drift och allergisk mot provinsiella seder.",
    "background": "Du har dyra vanor, förfallna kreditnotor och en morbror som planerade att dra in ditt underhåll.",
    "alibi": "”Jag övade piano i musikrummet omkring 21.25–21.45. Efteråt letade jag efter morbror.”",
    "secret": "Du gömde ett falskt kvitto i korridorens bokskåp vid 21.47. Där hörde du kort därefter ett gnisslande hjul från tjänstegången. Du såg inte vem det var.",
    "knowledge": "Du hittade kroppen i biblioteket 22.12. Du känner till Maison Étoile & Co från Paris; Valdemar brukar beställa champagne därifrån.",
    "goal": "Dölj dina förfalskade kvitton och få de andra att ta dina iakttagelser på allvar."
  },
  "konstapel-sigge-skaggstubb": {
    "intro": "Godsets tillkallade konstapel; älskar regler och sin batong; vill gärna leda allas förhör, oavsett vem som bett om det.",
    "background": "Du kallades hit inför granskningen. Din batong har en tung gulmetallknopp och din yrkesstolthet saknar motsvarighet.",
    "alibi": "”Jag patrullerade huvudporten och gården 21.25–21.55. Brottsligheten tar ingen rast.”",
    "secret": "En vedhandlare mutade dig för en falsk leveranskvittens. Du gömde papperet i vedboden 21.36–21.48.",
    "knowledge": "Vid din kontroll av salongsverandan kl. 22.05 såg den orörd ut under ett jämnt lager nysnö. Du bevakade inte verandan under hela kvällen.",
    "goal": "Led förhören med stort självförtroende; undvik samtal om leveranskvittensen."
  },
  "professor-otto-omlopp": {
    "intro": "Professor i astronomi; studerar stjärnor och klockor; exakt, högdragen och förtvivlad över andras dåliga tidssinne.",
    "background": "Du föreläser om tid och stjärnor. Greven frågade nyligen vart ditt bidrag till ”väderobservationer” hade tagit vägen.",
    "alibi": "”Jag var i instrumentbyggnaden under observationerna mellan 21.25 och 21.55.”",
    "secret": "Du gick till det murade instrumentannexets arkiv 21.36–21.47 för att gömma ett falskt anslagsbrev. Annexet skiljs från vinterträdgården av pannrummet och två stängda dörrar; du såg eller hörde ingen därifrån.",
    "knowledge": "Du justerade biblioteksklockan till rätt tid kl. 20.45 och antecknade snöfallets start kl. 21.25. Du har en tung mässingsvikt bland dina instrument.",
    "goal": "Försvara ditt vetenskapliga rykte, men säg inte mer än du faktiskt vet."
  }
} ;

export function getRoleCard(slug: RoleSlug): RoleSecrets {
  return CARDS[slug];
}
