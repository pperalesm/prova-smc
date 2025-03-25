import { WeatherInfo } from "@/components/weather/info";

/*
 * Dynamic Rendering
 */
// DEFAULT

/*
 * Static Site Generation
 */
import { test } from "@/actions/test";
export async function generateStaticParams() {
  const locations = await test();
  return locations.map((location: { nom: string }) => ({
    location: location.nom
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, ""),
  }));
}

/*
 * Incremental Static Regeneration
 */
export const revalidate = 60;

/*
 * Partial Prerender: Upgrade to next canary version and uncomment experimental ppr config.
 */
// export const experimental_ppr = true;

export default function Page({
  params,
}: {
  params: Promise<{
    location: string;
  }>;
}) {
  return <WeatherInfo params={params} />;
}
