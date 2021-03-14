<script>
  import { getStatsForCategory } from '../stores/stats';
import Number from './Number.svelte';

  /**
   * @type {import("../stores/categories").Category}
   */
  export let category;
  // let diffText = 'חיסכון', 
  //     diffSign = '+', 
  //     saving = true, 
  //     deficit = false;
  $: stats = getStatsForCategory(category);
  // $: saving = $stats.diff >= 0;
  // $: deficit = $stats.diff < 0;
  // $: diffText = saving
  //   ? 'חיסכון'
  //   : 'גירעון';
  // $: diffSign = saving ? '+' : '';
</script>

<!-- <style lang="postcss">
  .saving {
    @apply text-green-500;
  }
  .deficit {
    @apply text-red-500;
  }
</style> -->

<p class="text-sm">
  <span>סך הוצאות חודשיות: </span>
  <strong class="tracking-wide">
    <Number currency='₪'>{$stats.total}</Number>
  </strong>
</p>
<!-- <p class="text-sm">
  <span>{diffText}: </span>
  <strong class="tracking-wide" class:saving class:deficit>
    <span>
      <Number positiveSign={diffSign} currency="₪">{$stats.diff}</Number>
    </span>
  </strong>
</p> -->