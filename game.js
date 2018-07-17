//initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCe26lbpbUF4MyC4q_YjnNGnYLsz3IxuGg",
    authDomain: "train-scheduler-9a924.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a924.firebaseio.com",
    projectId: "train-scheduler-9a924",
    storageBucket: "",
    messagingSenderId: "833206723692"
});

//create folders
var trainSchedule = firebase.database.ref("trainInfo");
var trainName = firebase.database.trainSchedule.ref("trainName");

