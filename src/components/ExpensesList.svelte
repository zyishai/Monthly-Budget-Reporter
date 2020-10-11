<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import { getStoreForCategory } from '../stores/expenses';
  import EditExpense from './modals/EditExpense.svelte';
  import ConfirmExpenseDelete from './modals/ConfirmExpenseDelete.svelte';
  import Pen from './svg/Pen.svelte';
  import Trash from './svg/Trash.svelte';
  import Number from './Number.svelte';
  import LeftCarret from './svg/LeftCarret.svelte';

  const { open, close } = getContext('simple-modal');

  export let categoryId;
  /**
   * @type {import('../stores/expenses').Store} store
   * @type {import('../stores/expenses').Expense[]} expenses
   */
  let store, expenses = [];
  $: store = getStoreForCategory(categoryId);
  $: expenses = $store;

  const updateExpense = (expense) => () => {
    open(EditExpense, {
      expense,
      updateEntry: (updatedExpense) => {
        store.updateExpense(updatedExpense.id, updatedExpense);
        close();
      }
    }, {
      styleWindow: {
        borderRadius: '0.258rem'
      }
    });
  }

  const confirmDelete = (expense) => () => {
    open(ConfirmExpenseDelete, {
      onConfirm: () => {
        store.deleteExpense(expense);
        close();
      },
      onCancel: () => {
        close();
      }
    }, {
      styleWindow: {
        borderRadius: '0.258rem'
      }
    });
  }
</script>

<div class="{$$props.class} flex flex-col">
  {#if expenses}
    <div class="sm:hidden grid grid-flow-row divide-y divide-gray-200 overflow-y-auto">
      {#each expenses as expense}
        <div class="p-2">
          <div class="flex justify-between items-center cursor-pointer" on:click={() => expense.open = !expense.open}>
            <div class="flex items-center gap-x-1">
              <LeftCarret class="h-2 w-2 {expense.open && 'transform -rotate-90'}" />
              <strong class="text-base font-medium tracking-wide">{expense.item}</strong>
            </div>
            <span class="text-base">
              <Number currency='₪'>
                {expense.cost}
              </Number>
            </span>
          </div>
          {#if expense.open}
            <div 
              transition:slide={{
                duration: 200
              }}>
              <p class="text-sm">{expense.notes}</p>
              <div class="flex justify-end items-center gap-x-2">
                <button 
                class="flex items-center gap-x-1 px-2 py-1 bg-red-200 hover:bg-red-300 rounded"
                on:click={confirmDelete(expense)}>
                <Trash class="w-3 h-3" />
                <span class="text-xs">מחיקה</span>
              </button>
              <button 
                class="flex items-center gap-x-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                on:click={updateExpense(expense)}>
                <Pen class="w-3 h-3" />
                <span class="text-xs">עריכה</span>
              </button>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>