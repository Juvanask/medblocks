// import { PGlite } from '@electric-sql/pglite';

// const db = new PGlite('idb://patient-db');

// const executeQuery = async (sql, params = []) => {
//   try {
//     const result = await db.query(sql, params);
//     return result.rows;
//   } catch (error) {
//     console.error('Error executing query:', error);
//     throw error;
//   }
// };

// export const initDb = async () => {
//   await executeQuery(`
//     CREATE TABLE IF NOT EXISTS patients (
//       id SERIAL PRIMARY KEY,
//       name TEXT NOT NULL,
//       age INTEGER,
//       gender TEXT,
//       address TEXT
//     );
//   `);
// };

// export const addPatient = async (patient) => {
//   const { name, age, gender, address } = patient;
//   await executeQuery(
//     'INSERT INTO patients (name, age, gender, address) VALUES ($1, $2, $3, $4)',
//     [name, age, gender, address]
//   );
// };

// export const getPatients = async () => {
//   return await executeQuery('SELECT * FROM patients');
// };

// export const queryPatients = async (sql) => {
//   return await executeQuery(sql);
// };

import { PGlite } from '@electric-sql/pglite';

let db = null;
const isBrowser = typeof window !== 'undefined' && typeof indexedDB !== 'undefined';

if (isBrowser) {
  db = new PGlite('idb://patient-db');
}

const executeQuery = async (sql, params = []) => {
  if (!isBrowser) {
    throw new Error('Database can only be used in the browser');
  }
  try {
    const result = await db.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

export const initDb = async () => {
  if (!isBrowser) return;

  await executeQuery(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      address TEXT
    );
  `);
};

export const addPatient = async (patient) => {
  if (!isBrowser) return;

  const { name, age, gender, address } = patient;
  await executeQuery(
    'INSERT INTO patients (name, age, gender, address) VALUES ($1, $2, $3, $4)',
    [name, age, gender, address]
  );
};

export const getPatients = async () => {
  if (!isBrowser) return [];

  return await executeQuery('SELECT * FROM patients');
};

export const queryPatients = async (sql) => {
  if (!isBrowser) return [];
  return await executeQuery(sql);
};