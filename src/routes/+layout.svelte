<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { graphql } from "$houdini";
  import { selectedRaceId } from "../stores";

  const priceUpdates = graphql(`
    subscription PriceUpdates($id: ID!, $bookmakers: [String!]) {
      priceUpdates(id: $id, bookmakers: $bookmakers) {
        id
        bookmaker
        fixedWin {
          price
          lastUpdated
        }
      }
    }
  `);

  let updateCount = 0;

  $: $priceUpdates.data?.priceUpdates && updateCount++;

  $: $selectedRaceId && priceUpdates.listen({ id: $selectedRaceId });

  async function loadNext() {
    await invalidate("GetRace");
  }
</script>

<button on:click={loadNext}>Load Next</button>
<span>Handled Updates: {updateCount}</span>
<slot />
