<script>
  import { getContext } from 'svelte';
  import { categories, deleteCategory, updateCategoryInfo } from '../stores/categories';
import ConfirmCategoryDelete from './modals/ConfirmCategoryDelete.svelte';
  import UpdateCategory from './modals/UpdateCategory.svelte';
  import Pen from './svg/Pen.svelte';
  import Trash from './svg/Trash.svelte';

  const { open, close } = getContext('simple-modal');

  const updateCategory = (category) => () => {
    open(UpdateCategory, {
      category,
      updateCategory: (updatedCategory) => {
        updateCategoryInfo(updatedCategory.id, updatedCategory);
        close();
      }
    }, {
      styleWindow: {
        borderRadius: '0.258rem'
      }
    });
  }

  const confirmDelete = (categoryId) => () => {
    open(ConfirmCategoryDelete, {
      onConfirm: () => {
        deleteCategory(categoryId);
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
              קטגוריה
          </th>
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              מקסימום הוצאה
          </th>
          <th
              class="flex-1 px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              פעולות
          </th>
      </tr>
  </thead>
  <tbody class="text-center divide-y divide-gray-300 overflow-auto">
      {#each $categories as category}
      <tr class="flex bg-white text-gray-900">
        <td class="flex-1 px-5 py-5 text-sm">
          <p>
              {category.name}
          </p>
        </td>
        <td class="flex-1 px-5 py-5 text-sm">
          <p>
              {category.maxExpense} ₪
          </p>
        </td>
        <td class="flex-1 px-5 py-5 text-sm">
          <div class="flex items-center gap-x-2">
            <button 
              class="flex items-center gap-x-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              on:click={updateCategory(category)}>
              <Pen class="w-3 h-3" />
              <span class="text-xs">עריכה</span>
            </button>
            <button 
              class="flex items-center gap-x-1 px-2 py-1 bg-red-200 hover:bg-red-300 rounded"
              on:click={confirmDelete(category.id)}>
              <Trash class="w-3 h-3" />
              <span class="text-xs">מחיקה</span>
            </button>
          </div>
        </td>
    </tr>
      {/each}
  </tbody>
</table>