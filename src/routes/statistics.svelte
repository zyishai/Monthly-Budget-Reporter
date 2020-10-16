<script>
  import CategoriesStats from '../components/charts/CategoriesStats.svelte';
  import Number from '../components/Number.svelte';
  import { getMonthlyStats } from '../stores/stats';

  const stats = getMonthlyStats();
  let monthlyBudget = 0,
  diffText = 'חיסכון', 
  diffSign = '+', 
  saving = true, 
  deficit = false;
  $: saving = $stats.diff >= 0;
  $: deficit = $stats.diff < 0;
  $: diffText = saving
  ? 'חיסכון'
  : 'גירעון';
  $: diffSign = saving ? '+' : '';
  $: monthlyBudget = $stats.categories.reduce((budget, category) => +budget + +category.maxExpense, 0);
</script>

<style lang="postcss">
  .saving {
    @apply text-green-500;
  }
  .deficit {
    @apply text-red-500;
  }
</style>

<svelte:head>
	<title>ניהול תקציב חודשי | סטטיסטיקות</title>
</svelte:head>

<div class="flex-1 flex flex-col items-center px-3 sm:p-4">
  <h1 class="sm:self-start text-xl font-medium mb-3">
    סטטיסטיקה חודשית
  </h1>
  <div class="flex flex-col sm:flex-row sm:gap-x-8 gap-y-5 divide-y divide-gray-200 sm:divide-y-0 mb-1">
    <div class="flex flex-col items-center">
      <h2 class="text-4xl font-bold">
        <Number currency="₪">{monthlyBudget}</Number>
      </h2>
      <p class="text-sm text-gray-800 font-medium tracking-wide">תקציב חודשי (תקרה)</p>
    </div>
    <div class="flex flex-col items-center">
      <h2 class="text-4xl font-bold">
        <Number currency="₪">{$stats.total}</Number>
      </h2>
      <p class="text-sm text-gray-800 font-medium tracking-wide">סה״כ הוצאות חודשיות</p>
    </div>
    <div class="flex flex-col items-center" class:saving class:deficit>
      <h2 class="text-4xl font-bold">
        <Number currency="₪" positiveSign={diffSign}>{$stats.diff}</Number>
      </h2>
      <p class="text-sm font-medium tracking-wide">סה״כ {diffText}</p>
    </div>
  </div>
  <CategoriesStats class="flex-1 self-stretch" categories={$stats.categories} />
</div>