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
    })
  }
</script>

<button class="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg" on:click={addCategoryHandler}>הוסף
  קטגוריה</button>