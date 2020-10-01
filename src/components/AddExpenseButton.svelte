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
    }, {
      styleWindow: {
        borderRadius: '0.258rem'
      }
    });
  }
</script>

<button class="{$$props.class} text-xs tracking-wide px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-sm" on:click={addExpenseHandler}>הוסף
  הוצאה</button>