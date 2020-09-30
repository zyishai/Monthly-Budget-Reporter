<script>
  export let addCategory = () => {};

  let categoryName = '';
  let maxExpense = 0;
</script>

<div class="flex flex-col mr-8">
  <h1 class="text-lg mb-3">הוספת קטגוריה</h1>

  <div class="grid grid-flow-row gap-y-3 mb-3">
    <label class="flex flex-col">
      <span class="text-sm font-bold">שם הקטגוריה</span>
      <input
        type="text"
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded-lg text-gray-900"
        dir="rtl"
        bind:value={categoryName} />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-bold">הוצאה מקסימלית</span>
      <input
        type="text"
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded-lg text-gray-900"
        dir="rtl"
        bind:value={maxExpense} />
    </label>
  </div>
  <button
    class="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-3 py-2 self-end"
    on:click={() => addCategory({
        name: categoryName,
        maxExpense,
      })}>הוסף קטגוריה</button>
</div>
