import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(false);
export const menuStore = {
  subscribe,
  open() {
    set(true);
  },
  close() {
    set(false);
  },
  toggle() {
    update((prevState) => !prevState);
  },
};
