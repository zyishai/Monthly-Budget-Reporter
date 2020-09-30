<script>
  import { getStoreForCategory } from '../stores/expenses';


  // Duplicate from `stores/expenses.js`!
  /**
   * @typedef {String} ID
   * @typedef {{id?: ID, item: string, cost: number}} Expense
   * @typedef {import('svelte/store').Readable<Expense[]> & {
   *  addExpense: (expense: Expense) => ID,
   *  updateExpense: (id: ID, expense: Expense) => ID,
   *  reset: () => void
   * }} Store
   */

  export let categoryId;
  $: store = getStoreForCategory(categoryId);
  $: expenses = $store;
  $: console.log(expenses);
</script>

<table class="min-w-full leading-normal">
  <thead>
      <tr>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              פריט
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              עלות
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              תאריך
          </th>
          <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              הערות
          </th>
      </tr>
  </thead>
  <tbody class="text-center">
      {#each expenses as expense}
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
              {expense.item}
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
              {expense.cost} ₪
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
          </p>
        </td>
    </tr>
      {/each}
  </tbody>
</table>