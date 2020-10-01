<script>
  export let onConfirm = () => {};
  export let onCancel = () => {};
</script>

<div class="flex flex-col mr-8">
  <h1 class="text-lg mb-3">האם הנך בטוח?</h1>
  <p>לא ניתן לשחזר את הקטגוריה לאחר המחיקה.</p>

  <div class="flex justify-end gap-x-2">
    <button
      class="tracking-wide px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      on:click="{onCancel}">
      ביטול
    </button>
    <button
      class="tracking-wide px-3 py-1 bg-red-200 hover:bg-red-300 rounded"
      on:click="{onConfirm}">
      מחיקת קטגוריה
    </button>
  </div>
</div>
