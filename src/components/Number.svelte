<script>
	import { beforeUpdate } from 'svelte';
	
	export let currency;
	export let precision = 2;
	
	let valueNode;
	let renderedValue = 0;
	
	beforeUpdate(() => {
		if (valueNode) {
			const value = +valueNode.textContent;
			renderedValue = !Number.isInteger(value) ? value.toFixed(precision) : value;
		}
	});
</script>

<span class="hidden" bind:this={valueNode}>
	<slot />
</span>
<span>
	{renderedValue}
</span>
{#if currency}
	{currency}
{/if}