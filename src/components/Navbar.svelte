<script>
  import { slide } from 'svelte/transition';
  import HamburgerMenu from './HamburgerMenu.svelte';
  export let segment;

  const pages = [
    {
      title: 'עמוד הבית',
      url: '',
    },
    {
      title: 'קטגוריות',
      url: 'view',
    },
    {
      title: 'סטטיסטיקות',
      url: 'statistics',
    },
  ];

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

  @media screen and (max-width: 640px) {
    nav > #mobile-nav {
      position: absolute;
      top: calc(100% + 2px);
      height: calc(100vh - 100% - 2px);
      width: 100%;
      background-color: #fff;
      z-index: 1000;
    }
    
    .active {
      @apply border-b-0 font-semibold;
    }
  }

</style>

<nav class="relative flex items-center px-3 py-2 sm:py-0 mb-3 sm:mb-0 border-b border-gray-300">
  <ul class="hidden sm:flex items-center gap-x-3">
    {#each pages as page}
      <li class="px-2 py-1 font-light tracking-wide" class:active={segment === page.url || (!page.url && segment === undefined)}>
        <a rel="prefetch" href="/{page.url}" class="text-sm text-gray-700">{page.title}</a>
      </li>
    {/each}
  </ul>
  <div class="flex items-center mr-auto">
    <span class="font-bold tracking-wide">{hebMonthName} {year}</span>
  </div>
  <HamburgerMenu 
    let:closeMenu>
    <ul 
      id="mobile-nav" 
      class="flex sm:hidden flex-col justify-center items-center gap-y-3 -mx-3 bg-gray-200"
      transition:slide={{
        duration: 300
      }}>
      {#each pages as page}
        <li class="sm:px-2 sm:py-1 font-normal sm:font-light tracking-widest sm:tracking-wide" class:active={segment === page.url || (!page.url && segment === undefined)}>
          <a rel="prefetch" href="/{page.url}" class="text-xl sm:text-sm text-gray-700" on:click={closeMenu}>{page.title}</a>
        </li>
      {/each}
    </ul>
  </HamburgerMenu>
</nav>