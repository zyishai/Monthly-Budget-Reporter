<script>
  import { getMonthlyStats } from "../stores/stats";
  import Number from "./Number.svelte";

  export let category;
  
  const stats = getMonthlyStats();
  $: categoryBudget = $stats.categories.find(({ id }) => id === category.id)?.diff || 0;
</script>

<p class="text-sm">
  <span>
    כמה נותר לי?
  </span>
  <strong class="tracking-wide">
    <Number currency='₪'>{Math.max(categoryBudget, 0)}</Number>
  </strong>
</p>