import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4os8fgAF67z19gvmANUq6aFdtGYgZMwQ",
  authDomain: "desarrolloweb-b9169.firebaseapp.com",
  projectId: "desarrolloweb-b9169",
  storageBucket: "desarrolloweb-b9169.appspot.com",
  messagingSenderId: "743373544653",
  appId: "1:743373544653:web:44a6d76f831ca5bf881d84"
  // apiKey: "AIzaSyAoCr5_tGtB1FUPO5XPsje2eST4OO4Ib5E",
  // authDomain: "firtsnosqldb.firebaseapp.com",
  // databaseURL: "https://firtsnosqldb-default-rtdb.firebaseio.com",
  // projectId: "firtsnosqldb",
  // storageBucket: "firtsnosqldb.appspot.com",
  // messagingSenderId: "541707749750",
  // appId: "1:541707749750:web:7baa2e5e3e8fae94031257",
  // measurementId: "G-8G9VRLYDZM",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase();

//Get a reference to the storage
export const storage = getStorage(firebase)

// Function to create a new record
export const createRecord = (path: string, data: any) => {
  const recordRef = ref(database, path);
  set(recordRef, data);
};

// Function to update a record
export const updateRecord = (path: string, updates: any) => {
  const recordRef = ref(database, path);
  update(recordRef, updates);
};

// Function to delete a record
export const deleteRecord = (path: string) => {
  const recordRef = ref(database, path);
  remove(recordRef);
};
