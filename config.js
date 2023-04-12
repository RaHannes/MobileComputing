import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAW46RMXQ6XfeN0dLgvDR2fWuJEsfItsj8",
    authDomain: "mobile-computing-b7362.firebaseapp.com",
    projectId: "mobile-computing-b7362",
    storageBucket: "mobile-computing-b7362.appspot.com",
    messagingSenderId: "546148474159",
    appId: "1:546148474159:web:46fcc05442d4e7fd6ed5da",
    measurementId: "G-MQV3LGDZN8"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}