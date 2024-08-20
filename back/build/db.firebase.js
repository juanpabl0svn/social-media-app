"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.createRecord = exports.storage = exports.firebase = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const storage_1 = require("firebase/storage");
const config_1 = require("./config");
const firebaseConfig = {
    apiKey: config_1.FIREBASE_APIKEY,
    authDomain: config_1.FIREBASE_AUTHDOMAIN,
    projectId: config_1.FIREBASE_PROJECTID,
    storageBucket: config_1.FIREBASE_STORAGEBUCKET,
    messagingSenderId: config_1.FIREBASE_MESSAGESENDERID,
    appId: config_1.FIREBASE_APPID
};
// Initialize Firebase
exports.firebase = (0, app_1.initializeApp)(firebaseConfig);
// Get a reference to the database
const database = (0, database_1.getDatabase)();
//Get a reference to the storage
exports.storage = (0, storage_1.getStorage)(exports.firebase);
// Function to create a new record
const createRecord = (path, data) => {
    const recordRef = (0, database_1.ref)(database, path);
    (0, database_1.set)(recordRef, data);
};
exports.createRecord = createRecord;
// Function to update a record
const updateRecord = (path, updates) => {
    const recordRef = (0, database_1.ref)(database, path);
    (0, database_1.update)(recordRef, updates);
};
exports.updateRecord = updateRecord;
// Function to delete a record
const deleteRecord = (path) => {
    const recordRef = (0, database_1.ref)(database, path);
    (0, database_1.remove)(recordRef);
};
exports.deleteRecord = deleteRecord;
