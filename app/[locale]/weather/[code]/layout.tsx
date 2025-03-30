import { WeatherWrapper } from "@/components/weather/wrapper";
import { API, IShortLocation, PageDto } from "@/lib/api";

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

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  return <WeatherWrapper params={params}>{children}</WeatherWrapper>;
}
