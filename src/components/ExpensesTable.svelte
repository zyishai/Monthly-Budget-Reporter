<script>
import { getContext } from 'svelte';
import { getStoreForCategory } from '../stores/expenses';
import EditExpense from './modals/EditExpense.svelte';

  const { open, close } = getContext('simple-modal');

  // Duplicate from `stores/expenses.js`!
  /**
   * @typedef {String} ID
   * @typedef {{id?: ID, item: string, cost: number, date: number, notes: string}} Expense
   * @typedef {import('svelte/store').Readable<Expense[]> & {
   *  addExpense: (expense: Expense) => ID,
   *  updateExpense: (id: ID, expense: Expense) => ID,
   *  reset: () => void
   * }} Store
   */

  export let categoryId;
  $: store = getStoreForCategory(categoryId);
  $: expenses = $store;

  const updateExpense = (expense) => () => {
    open(EditExpense, {
      expense,
      updateEntry: (updatedExpense) => {
        store.updateExpense(updatedExpense.id, updatedExpense);
        close();
      }
    });
  }
</script>

<table class="{$$props.class} min-w-full leading-normal">
  <thead>
      <tr class="flex">
          <th
              class="flex-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              פריט
          </th>
          <th
              class="flex-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              עלות
          </th>
          <th
              class="flex-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              תאריך
          </th>
          <th
              class="flex-1 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              הערות
          </th>
      </tr>
  </thead>
  <tbody class="text-center">
      {#each expenses as expense}
      <tr class="flex cursor-pointer bg-white text-gray-900 hover:bg-purple-300 hover:text-white" on:click={updateExpense(expense)}>
        <td class="flex-1 px-5 py-5 border-b border-gray-200 text-sm">
          <p>
              {expense.item}
          </p>
        </td>
        <td class="flex-1 px-5 py-5 border-b border-gray-200 text-sm">
          <p>
              {expense.cost} ₪
          </p>
        </td>
        <td class="flex-1 px-5 py-5 border-b border-gray-200 text-sm">
          <p>
              {
                new Date(expense.date).toLocaleDateString('he-IL', {
                  dateStyle: 'short',
                })
              }
          </p>
        </td>
        <td class="flex-1 px-5 py-5 border-b border-gray-200 text-sm">
          <p>
              {expense.notes}
          </p>
        </td>
    </tr>
      {/each}
  </tbody>
</table>