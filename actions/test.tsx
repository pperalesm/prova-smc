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

  return json.slice(0, 10);
}
