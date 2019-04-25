var config = {
  apiKey: "AIzaSyD35uZr-DHzKVVP20rMzLtq3nIV8478qhQ",
  authDomain: "train-dd8a6.firebaseapp.com",
  databaseURL: "https://train-dd8a6.firebaseio.com",
  projectId: "train-dd8a6",
  storageBucket: "train-dd8a6.appspot.com",
  messagingSenderId: "908535517054"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (childSnap) {

  $("#table").append("<tr><td>" + childSnap.val().name + "</td><td>" + childSnap.val().destination + "</td><td>" + childSnap.val().frequency + "</td><td>" + childSnap.val().nextTrain + "</td><td>" + childSnap.val().timeTill + "</td></tr>");

});

$(document).ready(function () {
  $("#add-Train-Button").on("click", function () {

    event.preventDefault();

    var name = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var timeInitial = moment($("#timeInput").val().trim(), "hh:mm a");
    console.log("ID" + timeInitial);
    var frequency = $("#frequencyInput").val().trim();
    console.log("F" + frequency);
    var difference = moment().diff(moment(timeInitial), "minutes")
    console.log(difference);
    var modulus = difference % frequency;
    console.log(modulus);
    var timeTill = frequency - modulus;
    console.log(timeTill);
    var nextTime = moment().add(timeTill, 'minutes');
    var nextTrain = moment(nextTime).format("LT");
    
    database.ref().push({ 
      name: name,
      destination: destination,
      frequency: frequency,
      timeTill: timeTill,
      nextTrain: nextTrain,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

  });



});