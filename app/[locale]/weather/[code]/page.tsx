import { WeatherInfo } from "@/components/weather/info";
import { API } from "@/lib/api";
import { PageDto, IShortLocation } from "@/lib/api";

/*
 * Dynamic Rendering
 */
// DEFAULT

/*
 * Static Site Generation
 */
export async function generateStaticParams() {
  const locations: { code: string }[] = [];

  let hasNextPage = true;
  let nextPage = 1;

  while (hasNextPage) {
    let res: Response;

    try {
      res = await fetch(
        `${API.BASE_URL}${API.ENDPOINTS.LOCATIONS}?${API.PARAMS.TAKE(50)}&${API.PARAMS.PAGE(nextPage)}`,
      );
    } catch {
      break;
    }

    if (!res.ok) {
      break;
    }

    const page: PageDto<IShortLocation> = await res.json();

    locations.push(
      ...page.data.map((location) => ({
        code: location.code,
      })),
    );

    hasNextPage = page.meta.hasNextPage;
    nextPage++;
  }

  return locations;
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
  params: Promise<{ code: string }>;
}) {
  return <WeatherInfo params={params} />;
}
