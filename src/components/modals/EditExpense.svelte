<script>
  import { onMount } from 'svelte';

  export let expense;
  export let updateEntry = () => {};

  /**
   * @type {HTMLInputElement | undefined}
   */
   let itemNameInput;

  onMount(() => {
    itemNameInput && itemNameInput.focus();
  });

  let item = expense.item;
  let cost = expense.cost;
  let notes = expense.notes;
  let date = new Date(expense.date).toLocaleDateString('en-CA');
</script>

<div class="flex flex-col mr-8">
  <h1 class="text-lg mb-3">עריכת פריט</h1>

  <div class="grid grid-flow-row gap-y-3 mb-3">
    <label class="flex flex-col">
      <span class="text-sm font-medium">שם הפריט</span>
      <input
        type="text"
        class="px-3 py-2 bg-gray-200 focus:bg-gray-300 rounded text-gray-900"
        dir="rtl"
        bind:value={item}
        bind:this="{itemNameInput}" />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-medium">עלות הפריט</span>
      <input
        type="number"
        class="px-3 py-2 bg-gray-200 focus:bg-gray-300 rounded text-gray-900"
        dir="rtl"
        bind:value={cost}
        step="any" />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-medium">תאריך תשלום</span>
      <input
        type="date"
        class="px-3 py-2 bg-gray-200 focus:bg-gray-300 rounded text-gray-900"
        dir="rtl"
        bind:value={date} />
    </label>
    <label class="flex flex-col">
      <span class="text-sm font-medium">הערות</span>
      <textarea
        class="px-3 py-2 bg-gray-200 focus:bg-gray-300 rounded text-gray-900"
        dir="rtl"
        bind:value={notes}></textarea>
    </label>
  </div>
  <button
    class="tracking-wide px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded self-end"
    on:click={() => updateEntry({ id: expense.id, item, cost, date: date, notes })}>עדכון פרטי פריט</button>
</div>
