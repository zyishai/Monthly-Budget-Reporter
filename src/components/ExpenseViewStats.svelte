<script>
import { getStoreForCategory } from "../stores/expenses";


  /**
   * @type {import("../stores/categories").Category}
   */
  export let category;
  let totalExpenses = 0, 
      diff = 0, 
      diffText = 'חיסכון', 
      diffSign = '+', 
      saving = true, 
      deficit = false;
  $: store = getStoreForCategory(category.id);
  $: storeTotal = store.totalExpenses;
  $: totalExpenses = $storeTotal;
  $: diff = category.maxExpense - totalExpenses;
  $: saving = diff >= 0;
  $: deficit = diff < 0;
  $: diffText = saving
    ? 'חיסכון'
    : 'גירעון';
  $: diffSign = saving ? '+' : '';
</script>

<style lang="postcss">
  .saving {
    @apply text-green-500;
  }
  .deficit {
    @apply text-red-500;
  }
</style>

<p class="text-sm">
  <span>הוצאות לחודש: </span>
  <strong class="tracking-wide">{totalExpenses} ₪</strong>
</p>
<p class="text-sm">
  <span>{diffText}: </span>
  <strong class="tracking-wide" class:saving class:deficit>
    <span dir="ltr">{diffSign}{diff}</span> ₪
  </strong>
</p>