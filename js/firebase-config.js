import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
   apiKey: "AIzaSyDtrn8G-AP3XKDfFy-yu2NmqUeYzb2wFiA",

  authDomain: "smart-ai-study-planner-59c35.firebaseapp.com",

  projectId: "smart-ai-study-planner-59c35",

  storageBucket: "smart-ai-study-planner-59c35.firebasestorage.app",

  messagingSenderId: "389901071920",

  appId: "1:389901071920:web:9e24e7fa54153cd7705ff5"
 
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);