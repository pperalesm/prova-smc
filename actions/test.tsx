"use server";

export async function test() {
  const res = await fetch(
    `https://static-pre.meteo.cat/ginys/referencia/municipis/municipis.json`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    },
  );

  const json = await res.json();

  return json.slice(0, 10).map(
    (municipi: {
      codi: string;
      nom: string;
      coordenades: { latitud: number; longitud: number };
      comarca: { nom: string };
      slug: string | null;
    }): {
      codi: string;
      nom: string;
      coordenades: { latitud: number; longitud: number };
      comarca: { nom: string };
      slug: string;
    } => ({
      codi: municipi.codi,
      nom: municipi.nom,
      coordenades: municipi.coordenades,
      comarca: municipi.comarca,
      slug: municipi.nom
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    }),
  );
}
