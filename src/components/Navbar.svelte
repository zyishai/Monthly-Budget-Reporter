<script>
  export let segment;

  const months = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר'
  ];
  const hebMonthName = months[new Date().getMonth()];
  const year = new Date().getFullYear();
</script>

<style lang="postcss">
  .active {
    @apply border-b-2 border-purple-400 font-medium;
  }
</style>

<nav class="flex justify-between border-b border-gray-300">
  <ul class="flex items-center gap-x-3 px-3">
    <li class="px-2 py-1 font-light tracking-wide" class:active="{segment === undefined}">
      <a rel="prefetch" href="/" class="text-sm text-gray-700">עמוד הבית</a>
    </li>
    <li class="px-2 py-1 font-light tracking-wide" class:active="{segment === 'view' || segment === 'categories'}">
      <a rel="prefetch" href="/view" class="text-sm text-gray-700">קטגוריות</a>
    </li>
    <li class="px-2 py-1 font-light tracking-wide" class:active="{segment === 'statistics'}">
      <a rel="prefetch" href="/statistics" class="text-sm text-gray-700">סטטיסטיקות</a>
    </li>
  </ul>
  <div class="flex items-center px-3">
    <span class="font-bold tracking-wide">{hebMonthName} {year}</span>
  </div>
</nav>