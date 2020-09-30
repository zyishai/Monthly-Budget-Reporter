import firebase from 'firebase/app';
import 'firebase/database';
import { readable } from 'svelte/store';

/**
 * @typedef {{ id?: string, name: string, url?: string, maxExpense: number }} Category
 * @typedef {String} ID
 */

/**
 * @type {import('svelte/store').Readable<Category[]>}
 */
export const categories = readable([], (set) => {
  const db = firebase.database(firebase.app());
  const categoriesRef = db.ref('categories');
  categoriesRef.on('value', (snapshot) => {
    const rawData = snapshot.val();
    const categoriesData = Object.keys(rawData).map((id) => ({
      id,
      ...rawData[id],
    }));
    set(categoriesData);
  });

  return () => categoriesRef.off('value');
});

/**
 * @param {Category} category
 * @returns {ID} key
 */
export const addCategory = (category) => {
  const db = firebase.database(firebase.app());
  const categoriesRef = db.ref('categories');
  const { key } = categoriesRef.push(category, (err) => {
    if (err) {
      console.error(err);
    }
  });

  return key;
};
