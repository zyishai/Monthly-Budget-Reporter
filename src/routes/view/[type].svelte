<script context="module">
  import { getCategoryInfoById } from '../../stores/categories';
  export async function preload(page) {
    const { type: categoryId } = page.params;

    const category = getCategoryInfoById(categoryId);

    return { categoryId, category };
  }
</script>

<script>
  import AddExpenseButton from '../../components/AddExpenseButton.svelte';
  import ExpensesTable from '../../components/ExpensesTable.svelte';

  export let category;
  export let categoryId;
</script>

<div class="flex-1 h-full flex flex-col items-stretch p-4 overflow-hidden">
  {#if $category}
    <!-- <h3 class="text-lg tracking-wide mb-5">
      <span class="text-gray-700">הוצאה מקסימלית חודשית:</span> {$category.maxExpense} ₪
    </h3> -->

    <div class="flex justify-between mb-2">
      <AddExpenseButton {categoryId} />
    </div>
    <ExpensesTable {categoryId} class="flex-1 flex flex-col border-b border-gray-200 mb-2 overflow-hidden" />
  {:else}
    <h2 class="text-2xl">טוען נתונים...</h2>
  {/if}
</div>