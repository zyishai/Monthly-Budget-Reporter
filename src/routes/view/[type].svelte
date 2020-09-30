<script context="module">
  import firebase from 'firebase/app';
import 'firebase/database';
  export async function preload(page) {
    const { type: categoryUrl } = page.params;

    const db = firebase.database(firebase.app());
    const ref = db.ref(`categories/${categoryUrl}`);
    const category = await ref.once('value').then(snapshot => snapshot.val());

    return { category };
  }
</script>

<script>
  export let category;
</script>

<div class="flex-1 flex flex-col items-center p-4 overflow-hidden">
  {#if category}
    <h1 class="text-2xl font-semibold tracking-wide">{category.name}</h1>
    <h3 class="text-lg tracking-wide mb-5">
      <span class="text-gray-700">הוצאה מקסימלית חודשית:</span> {category.maxExpense} ₪
    </h3>
  {/if}
</div>