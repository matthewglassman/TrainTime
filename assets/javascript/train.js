  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDf_NpzVWCr-97gLOUBA4n0k9yJvLR7nbY",
    authDomain: "train-schedule-c9312.firebaseapp.com",
    databaseURL: "https://train-schedule-c9312.firebaseio.com",
    storageBucket: "train-schedule-c9312.appspot.com",
    messagingSenderId: "2386276282"
  };
  firebase.initializeApp(config);

//create a variable to reference the database
var database = firebase.database();

//Initial Variable Declaration
var trainName;
var trainDestination;
var trainFrequency = 0;
var firstTrain;
var nextTrain;
var minutesAway = 0;
//var currentTime = moment().format('hh:mm');

//console.log(currentTime);

$("#trainadd").on("click", function(event){
	event.preventDefault();
	alert("You clicked me!");

	trainName = $("#trainname-input").val().trim();
	trainDestination = $("#destination-input").val().trim();
	trainFrequency = $("#frequency-input").val().trim();
	firstTrain = $("#firsttrain-input").val().trim();
	
	currentTime = moment().format('hh:mm');

	if (firstTrain <= currentTime){

	//convert times

	firstTrainTime = moment(firstTrain, "hh:mm").subtract(1,"years");
	console.log(firstTrainTime);

} else {

	firstTrainTime = moment(firstTrain, "hh:mm");
	console.log(firstTrainTime);
}
	

	diffTime = moment().diff(moment(firstTrainTime), "minutes");
	diffTime = Math.abs(diffTime);
	
	timeRemainder = diffTime % trainFrequency;

	minutesAway = trainFrequency - timeRemainder;

	nextTrain = moment().add(minutesAway, "minutes");
	nextTrain = moment(nextTrain).format("hh:mm");

	console.log(firstTrainTime);
	console.log(currentTime);
	console.log(diffTime);
	console.log(timeRemainder);
	console.log(minutesAway);
	console.log(nextTrain);


	database.ref().push({
	'Train': trainName,
	'Destination': trainDestination,
	'Frequency': trainFrequency,
	'Next Train': nextTrain, //From Calculations
	'Minutes Away': minutesAway
	});
});

// //Capture Button Click
// $("#trainadd").on("click", function(){
// 	alert("You clicked me!");
	
// 	//Associating the variable to the input of the form field and trimming out unusual spacing
// 	trainName = $("#trainname-input").val().trim();
// 	trainDestination = $("#destination-input").val().trim();
// 	trainFrequency = $("#frequency-input").val().trim();
// 	firstTrain = $("#firsttrain-input").val().trim();

// 	console.log(trainName);
// 	console.log(trainDestination);
// 	console.log(trainFrequency);
// 	console.log(firstTrain);
// });

	//Perform calculations with Moment Here.  Make new variables global.
//---------------------------------------------------------------------------------------------------------------------------
	// firstTrain = moment(firstTrain,'hh:mm');
	// nextTrain = moment(nextTrain, 'hh:mm');
	// var computeTrainTimes;
	// console.log(firstTrain);
	// console.log(nextTrain);

	// if (firstTrain.isBefore(currentTime)){

	// 	while(firstTrain.isBefore(currentTime)){
	// 		computeTrainTimes = moment(firstTrain).add(trainFrequency,'minutes');
	// 	}
	// 	nextTrain = moment(computeTrainTimes).diff(currentTime, 'minutes');
	// 	console.log(nextTrain);
	// }else{
	// 	nextTrain = firstTrain;
	// 	minutesAway = currentTime.to(nextTrain);
	// 	console.log(minutesAway);
	// };

//---------------------------------------------------------------------------------------------------------------------------

//.ref and .push the items to database.
// database.ref().push({
// 	'Train': trainName,
// 	'Destination': trainDestination,
// 	'Frequency': trainFrequency,
// 	'Next Train': nextTrain, //From Calculations
// 	'Minutes Away': minutesAway
// });
// // return false;
// // };

// //create event listener to take snapshot from ref and append to the train table.
// //checking database for data and creating snapshot
// database.ref().on("child_added", function(childSnapshot) {


// $("#train_table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

// }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
// });