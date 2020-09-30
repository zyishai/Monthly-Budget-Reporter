<script>
  import { categories } from '../stores/categories';
import AddCategoryButton from './AddCategoryButton.svelte';
import LeftArrow from './svg/LeftArrow.svelte';

export let segment = 'home';
</script>

<style>
  .active {
    @apply bg-purple-400 text-white rounded-lg;
  }
</style>

<nav class="{$$props.class} flex flex-col items-stretch px-3">
  <h1 class="text-lg font-semibold">קטגוריות</h1>
  <ul class="flex-1">
    {#each $categories as category}
      <li>
        <a rel="prefetch" href="{category.noView ? category.url : `view/${category.id}`}" 
          class="flex items-center gap-x-2 p-2 hover:text-purple-400 {segment === category.id ? 'active' : ''}">
          <LeftArrow class="h-2 w-2 overflow-hidden" />
          <span>{category.name}</span>
        </a>
      </li>
    {/each}
  </ul>
  <AddCategoryButton />
</nav>