// This file is safe to import into client components. No secrets here.
export const PUBLIC_ROLES = [
  {
    "slug": "axel-hastsvans",
    "name": "Axel Hästsvans",
    "title": "Stallmästare / självutnämnd hjärtekrossare",
    "num": "01",
    "portrait": "/portraits/axel.webp"
  },
  {
    "slug": "doktor-gosta-krakspark",
    "name": "Doktor Gösta Kråkspark",
    "title": "Familjeläkare / värdighet utan garanti",
    "num": "02",
    "portrait": "/portraits/gosta.webp"
  },
  {
    "slug": "greve-valdemar-von-vrang",
    "name": "Greve Valdemar von Vrång",
    "title": "Champagnegreve / mopsägare",
    "num": "03",
    "portrait": "/portraits/valdemar.webp"
  },
  {
    "slug": "baron-bertil-von-fjart",
    "name": "Baron Bertil von Fjärt",
    "title": "Skuldsatt adel / västens försvarare",
    "num": "04",
    "portrait": "/portraits/bertil.webp"
  },
  {
    "slug": "fru-dagmar-pannkaka",
    "name": "Fru Dagmar Pannkaka",
    "title": "Tesalongsdrottning / sconesdomare",
    "num": "05",
    "portrait": "/portraits/dagmar.webp"
  },
  {
    "slug": "froken-rut-ratta",
    "name": "Fröken Rut Råtta",
    "title": "Grevens systerdotter / parisisk expert",
    "num": "06",
    "portrait": "/portraits/rut.webp"
  },
  {
    "slug": "konstapel-sigge-skaggstubb",
    "name": "Konstapel Sigge Skäggstubb",
    "title": "Ordningsman / batongkonnässör",
    "num": "07",
    "portrait": "/portraits/sigge.webp"
  },
  {
    "slug": "professor-otto-omlopp",
    "name": "Professor Otto Omlopp",
    "title": "Astronom / expert på ur som går fel",
    "num": "08",
    "portrait": "/portraits/otto.webp"
  }
] as const;

export type RoleSlug = (typeof PUBLIC_ROLES)[number]["slug"];
export type PublicRole = Omit<
  (typeof PUBLIC_ROLES)[number],
    "portrait"
    > & { portrait: string | null };

export function isRoleSlug(value: string): value is RoleSlug {
  return PUBLIC_ROLES.some((role) => role.slug === value);
}


export function findPublicRole(slug: string): PublicRole | undefined {
  return PUBLIC_ROLES.find((role) => role.slug === slug);
  }
  