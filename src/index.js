import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const firebase = require('firebase');
require('firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyCkO61bBOVUdGKpNWf_gHz41mQja_4noTk",
  authDomain: "notes-14789.firebaseapp.com",
  databaseURL: "https://notes-14789.firebaseio.com",
  projectId: "notes-14789",
  storageBucket: "notes-14789.appspot.com",
  messagingSenderId: "303423165113",
  appId: "1:303423165113:web:9f13b1a0b05c03fcf20168",
  measurementId: "G-XB5R53HB4H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <App/>,
  document.getElementById('notes-container')
);
