<script>
import AddCategoryButton from "../components/AddCategoryButton.svelte";
import CategoriesTable from "../components/CategoriesTable.svelte";

</script>
<div class="flex-1 w-2/3 py-4 px-2 mx-auto flex flex-col overflow-hidden">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-semibold tracking-wide mb-1">עריכת קטגוריות</h1>
    <AddCategoryButton />
  </div>

  <CategoriesTable class="flex-1 flex flex-col border-b border-gray-200 mb-2 overflow-hidden" />
</div>