import firebase from 'firebase/app';
import 'firebase/database';
import { readable } from 'svelte/store';

/**
 * @typedef {String} ID
 * @typedef {{id?: ID, item: string, cost: number}} Expense
 * @typedef {import('svelte/store').Readable<Expense[]> & {
 *  addExpense: (expense: Expense) => ID,
 *  updateExpense: (id: ID, expense: Expense) => ID,
 *  reset: () => void
 * }} Store
 */

/**
 * @param {ID} categoryId
 * @returns {Store} expense store
 */
export const getStoreForCategory = (categoryId) => {
  const db = firebase.database(firebase.app());
  const ref = db.ref(`expenses/${categoryId}`);

  const { subscribe } = readable([], (set) => {
    ref.on('value', (snapshot) => {
      const values = snapshot.val();
      if (values) {
        const expensesData = Object.keys(values).map((expenseId) => ({
          id: expenseId,
          ...values[expenseId],
        }));
        set(expensesData);
      }
    });

    return () => ref.off('value');
  });

  return {
    subscribe,
    addExpense: (expense) => {
      const { key } = ref.push(expense);
      return key;
    },
    updateExpense: (id, expense) => {
      const { item, cost } = expense;
      ref.child(id).update({ item, cost });
      return id;
    },
    reset: () => ref.remove(),
  };
};
