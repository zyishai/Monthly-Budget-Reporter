<script context="module">
  export async function preload(page) {
    const { type } = page.params;

    return { type };
  }
</script>
<script>
  export let type;
</script>

<div class="flex-1">
  {type}
</div>