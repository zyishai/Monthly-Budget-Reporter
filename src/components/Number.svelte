<script>
	import { afterUpdate } from 'svelte';
	
	export let currency;
	export let precision = 2;
	export let positiveSign = '';
	
	let valueNode;
	let renderedValue = 0;
	
	afterUpdate(() => {
		if (valueNode) {
			const value = +valueNode.textContent;
			renderedValue = !Number.isInteger(value) ? value.toFixed(precision) : value;
			if (renderedValue >= 0) {
				renderedValue = `${positiveSign}${renderedValue}`;
			}
		}
	});
</script>

<span class="hidden" bind:this={valueNode}>
	<slot />
</span>
<span dir="ltr">
	{renderedValue}
</span>
{#if currency}
	{currency}
{/if}