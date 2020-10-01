import firebase from 'firebase/app';
import 'firebase/database';
import { derived, readable } from 'svelte/store';

/**
 * @param {firebase.database.Reference} ref
 * @param {Expense} expense
 * @returns {firebase.database.Reference}
 */
const getRefForItem = (ref, expense) => {
  const { id, date } = expense;
  const expenseDate = new Date(date);
  const month = (expenseDate.getMonth() + 1).toString();
  const year = expenseDate.getFullYear().toString();
  return ref.child(year).child(month).child(id).ref;
};
/**
 * @typedef {String} ID
 * @typedef {{id?: ID, item: string, cost: number, date: number, notes: string}} Expense
 * @typedef {import('svelte/store').Readable<Expense[]> & {
 *  addExpense: (expense: Expense) => ID,
 *  updateExpense: (id: ID, expense: Expense) => ID,
 *  deleteExpense: (expense: Expense) => void,
 *  reset: () => void,
 *  totalExpenses: import('svelte/store').Readable<number>
 * }} Store
 */

/**
 * @param {ID} categoryId
 * @returns {Store} expense store
 */
export const getStoreForCategory = (categoryId) => {
  const db = firebase.database(firebase.app());
  const today = new Date();
  const month = (today.getMonth() + 1).toString();
  const year = today.getFullYear().toString();
  const ref = db.ref(`expenses/${categoryId}`);

  /**
   * @type {import('svelte/store').Readable<Expense[]>}
   */
  const store = readable([], (set) => {
    ref
      .child(year)
      .child(month)
      .on('value', (snapshot) => {
        const values = snapshot.val();
        if (values) {
          const expensesData = Object.keys(values).map((expenseId) => ({
            id: expenseId,
            ...values[expenseId],
          }));
          set(expensesData);
        } else {
          set([]);
        }
      });

    return () => ref.off('value');
  });

  return {
    subscribe: store.subscribe,
    addExpense: (expense) => {
      const today = new Date(expense.date);
      const month = (today.getMonth() + 1).toString();
      const year = today.getFullYear().toString();

      const { key } = ref.child(year).child(month).push(expense);
      return key;
    },
    updateExpense: (id, expense) => {
      const { item, cost } = expense;
      const expenseRef = getRefForItem(ref, expense);
      expenseRef.update({
        item,
        cost,
        date: expense.date,
        notes: expense.notes,
      });
      return id;
    },
    deleteExpense: (expense) => {
      const expenseRef = getRefForItem(ref, expense);
      expenseRef.remove();
    },
    reset: () => ref.remove(),
    totalExpenses: derived(store, ($expenses) =>
      $expenses.reduce((sum, expense) => sum + expense.cost, 0),
    ),
  };
};
