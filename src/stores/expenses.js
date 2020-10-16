import firebase from 'firebase/app';
import 'firebase/database';
import { get, readable } from 'svelte/store';
import { dateview } from './dateview';

/**
 * @param {firebase.database.Reference} ref
 * @param {string} year
 * @param {string} month
 *
 * @returns {firebase.database.Reference}
 */
const getYearMonthRef = (ref, year, month) => {
  return ref.child(year).child(month);
};

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
  return getYearMonthRef(ref, year, month).child(id).ref;
};
/**
 * @typedef {String} ID
 * @typedef {{id?: ID, item: string, cost: number, date: number, notes: string}} Expense
 * @typedef {import('svelte/store').Readable<Expense[]> & {
 *  addExpense: (expense: Expense) => ID,
 *  updateExpense: (id: ID, expense: Expense) => ID,
 *  deleteExpense: (expense: Expense) => void,
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

  /**
   * @type {import('svelte/store').Readable<Expense[]>}
   */
  const store = readable([], (set) => {
    const unsubscribe = dateview.subscribe(({ month, year }) => {
      ref.off('value'); // clean previous listener
      ref
        .child(year + '')
        .child(month + '')
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
    });

    return () => {
      ref.off('value');
      unsubscribe();
    };
  });

  return {
    subscribe: store.subscribe,
    addExpense: (expense) => {
      const { month, year } = get(dateview);

      const { key } = getYearMonthRef(ref, year, month).push(expense);
      return key;
    },
    updateExpense: (id, expense) => {
      const { month, year } = get(dateview);

      const expenseRef = getYearMonthRef(ref, year, month).child(id).ref;

      const updatedDate = new Date(expense.date);
      if (
        updatedDate.getFullYear().toString() !== expenseRef.parent.parent.key ||
        (updatedDate.getMonth() + 1).toString() !== expenseRef.parent.key
      ) {
        const year = updatedDate.getFullYear().toString();
        const month = (updatedDate.getMonth() + 1).toString();
        const { key } = getYearMonthRef(ref, year, month).push(expense);
        expenseRef.remove();
        return key;
      } else {
        expenseRef.update(expense);
        return id;
      }
    },
    deleteExpense: (expense) => {
      const expenseRef = getRefForItem(ref, expense);
      expenseRef.remove();
    },
    reset: () => ref.remove(),
  };
};
