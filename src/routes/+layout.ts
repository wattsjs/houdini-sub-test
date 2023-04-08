import { GetRacesStore } from "$houdini";
import type { LayoutLoad } from "./$types";

export const ssr = false;

export const load = (async (event) => {
  // here we get a list of all the races

  const GetRaces = new GetRacesStore();
  await GetRaces.fetch({
    event,
    variables: {
      dateFrom: "2023-04-07",
      dateTo: "2024-04-07",
    },
    blocking: true,
  });
  return {
    GetRaces,
  };
}) satisfies LayoutLoad;
