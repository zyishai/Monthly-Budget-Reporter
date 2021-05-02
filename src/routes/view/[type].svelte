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
  // import ExpenseViewStats from '../../components/ExpenseViewStats.svelte';
  import ExpensesTable from '../../components/ExpensesTable.svelte';
  import ExpensesList from '../../components/ExpensesList.svelte';
import UpdatedCategoryBudget from '../../components/UpdatedCategoryBudget.svelte';

  export let category;
  export let categoryId;
</script>

<div class="flex flex-col items-stretch flex-1 h-full px-2 overflow-hidden sm:p-4">
  {#if $category}
    <div class="flex items-center mb-2 sm:justify-between">
      <div>
        <h1 class="text-xl tracking-wide">
          <span>קטגוריה: </span>
          <strong>{$category.name}</strong>
        </h1>
        <UpdatedCategoryBudget category={$category} />
        <!-- <p class="text-sm">
          <span>רף הוצאות מקסימלי: </span>
          <strong class="tracking-wide">{$category.maxExpense} ₪</strong>
        </p> -->
      </div>
      <div class="hidden sm:block">
        <AddExpenseButton {categoryId} />
      </div>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:flex-col sm:overflow-hidden">
      <ExpensesTable {categoryId} class="flex-1 mb-2 overflow-hidden border-b border-gray-200" />
    </div>
    <div class="flex flex-col flex-1 overflow-hidden sm:hidden">
      <ExpensesList {categoryId} class="flex-1 mb-2 overflow-hidden border-b border-gray-200" />
    </div>
    <div class="flex flex-col items-stretch mb-3 sm:hidden">
      <AddExpenseButton {categoryId} />
    </div>
    <!-- <div class="mb-3">
      <ExpenseViewStats category={$category} />
    </div> -->
  {:else}
    <h2 class="text-2xl">טוען נתונים...</h2>
  {/if}
</div>