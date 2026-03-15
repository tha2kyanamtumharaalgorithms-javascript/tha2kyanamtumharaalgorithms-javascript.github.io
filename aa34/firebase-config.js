// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVnlwEnclUCBVs6xMVnAbmB8I_CWwlPCc",
  authDomain: "offline-app-e9b72.firebaseapp.com",
  databaseURL: "https://offline-app-e9b72-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "offline-app-e9b72",
  storageBucket: "offline-app-e9b72.firebasestorage.app",
  messagingSenderId: "98551527717",
  appId: "1:98551527717:web:599857fc57f65bc7f0c2cc",
  measurementId: "G-VQ61ET8XV8"
};

firebase.initializeApp(firebaseConfig);
const fbDb = firebase.database();
