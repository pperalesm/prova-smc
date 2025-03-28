"use server";

import { ILocation } from "@/components/weather/combobox";

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
    (municipi: { codi: string; nom: string }): ILocation => ({
      code: municipi.codi,
      name: municipi.nom,
    }),
  );
}
