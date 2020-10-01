<script>
  import SideNav from '../../components/SideNav.svelte';

  export let segment;
</script>

<div class="flex-1 flex flex-row overflow-hidden">
  <SideNav {segment} class="w-1/4 h-full py-4" />

  <slot />
</div>