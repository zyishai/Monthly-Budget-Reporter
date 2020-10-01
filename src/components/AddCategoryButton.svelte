<script>
  import { getContext } from 'svelte';
  import { addCategory } from '../stores/categories';
  import AddCategory from './modals/AddCategory.svelte';

  const { open, close } = getContext('simple-modal');

  const addCategoryHandler = () => {
    open(AddCategory, {
      addCategory: (category) => {
        addCategory(category);
        close();
      }
    }, {
      styleWindow: {
        borderRadius: '0.258rem'
      }
    });
  }
</script>

<button class="{$$props.class} text-xs tracking-wide px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-sm" on:click={addCategoryHandler}>הוסף
  קטגוריה</button>