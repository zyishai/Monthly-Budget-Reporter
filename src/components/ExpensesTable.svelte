<script>
  import { getContext } from 'svelte';
  import { getStoreForCategory } from '../stores/expenses';
  import EditExpense from './modals/EditExpense.svelte';
  import ConfirmExpenseDelete from './modals/ConfirmExpenseDelete.svelte';
  import Pen from './svg/Pen.svelte';
  import Trash from './svg/Trash.svelte';

  const { open, close } = getContext('simple-modal');

  // Duplicate from `stores/expenses.js`!
  /**
   * @typedef {String} ID
   * @typedef {{id?: ID, item: string, cost: number, date: number, notes: string}} Expense
   * @typedef {import('svelte/store').Readable<Expense[]> & {
   *  addExpense: (expense: Expense) => ID,
   *  updateExpense: (id: ID, expense: Expense) => ID,
   *  deleteExpense: (expense: Expense) => void,
   *  reset: () => void
   * }} Store
   */

  export let categoryId;
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

<table class="{$$props.class} min-w-full leading-normal overflow-hidden">
  <thead class="bg-gray-200 border-b-2 border-gray-300">
      <tr class="flex">
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              פריט
          </th>
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              עלות
          </th>
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              תאריך
          </th>
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              הערות
          </th>
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              פעולות
          </th>
      </tr>
  </thead>
  <tbody class="text-center divide-y divide-gray-300 overflow-auto">
    {#if expenses}
    {#each expenses as expense}
      <tr class="flex bg-white text-gray-900">
        <td class="flex-1 px-5 py-5 text-sm">
          <p>
            {expense.item}
          </p>
        </td>
        <td class="flex-1 px-5 py-5 text-sm">
          <p>
            {expense.cost} ₪
          </p>
        </td>
        <td class="flex-1 px-5 py-5 text-sm">
          <p>
            {
              new Date(expense.date).toLocaleDateString('he-IL', {
                dateStyle: 'short',
              })
            }
          </p>
        </td>
        <td class="flex-1 px-5 py-5 text-sm">
          <p>
            {expense.notes}
          </p>
        </td>
        <td class="flex-1 px-5 py-5 text-sm">
          <div class="flex items-center gap-x-2">
            <button 
              class="flex items-center gap-x-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              on:click={updateExpense(expense)}>
              <Pen class="w-3 h-3" />
              <span class="text-xs">עריכה</span>
            </button>
            <button 
              class="flex items-center gap-x-1 px-2 py-1 bg-red-200 hover:bg-red-300 rounded"
              on:click={confirmDelete(expense)}>
              <Trash class="w-3 h-3" />
              <span class="text-xs">מחיקה</span>
            </button>
          </div>
        </td>
    </tr>
      {/each}
      {/if}
  </tbody>
</table>