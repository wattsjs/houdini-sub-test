import { writable } from "svelte/store";

export const selectedRaceId = writable<string | null>(null);
