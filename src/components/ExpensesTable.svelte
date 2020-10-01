<script>
  import { getContext } from 'svelte';
  import { getStoreForCategory } from '../stores/expenses';
  import EditOrDeleteExpense from './modals/EditOrDeleteExpense.svelte';
  const { open, close } = getContext('simple-modal');

  // Duplicate from `stores/expenses.js`!
  /**
   * @typedef {String} ID
   * @typedef {{id?: ID, item: string, cost: number, date: number, notes: string}} Expense
   * @typedef {import('svelte/store').Readable<Expense[]> & {
   *  addExpense: (expense: Expense) => ID,
   *  updateExpense: (id: ID, expense: Expense) => ID,
   *  deleteExpense: (id: ID) => void,
   *  reset: () => void
   * }} Store
   */

  export let categoryId;
  let store, expenses = [];
  $: store = getStoreForCategory(categoryId);
  $: expenses = $store;

  const updateOrDeleteExpense = (expense) => () => {
    open(EditOrDeleteExpense, {
      expense,
      updateEntry: (updatedExpense) => {
        store.updateExpense(updatedExpense.id, updatedExpense);
        close();
      },
      deleteEntry: () => {
        store.deleteExpense(expense.id);
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
      </tr>
  </thead>
  <tbody class="text-center divide-y divide-gray-300 overflow-auto">
    {#if expenses}
      {#each expenses as expense}
      <tr class="flex cursor-pointer bg-white text-gray-900 hover:bg-gray-100" on:click={updateOrDeleteExpense(expense)}>
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
    </tr>
      {/each}
    {/if}
  </tbody>
</table>