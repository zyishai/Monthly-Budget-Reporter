<script>
  import { menuStore } from '../stores/menu';

  $: open = $menuStore;
  const openMenu = () => menuStore.open();
  const closeMenu = () => menuStore.close();
  const toggleMenu = () => menuStore.toggle();
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
    right: 0;
    width: 70%;
    height: 2px;
    background-color: #000;
    transform-origin: left;
    transition: .3s;
  }
  #hamburger::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40%;
    height: 2px;
    background-color: #000;
    transform-origin: left;
    transition: .3s;
  }

  #hamburger.open {
    transform: rotate(45deg);
  }
  #hamburger.open::before {
    top: calc(50% - 1px);
    transform: rotate(-90deg); 
    width: 50%;
  }
  #hamburger.open::after {
    bottom: calc(-50% + 1px);
    transform: rotate(-90deg);
    width: 50%;
  }
</style>

<div id="hamburger" class="sm:hidden relative w-5 h-3 cursor-pointer" class:open on:click={toggleMenu}>
  <div></div>
</div>

{#if open}
  <slot {openMenu} {closeMenu} {toggleMenu}></slot>
{/if}