<script>
  import { slide } from 'svelte/transition';
  import { categories } from '../stores/categories';
  import HamburgerMenu from './HamburgerMenu.svelte';
  import LeftCarret from './svg/LeftCarret.svelte';
  import YearMonthSelector from './YearMonthSelector.svelte';

  export let segment;

  $: pages = [
    {
      name: 'עמוד הבית',
      url: '',
    },
    {
      name: 'קטגוריות',
      url: 'view',
      children: $categories
    },
    {
      name: 'סטטיסטיקות',
      url: 'statistics',
    },
    {
      name: 'אודות',
      url: 'about'
    }
  ];
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
      font-weight: 600;
      border-width: 0;
    }
  }

</style>

<nav class="relative flex items-center px-3 py-2 sm:py-0 mb-3 sm:mb-0 border-b border-gray-300">
  <ul class="hidden sm:flex items-center gap-x-3">
    {#each pages as page}
      <li class="px-2 py-1 font-light tracking-wide" class:active={segment === page.url || (!page.url && segment === undefined)}>
        <a rel="prefetch" href="/{page.url}" class="text-sm text-gray-700">{page.name}</a>
      </li>
    {/each}
  </ul>
  <HamburgerMenu 
    let:closeMenu>
    <div
      id="mobile-nav" 
      class="flex sm:hidden justify-center items-center -mx-3 bg-gray-200"
      transition:slide={{
        duration: 300
      }}>
      <ul class="flex flex-col gap-y-3">
        {#each pages as page}
          <li class="sm:px-2 sm:py-1 font-normal sm:font-light tracking-widest sm:tracking-wide">
            {#if page.children}
              <div class="flex items-center gap-x-1 -mx-3 cursor-pointer" class:active={segment === page.url} on:click={() => page.expand = !page.expand}>
                <LeftCarret class={`h-2 w-2 transition duration-300 ${page.expand && 'transform -rotate-90'}`} />
                <span class="text-xl sm:text-sm text-gray-700">{page.name}</span>
              </div>
              {#if page.expand} <!-- dynamic property -->
                <ul
                transition:slide={{
                  duration: 300
                }}>
                  {#each page.children as child}
                    <li>
                      <a rel="prefetch" href="/{page.url}/{child.id}" class="text-base text-gray-700" on:click={() => {
                        page.expand = false;
                        closeMenu();
                      }}>{child.name}</a>
                    </li>
                  {/each}
                </ul>
              {/if}
            {:else}
              <a rel="prefetch" href="/{page.url}" class="text-xl sm:text-sm text-gray-700" class:active={segment === page.url || (!page.url && segment === undefined)} on:click={closeMenu}>{page.name}</a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </HamburgerMenu>
  <YearMonthSelector class="m-auto sm:m-0 sm:mr-auto" />
</nav>