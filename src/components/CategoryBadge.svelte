<script>
  export let onClick = () => {};
  export let meta = {};

  function badgeClickHandler() {
    onClick(meta);
  }
</script>

<div 
  class="{$$props.class} badge inline-block px-2 py-1 border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
  on:click="{badgeClickHandler}">
  <span class="text-xs tracking-wider">
    <slot></slot>
  </span>
</div>