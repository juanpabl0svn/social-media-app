import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove } from "firebase/database";
import { getStorage } from "firebase/storage";
import { FIREBASE_APIKEY, FIREBASE_APPID, FIREBASE_AUTHDOMAIN, FIREBASE_MESSAGESENDERID, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET } from "./config";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGESENDERID,
  appId: FIREBASE_APPID
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
