$(function() {

//initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCe26lbpbUF4MyC4q_YjnNGnYLsz3IxuGg",
    authDomain: "train-scheduler-9a924.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a924.firebaseio.com",
    projectId: "train-scheduler-9a924",
    storageBucket: "",
    messagingSenderId: "833206723692"
});

//create folder in firebase
var trainSchedule = firebase.database().ref("trainInfo");

//constructor function to add new train
function addTrain(name, destination, time, frequency) {
    this.name = name,
    this.destination = destination,
    this.firstTime = time,
    this.frequency = parseFloat(frequency)
}

//event handler to grab user input from form when user clicks submit button with id #addTrain
$("#addTrain").on("click", function(event) {

    event.preventDefault();

    var firstTime = moment($("#trainTime").val().trim(), "HH:mm").format("X");

    var newTrain = new addTrain(
        $("#newTrainName").val().trim(),
        $("#newDestination").val().trim(),
        firstTime,
        $("#frequency").val().trim()
    );

    //push form input into firebase as a new child
    trainSchedule.push(newTrain);

    $("#newTrainName").val("");
    $("#newDestination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");  
    
})

//callback function on firebase ref 'trainSchedule' when a new child is added
trainSchedule.on("child_added", function(snapshot) {
    var info = snapshot.val();

    var dbFirstTime = info.firstTime;
    var tRemainder = moment().diff(moment.unix(dbFirstTime), "minutes") % info.frequency;
    var minutes = info.frequency - tRemainder;
    var nextArrival = moment().add(minutes, "m").format("hh:mm A");

    var tr = $("<tr>").attr("keyID", snapshot.key);
    var tdName = $("<td>").html(info.name);
    var tdDest = $("<td>").html(info.destination);
    var tdFreq = $("<td>").html(info.frequency);
    var tdFirstTime = $("<td>").html(nextArrival);
    var tdMinAway = $("<td>").html(minutes);
    var removeBtn = $("<button>").text("remove").attr("keyId", snapshot.key).addClass("remove-btn");
    tr.append(tdName, tdDest, tdFreq, tdFirstTime, tdMinAway, removeBtn);
    $("#trainTable").append(tr);
})

//event handler for deleting selected row
$(document).on("click", ".remove-btn", function() {
    var keyID = $(this).attr("keyID");
    $(this).parent().attr("keyID", keyID).empty();
    trainSchedule.child(keyID).remove();
})


})