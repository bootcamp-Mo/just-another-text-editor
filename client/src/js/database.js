import { openDB } from 'idb';
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// Put Method
export const putDb = async (content) => {
  const db = await openDB(`jate`, 1);
  const tx = db.transaction(`jate`, `readwrite`);
  const store = tx.objectStore(`jate`);
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(`Data saved successfully.`, result);
};

// GetAll Method
export const getDb = async () => {
  const db = await openDB(`jate`, 1);
  const tx = db.transaction(`jate`, `readonly`);
  const store = tx.objectStore(`jate`);
  const request = store.getAll();
  const result = await request;
  console.log(`All data received from DB.`, result);
  return result;
};
initdb();