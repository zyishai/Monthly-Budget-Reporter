<script>
  import { stores } from '@sapper/app';
  import AddCategoryButton from "../components/AddCategoryButton.svelte";
  import CategoriesTable from "../components/CategoriesTable.svelte";
  import RightArrow from "../components/svg/RightArrow.svelte";

  const { page } = stores();
  let returnUrl = '/view';
  $: returnUrl = $page.query.returnUrl ?? returnUrl;
</script>

<svelte:head>
	<title>ניהול תקציב חודשי | קטגוריות</title>
</svelte:head>

<div class="flex-1 min-w-full sm:min-w-0 sm:w-2/3 py-2 sm:py-4 px-3 sm:px-2 mx-auto flex flex-col overflow-hidden">
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-x-2">
      <a rel="prefetch" href="{returnUrl}" class="hidden sm:inline-block">
        <RightArrow class="h-5 w-5 -mt-1" />
      </a>
      <h1 class="text-xl sm:text-2xl font-semibold tracking-wide mb-1">עריכת קטגוריות</h1>
    </div>
    <AddCategoryButton class="hidden sm:inline-block" />
  </div>

  <CategoriesTable class="flex-1 flex flex-col border-b border-gray-200 mb-2 overflow-hidden" />
  <AddCategoryButton class="sm:hidden inline-block items-stretch mb-3" />
</div>