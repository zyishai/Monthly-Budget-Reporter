<script>
  import { onMount } from 'svelte';

  export let updateCategory = () => {};
  export let category;

  /**
   * @type {HTMLInputElement | undefined}
   */
   let categoryNameInput;

  onMount(() => {
    categoryNameInput && categoryNameInput.focus();
  });

  let name = category.name;
  let maxExpense = category.maxExpense;
</script>

<div class="flex flex-col mr-8">
  <h1 class="text-lg mb-3">עריכת קטגוריה</h1>

  <div class="grid grid-flow-row gap-y-3 mb-3">
    <label class="flex flex-col">
      <span class="text-sm font-medium">שם הקטגוריה</span>
      <input
        type="text"
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded text-gray-900"
        dir="rtl"
        bind:value={name}
        bind:this="{categoryNameInput}" />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-medium">הוצאה מקסימלית</span>
      <input
        type="text"
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded text-gray-900"
        dir="rtl"
        bind:value={maxExpense} />
    </label>
  </div>
  <button
    class="tracking-wide px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded self-end"
    on:click={() => updateCategory({
        id: category.id,
        name,
        maxExpense,
      })}>עדכון פרטי קטגוריה</button>
</div>
