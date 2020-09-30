<script>
  import Nav from '../../components/Nav.svelte';

  export let segment;
</script>

<div class="h-screen w-full flex flex-row overflow-hidden">
  <Nav {segment} class="w-1/4 h-full py-4" />

  <slot />
</div>