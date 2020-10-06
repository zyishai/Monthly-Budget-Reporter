<script>
  import SideNav from '../../components/SideNav.svelte';

  export let segment;
</script>

<svelte:head>
	<title>ניהול תקציב חודשי | הוצאות</title>
</svelte:head>

<div class="flex-1 flex flex-row overflow-hidden">
  <SideNav {segment} class="w-1/4 h-full py-4" />

  <slot />
</div>