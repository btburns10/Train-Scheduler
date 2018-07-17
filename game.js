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
var trainSchedule = firebase.database().ref("trainInfo");
var trainName = firebase.database().ref("trainInfo/trainName");

var trains = [];

$("#submit-btn").on("click", function(event) {

    event.preventDefault();

    $("#train-table").clear();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    trains.push({
        name: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency });

    console.log(trains);

    for(var i = 0; i < trains.length; i++) {

        var tr = $("<tr>");
        var tdName = $("<td>").text(trains[i].name);
        var tdDest = $("<td>").text(trains[i].destination);
        var tdTime = $("<td>").text(trains[i].firstTrainTime);
        var tdFreq = $("<td>").text(trains[i].frequency);
        tr.append(tdName, tdDest, tdTime, tdFreq);
        $("#train-table").append(tr);
    }

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
    
}) 