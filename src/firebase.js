import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBtWgIOzu5qf_y3zlgYswrAHBSO7PG7_wc",
    authDomain: "projekt-koncowy.firebaseapp.com",
    databaseURL: "https://projekt-koncowy.firebaseio.com",
    projectId: "projekt-koncowy",
    storageBucket: "projekt-koncowy.appspot.com",
    messagingSenderId: "444481460999"
};
firebase.initializeApp(config);
export default firebase;