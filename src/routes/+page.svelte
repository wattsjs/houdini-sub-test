<script lang="ts">
  import { selectedRaceId } from "../stores.js";

  export let data;
  $: ({ GetRace, GetRaces } = data);

  // keep track of what the "current" race is
  // this is used in the layout.svelte for the subscription
  $: $GetRace?.data?.race?.id && selectedRaceId.set($GetRace.data.race.id);
</script>

{#if $GetRace.data}
  <span>Current Race: {$GetRace.data.race.id}</span>
{/if}
