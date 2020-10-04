import { BehaviorSubject } from 'rxjs';
import { derived } from 'svelte/store';
import { categories } from './categories';
import { getStoreForCategory } from './expenses';

/**
 * @typedef {{ total: number, diff: number, category: import('./categories').Category }} Stat
 * @param {import("./categories").Category} category
 * @returns {import('svelte/store').Readable<Stat>}
 */
export const getStatsForCategory = (category) => {
  const categoryExpenseStore = getStoreForCategory(category.id);

  return derived(categoryExpenseStore, ($expenses) => {
    const total = $expenses.reduce((sum, expense) => sum + expense.cost, 0);
    const diff = category.maxExpense - total;

    return {
      category,
      total,
      diff,
    };
  });
};

export const getMonthlyStats = () => {
  const store = new BehaviorSubject({
    /**
     * @type {Array<import('./categories').Category & {diff: number, total: number}>}
     */
    categories: [],
    total: 0,
    diff: 0,
  });

  derived(categories, ($categories) => {
    /**
     * @type {import('svelte/store').Readable<Stat>[]}
     */
    const categoriesStats = $categories.map((category) =>
      getStatsForCategory(category),
    );

    // @ts-ignore
    return derived(categoriesStats, ($stats) =>
      $stats.reduce(
        (acc, stat) => ({
          categories: [
            ...acc.categories,
            {
              ...stat.category,
              total: stat.total,
              diff: stat.diff,
            },
          ],
          total: acc.total + stat.total,
          diff: acc.diff + stat.diff,
        }),
        {
          categories: [],
          total: 0,
          diff: 0,
        },
      ),
    );
  }).subscribe(($store) => $store.subscribe((stat) => store.next(stat)));

  return store.asObservable();
};
