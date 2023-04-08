<script lang="ts">
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
</script>

<span>Handled Updates: {updateCount}</span>
<slot />
