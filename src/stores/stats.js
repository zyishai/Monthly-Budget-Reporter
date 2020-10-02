import { derived, get, readable } from 'svelte/store';
import { categories } from './categories';
import { getStoreForCategory } from './expenses';

/**
 * @typedef {{ total: number, diff: number }} Stat
 * @param {import("./categories").Category} category
 * @returns {import('svelte/store').Readable<Stat>}
 */
export const getStatsForCategory = (category) => {
  const categoryExpenseStore = getStoreForCategory(category.id);

  return derived(categoryExpenseStore, ($expenses) => {
    const total = $expenses.reduce((sum, expense) => sum + expense.cost, 0);
    const diff = category.maxExpense - total;

    return {
      total,
      diff,
    };
  });
};

/**
 * @returns {import('svelte/store').Readable<Stat>}
 */
export const getMonthlyStats = () => {
  /**
   * @type {import('./categories').Category[]}
   */
  const $categories = get(categories);
  const categoriesStats = $categories.map((category) =>
    getStatsForCategory(category),
  );

  if (categoriesStats.length) {
    // @ts-ignore
    return derived(categoriesStats, ($stats) =>
      $stats.reduce((acc, stat) => ({
        total: acc.total + stat.total,
        diff: acc.diff + stat.diff,
      })),
    );
  } else {
    return readable(
      {
        total: 0,
        diff: 0,
      },
      () => {},
    );
  }
};
