import { writable } from 'svelte/store';

const today = new Date();
const { subscribe, set, update } = writable({
  year: today.getFullYear(),
  month: today.getMonth() + 1,
});

export const dateview = {
  subscribe,
  /**
   * @param {number} year
   */
  changeYear: (year) => {
    update(({ month }) => ({ month, year }));
  },
  /**
   * @param {number} month
   */
  changeMonth: (month) => {
    update(({ year }) => ({ month, year }));
  },
  reset: () => {
    const today = new Date();
    set({ year: today.getFullYear(), month: today.getMonth() + 1 });
  },
};
