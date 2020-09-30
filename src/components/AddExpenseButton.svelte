<script>
  import { getContext } from 'svelte';
import { getStoreForCategory } from '../stores/expenses';
import AddExpense from './modals/AddExpense.svelte';

  export let categoryId;
  $: store = getStoreForCategory(categoryId);

  const { open, close } = getContext('simple-modal');

  const addExpenseHandler = () => {
    open(AddExpense, {
      addRow: (expense) => {
        store.addExpense(expense);
        close();
      }
    })
  }
</script>

<button class="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg" on:click={addExpenseHandler}>הוסף
  הוצאה</button>