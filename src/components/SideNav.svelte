<script>
  import { categories } from '../stores/categories';
import Pen from './svg/Pen.svelte';

  export let segment = 'home';
</script>

<style lang="postcss">
  .active {
    @apply border-r-4 border-purple-400 text-purple-400 font-medium;
  }
</style>

<nav class="{$$props.class} flex flex-col items-stretch px-3 overflow-hidden">
  <a rel="prefetch" href="/categories" class="self-start flex items-center gap-x-1 mb-2">
    <Pen class="h-3 w-3" />
    <span class="text-xs tracking-wide text-gray-700 hover:text-black underline">עריכת קטגוריות</span>
  </a>
  <ul class="flex-1 mb-2 overflow-y-auto">
    {#each $categories as category}
      <li class="font-light" class:active="{segment === category.id}">
        <a rel="prefetch" href="view/{category.id}"
          class="flex items-center gap-x-2 p-2 hover:text-purple-400">
          <span class="text-sm tracking-wide">{category.name}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>