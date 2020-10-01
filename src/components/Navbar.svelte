<script>
  export let segment;
</script>

<style lang="postcss">
  .active {
    @apply border-b-2 border-purple-400 font-medium;
  }
</style>

<nav class="border-b border-gray-300">
  <ul class="flex items-center gap-x-3 px-3">
    <li class="px-2 py-1 font-light tracking-wide" class:active="{segment === undefined}">
      <a rel="prefetch" href="/" class="text-sm text-gray-700">עמוד הבית</a>
    </li>
    <li class="px-2 py-1 font-light tracking-wide" class:active="{segment === 'view' || segment === 'categories'}">
      <a rel="prefetch" href="/view" class="text-sm text-gray-700">קטגוריות</a>
    </li>
    <li class="px-2 py-1 font-light tracking-wide">
      <a rel="prefetch" href="/" class="text-sm text-gray-700">סטטיסטיקות</a>
    </li>
  </ul>
</nav>