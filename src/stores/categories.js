import firebase from 'firebase/app';
import 'firebase/database';
import { derived, readable } from 'svelte/store';

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
    if (rawData) {
      const categoriesData = Object.keys(rawData).map((id) => ({
        id,
        ...rawData[id],
      }));
      set(categoriesData);
    } else {
      set([]);
    }
  });

  return () => categoriesRef.off('value');
});

export const getCategoryInfoById = (categoryId) =>
  derived(categories, ($categories) =>
    $categories.find((category) => category.id === categoryId),
  );

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

export const updateCategoryInfo = (categoryId, category) => {
  const db = firebase.database(firebase.app());
  const categoriesRef = db.ref('categories');
  const { name, maxExpense } = category;

  categoriesRef.child(categoryId).update({ name, maxExpense });
  return categoryId;
};

export const deleteCategory = (categoryId) => {
  const db = firebase.database(firebase.app());
  const categoriesRef = db.ref('categories');
  categoriesRef.child(categoryId).remove();
};
