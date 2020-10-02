import { derived } from 'svelte/store';
import { getStoreForCategory } from './expenses';

/**
 * @param {import("./categories").Category} category
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
