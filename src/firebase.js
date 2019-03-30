import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoTEIEgt70XfEU8g11zelDS1EoflcGDyc",
    authDomain: "comments-cursodevreactjs.firebaseapp.com",
    databaseURL: "https://comments-cursodevreactjs.firebaseio.com",
    projectId: "comments-cursodevreactjs",
    storageBucket: "comments-cursodevreactjs.appspot.com",
    messagingSenderId: "795218510509"
};

firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()
