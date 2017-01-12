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
var trainName = "";
var trainDestination = "";
var trainFrequency = 0;
var firstTrain = 0;
var nextTrain = 0;
var minutesAway = 0;
var currentTime = moment().format('HH:mm');

console.log(currentTime);

database.ref().on("value", function(snapshot) {




//Capture Button Click
$("#trainadd").on("click", function(){
	
	//Associating the variable to the input of the form field and trimming out unusual spacing
	trainName = $("#trainname-input").val().trim();
	trainDestination = $("#destination-input").val().trim();
	trainFrequency = $("#frequency-input").val().trim();
	firstTrain = $("#firsttrain-input").val().trim();

	//Perform calculations with Moment Here.  Make new variables global.
//---------------------------------------------------------------------------------------------------------------------------
	firstTrain = moment(firstTrain,'HH:mm');
	
	var computeTrainTimes;

	if (firstTrain.isBefore(currentTime)){

		while(firstTrain.isBefore(currentTime)){
			computeTrainTimes = moment(firstTrain).add(trainFrequency,'minutes');
		}
		nextTrain = moment(computeTrainTimes).diff(currentTime, 'minutes');

}
//---------------------------------------------------------------------------------------------------------------------------

//.ref and .push the items to database.
database.ref().push({
	'Train': trainName,
	'Destination': trainDestination,
	'Frequency': trainFrequency,
	'Next Train': nextTrain, //From Calculations
	'Minutes Away': minutesAway
});
return false;
});

//create event listener to take snapshot from ref and append to the train table.

