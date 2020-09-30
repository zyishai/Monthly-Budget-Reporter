<script>
  export let addRow = () => {};

  let item = '';
  let cost = 0;
  let notes = '';
</script>

<div class="flex flex-col mr-8">
  <h1 class="text-lg mb-3">הוספת הוצאה</h1>

  <div class="grid grid-flow-row gap-y-3 mb-3">
    <label class="flex flex-col">
      <span class="text-sm font-bold">שם הפריט</span>
      <input
        type="text"
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded-lg text-gray-900"
        dir="rtl"
        bind:value={item} />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-bold">עלות הפריט</span>
      <input
        type="number"
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded-lg text-gray-900"
        dir="rtl"
        bind:value={cost} />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-bold">הערות</span>
      <textarea
        class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded-lg text-gray-900"
        dir="rtl"
        bind:value={notes}></textarea>
    </label>
  </div>
  <button
    class="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-3 py-2 self-end"
    on:click={() => addRow({ item, cost, notes })}>הוסף הוצאה רשומה</button>
</div>
