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
  import ExpenseViewStats from '../../components/ExpenseViewStats.svelte';
  import ExpensesTable from '../../components/ExpensesTable.svelte';

  export let category;
  export let categoryId;
</script>

<div class="flex-1 h-full flex flex-col items-stretch p-4 overflow-hidden">
  {#if $category}
    <div class="flex justify-between items-center mb-2">
      <div>
        <h1 class="text-xl tracking-wide">
          <span>קטגוריה: </span>
          <strong>{$category.name}</strong>
        </h1>
        <p class="text-sm">
          <span>רף הוצאות מקסימלי: </span>
          <strong class="tracking-wide">{$category.maxExpense} ₪</strong>
        </p>
      </div>
      <AddExpenseButton {categoryId} />
    </div>
    <ExpensesTable {categoryId} class="flex-1 flex flex-col border-b border-gray-200 mb-2 overflow-hidden" />
    <ExpenseViewStats category={$category} />
  {:else}
    <h2 class="text-2xl">טוען נתונים...</h2>
  {/if}
</div>