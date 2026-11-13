# Mysteriet på Gräddnos gods – privata rollkort

En mobilanpassad Next.js-webbplats för de **åtta** privata rollkorten i vintermordgåtan (1897). Startsidan visar endast namn, titlar och porträtt. Spelaren väljer sin roll, bekräftar sitt val och får sedan bara se **sin** karaktärs hemliga rollkort.

## Vad som ingår

- Startsida med alla åtta roller och deras porträtt (sex faktiska bilder och två tydliga platshållare för Sigge och Otto).
- Separat, serverrenderad rollsida för varje karaktär, baserad på den senaste korrigerade PDF:en.
- Mobilvänligt tema med mörkt sammet, gulddetaljer och vintage-typografi.
- Val av roll låser enheten i sju dagar: servern sätter en **signerad, HttpOnly-cookie**. Browser-back mot startsidan leder direkt tillbaka till samma roll. `window.location.replace` och en back-guard gör vanlig tillbakagång svår.
- Andra spelares hemligheter skickas inte till klienten. `src/lib/roles.server.ts` är markerad `server-only` och hämtas endast efter åtkomstkontroll på servern.
- Valfri personlig rollkod per karaktär med `ROLE_CODES_JSON`.

## Snabbstart lokalt

Du behöver Node.js 20.9 eller senare.

```bash
npm install
cp .env.example .env.local
```

Öppna `.env.local` och ange **ett slumpat värde** för `SESSION_SECRET`, minst 32 tecken. Generera exempelvis:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Starta sedan:

```bash
npm run dev
```

Öppna `http://localhost:3000`.

## Snabbast till GitHub → Vercel

1. Skapa ett **privat** GitHub-repository, exempelvis `graddnos-rollkort`. (Viktigt: rollkortens hemliga texter ligger i serverkoden. Om repot är publikt kan alla läsa dem på GitHub!)
2. Packa upp ZIP-filen. Lägg in **innehållet** i den uppackade mappen som repository-roten; `package.json` ska ligga i roten. Du kan använda GitHubs **Add file → Upload files** eller vanliga git-kommandon.
3. Gå till Vercel → **Add New → Project**, importera GitHub-repot. Framework ska upptäckas som Next.js.
4. Under **Environment Variables**, lägg till `SESSION_SECRET` med ett slumpat värde på minst 32 tecken. Ange samma miljövariabel för Production (och Preview om du använder preview-deploy).
5. Valfritt: lägg till `ROLE_CODES_JSON` enligt nedan så att varje spelare behöver en egen kod.
6. Klicka **Deploy**. Dela Vercel-URL:en till gästerna.

### Valfria personliga rollkoder (rekommenderas)

Utan koder kan en gäst som öppnar sajten i inkognito eller på en ny mobil **välja någon annans roll**. För att förhindra den typen av misstag, sätt en rollkod per karaktär. Formatera som ett enda JSON-objekt på en rad:

```json
{
  "axel-hastsvans": "AXEL-unikt-losenord",
  "doktor-gosta-krakspark": "GOSTA-unikt-losenord",
  "greve-valdemar-von-vrang": "VALDEMAR-unikt-losenord",
  "baron-bertil-von-fjart": "BERTIL-unikt-losenord",
  "fru-dagmar-pannkaka": "DAGMAR-unikt-losenord",
  "froken-rut-ratta": "RUT-unikt-losenord",
  "konstapel-sigge-skaggstubb": "SIGGE-unikt-losenord",
  "professor-otto-omlopp": "OTTO-unikt-losenord"
}
```

Klistra in JSON som **en rad** under variabelnamnet `ROLE_CODES_JSON` i Vercel. **Byt alla exempelvärden mot egna starka koder** och skicka enbart rätt kod till rätt gäst. Koder lagras bara i Vercels servermiljö, inte på startsidan.

### Sigge och Ottos porträtt

De två porträtten fanns inte bland aktuella bilagor och visas därför med en dekorativ platshållare. Om du har deras bilder:

1. Lägg dem som `public/portraits/sigge.webp` och `public/portraits/otto.webp` (PNG går också, men ändra filändelsen i koden).
2. Öppna `src/lib/roles-public.ts` och ändra fältet `portrait: null` för respektive roll till `"/portraits/sigge.webp"` respektive `"/portraits/otto.webp"`.
3. Commit/pusha. Vercel bygger om webbplatsen automatiskt.

## Viktigt om åtkomst och att inte kunna backa

Webbläsare kan **inte** låsas fullständigt. Spelaren kan stänga fliken, använda en annan webbläsare, inkognito eller rensa cookies. På samma webbläsare gör den signerade cookien dock att startsidan och alla andra rollsidor omdirigerar till spelarens redan valda roll.

**Utan rollkoder** är första valet öppet för alla besökare. **Med rollkoder** skyddas varje roll vid första åtkomsten, men detta är fortfarande ett festspel – inte ett system för högsäkerhetsdata. En kod kan delas med andra, och inga globalt engångsanvändbara koder finns utan databas.

**Skapa ett privat GitHub-repo** och dela inte den privata källfilen `src/lib/roles.server.ts` med spelarna. Publicera inte heller kortens facit eller rollkort som vanliga bilder, Markdown-filer eller HTML i `public/`.

## Redigera innehåll

- Publika namn, titlar och porträtt: `src/lib/roles-public.ts` (ingen hemlig info här).
- Privata rolltexter: `src/lib/roles.server.ts` (server-only).
- Färger och design: `src/app/globals.css`.

De privata texterna är hämtade från **`Rollkort_8_roller_KORRIGERAD_SIGGE.pdf`**. Detta inkluderar konstapel Sigges rättade hemlighet; inget är borttaget eller omskrivet i webbkorten.

## Kontroll före spel

Kontrollera på **två olika telefoner**: Välj två olika roller, öppna en annan rolls URL manuellt och prova att gå tillbaka. De ska alltid stanna på sina egna rollkort. Testa gärna personliga koder i en inkognitoflik först, innan du delar länken till alla.
