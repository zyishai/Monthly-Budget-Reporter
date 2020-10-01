<script>
  import { stores } from '@sapper/app';
  import { categories } from '../stores/categories';
  import Pen from './svg/Pen.svelte';

  export let segment = 'home';
  const { page } = stores();
</script>

<style lang="postcss">
  .active {
    @apply border-r-4 font-medium;
    border-color: var(--categoryColor, '#000000');
    color: var(--categoryColor, '#000000');
  }
  .hoverable:hover {
    color: var(--categoryColor, '#000000');
  }
</style>

<nav class="{$$props.class} flex flex-col items-stretch px-3 overflow-hidden">
  <a rel="prefetch" href="/categories?returnUrl={$page.path}" class="self-start flex items-center gap-x-1 mb-2">
    <Pen class="h-3 w-3" />
    <span class="text-xs tracking-wide text-gray-700 hover:text-black underline">עריכת קטגוריות</span>
  </a>
  <ul class="flex-1 mb-2 overflow-y-auto">
    {#each $categories as category}
      <li class="font-light" style="--categoryColor:{category.color}" class:active="{segment === category.id}">
        <a rel="prefetch" href="view/{category.id}"
          style="--categoryColor:{category.color}"
          class="flex items-center gap-x-2 p-2 hoverable">
          <span class="text-sm tracking-wide">{category.name}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>