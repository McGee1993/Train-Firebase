var firebaseConfig = {
    apiKey: "AIzaSyDAeIf9WGqWUp6_vSHKg-qmFsyueTpmKL8",
    authDomain: "rutger-project.firebaseapp.com",
    databaseURL: "https://rutger-project.firebaseio.com",
    projectId: "rutger-project",
    storageBucket: "",
    messagingSenderId: "85197588876",
    appId: "1:85197588876:web:221f42d54a6e9b9bd2aea9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X"); 
    var trainFrequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      first: firstTrain,
      frequency: trainFrequency
    };
  
    database.ref().push(newTrain);
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot){
  
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
  
    var firstTrainNice = moment.unix(firstTrain).format("hh:mm");
  
    var trainTillArrival = moment().diff(moment(firstTrain, "X"), "minutes");
    console.log(trainTillArrival);
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(firstTrainNice),
      $("<td>").text(trainTillArrival)
    );
    $("#train-table > tbody").append(newRow);
  })