<script>
  export let open = false;

  const openMenu = () => open = true;
  const closeMenu = () => open = false;
  const toggleMenu = () => open = !open;
</script>

<style lang="postcss">
  #hamburger {
    transition: .3s;
  }

  #hamburger div {
    position: absolute;
    top: calc(50% - 1px);
    height: 2px;
    width: 100%;
    background-color: #000;
  }

  #hamburger::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 2px;
    background-color: #000;
    transform-origin: right;
    transition: .3s;
  }
  #hamburger::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40%;
    height: 2px;
    background-color: #000;
    transform-origin: right;
    transition: .3s;
  }

  #hamburger.open {
    transform: rotate(45deg);
  }
  #hamburger.open::before {
    top: calc(-50% + 1px);
    transform: rotate(-90deg); 
    width: 50%;
  }
  #hamburger.open::after {
    bottom: calc(50% - 1px);
    transform: rotate(-90deg);
    width: 50%;
  }
</style>

<div id="hamburger" class="sm:hidden relative mr-auto w-5 h-3 cursor-pointer" class:open on:click={toggleMenu}>
  <div></div>
</div>

{#if open}
  <slot {openMenu} {closeMenu} {toggleMenu}></slot>
{/if}