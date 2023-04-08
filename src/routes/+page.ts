import { GetRaceStore, type GetRace$input } from "$houdini";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load = (async (event) => {
  const { GetRaces } = await event.parent();

  // get the next race that is not finished
  // this will be a race that has lots of "live" data so we can test the subscription

  const next = get(GetRaces).data?.races.find((r) => {
    if (!r.startTime || !r.status) return false;
    return r.startTime > new Date() && r.status === "Open";
  });

  if (!next) {
    throw new Error("race not found");
  }

  const input: GetRace$input = {
    id: next?.id,
  };

  const GetRace = new GetRaceStore();
  await GetRace.fetch({ event, variables: input });

  return {
    GetRace,
  };
}) satisfies PageLoad;
