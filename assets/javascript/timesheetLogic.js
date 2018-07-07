
var config = {
  apiKey: "AIzaSyDRx-gQrAeGDOmqPSquyX4ytBJltgODtFQ",
  authDomain: "uc-bootcamp1.firebaseapp.com",
  databaseURL: "https://uc-bootcamp1.firebaseio.com",
  projectId: "uc-bootcamp1",
  storageBucket: "uc-bootcamp1.appspot.com",
  messagingSenderId: "271637743716"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainArrival = moment($("#arrival-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequency = parseInt($("#frequency-input").val().trim());

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    arrival: trainArrival,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.arrival);
  // console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#arrival-input").val("");
  $("#frequency-input").val("");
});

//Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainArrival = childSnapshot.val().arrival;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  // console.log(trainName);
  // console.log(trainDestination);
  console.log("Train Arrival = " + trainArrival);
  // console.log(trainFrequency);

var trainTime = moment(trainArrival, "HH:mm");
console.log("Train Time = " + trainTime);

var currentTime = moment().format("HH:mm");
console.log("Current Time = " + currentTime);

  // var trainArrival2 = "10/10/19"
var trainDiff = moment().diff(moment(trainTime), "minutes");

  // var trainDiff = moment(trainArrival).diff(moment(currentTime));
  console.log("Train Diff = " + trainDiff);

  // Need to work on the time till next train 
  // use an if else statement to calculate the (Current minus the future time)
  // diff in hours and minutes
  // trains that have already started and those that haven't started yet
  //Write out pseudo code for a train taht is 1.5 hours away and one that will happen tomorrow at noon (past and future)

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainDiff + "</td></tr>");
});
