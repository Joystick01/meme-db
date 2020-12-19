import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
    apiKey: "AIzaSyDFM9RnOQaUt5bRyj-tjfV73_wpF2JaFR8",
    authDomain: "memedb-knpfl.firebaseapp.com",
    databaseURL: "https://memedb-knpfl.firebaseio.com",
    projectId: "memedb-knpfl",
    storageBucket: "memedb-knpfl.appspot.com",
    messagingSenderId: "506338430467",
    appId: "1:506338430467:web:89a32ec1f4ff278ae88836",
    measurementId: "G-0WWK6HG908"
  });
  
  
export const db = firebase.firestore()
export const storage = firebase.storage()
  