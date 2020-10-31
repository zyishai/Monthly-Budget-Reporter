<script>
import { onMount } from "svelte";

  export let addRow = () => {};

  /**
   * @type {HTMLInputElement | undefined}
   */
  let itemNameInput;

  onMount(() => {
    itemNameInput && itemNameInput.focus();
  });

  let item = '';
  let cost = 0;
  let notes = '';
  let date = new Date().toLocaleDateString('en-CA'); // also: new Date().toISOString().slice(0, 10)
  const onSubmit = (e) => {
    e.preventDefault();
    addRow({ item, cost, notes, date });
  }
</script>

<div class="flex flex-col mr-8">
  <h1 class="text-lg mb-3">הוספת פריט</h1>

  <form on:submit={onSubmit}>
    <div class="grid grid-flow-row gap-y-3 mb-3">
      <label class="flex flex-col">
        <span class="text-sm font-medium">שם הפריט</span>
        <input
          type="text"
          class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded text-gray-900"
          dir="rtl"
          bind:value={item}
          bind:this={itemNameInput}
          required={true} />
      </label>
      <label class="flex flex-col">
        <span class="text-sm font-medium">עלות הפריט</span>
        <input
          type="number"
          class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded text-gray-900"
          dir="rtl"
          bind:value={cost}
          required={true}
          step="any" />
      </label>
      <label class="flex flex-col">
        <span class="text-sm font-medium">תאריך תשלום</span>
        <input
          type="date"
          class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded text-gray-900"
          dir="rtl"
          bind:value={date}
          required={true} />
      </label>
      <label class="flex flex-col">
        <span class="text-sm font-medium">הערות</span>
        <textarea
          class="px-3 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 rounded text-gray-900"
          dir="rtl"
          bind:value={notes}></textarea>
      </label>
    </div>
    <button
      class="tracking-wide px-3 py-1 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded self-end"
      type="submit">שמירת פריט</button>
  </form>
</div>
