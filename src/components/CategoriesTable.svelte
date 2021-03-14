<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import { categories, deleteCategory, updateCategoryInfo } from '../stores/categories';
  import ConfirmCategoryDelete from './modals/ConfirmCategoryDelete.svelte';
  import EditCategory from './modals/EditCategory.svelte';
  import Number from './Number.svelte';
  import LeftCarret from './svg/LeftCarret.svelte';
  import Pen from './svg/Pen.svelte';
  import Trash from './svg/Trash.svelte';

  const { open, close } = getContext('simple-modal');
  const activeItem = writable(undefined);

  const updateCategory = (category) => () => {
    open(EditCategory, {
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

<table class="{$$props.class} hidden sm:contents min-w-full leading-normal overflow-hidden">
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

<div class="{$$props.class} sm:hidden min-w-full leading-normal overflow-hidden">
  <div class="sm:hidden min-w-full grid grid-flow-row divide-y divide-gray-200 overflow-y-auto">
    {#each $categories as category}
      <div class="p-2">
        <div class="flex justify-between items-center cursor-pointer" on:click={() => activeItem.set($activeItem === category.id ? undefined : category.id)}>
          <div class="flex items-center gap-x-1">
            <LeftCarret class="h-2 w-2 {category.id === $activeItem && 'transform -rotate-90'}" />
            <strong class="text-base font-medium tracking-wide">{category.name}</strong>
          </div>
          <span class="text-base">
            <Number currency='₪'>
              {category.maxExpense}
            </Number>
          </span>
        </div>
        {#if category.id === $activeItem}
          <div 
            transition:slide={{
              duration: 200
            }}>
            <div class="flex justify-end items-center gap-x-2">
              <button 
              class="flex items-center gap-x-1 px-2 py-1 bg-red-200 hover:bg-red-300 rounded"
              on:click={confirmDelete(category.id)}>
              <Trash class="w-3 h-3" />
              <span class="text-xs">מחיקה</span>
            </button>
            <button 
              class="flex items-center gap-x-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              on:click={updateCategory(category)}>
              <Pen class="w-3 h-3" />
              <span class="text-xs">עריכה</span>
            </button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>