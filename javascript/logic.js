var config = {
  apiKey: "AIzaSyAI5byNI1yfnD5j8xA87kkQOTnUKC_ERwI",
  authDomain: "database-1-8cc26.firebaseapp.com",
  databaseURL: "https://database-1-8cc26.firebaseio.com",
  projectId: "database-1-8cc26",
  storageBucket: "database-1-8cc26.appspot.com",
  messagingSenderId: "183990201701"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(snapshot){

  var timeConverted = moment(snapshot.val().time, "hh:mm").subtract(1, "years");

  console.log(timeConverted)

  var currentTime = moment().format("HH:mm");

  console.log(currentTime)

  var timeFromStart = moment().diff(moment(timeConverted), "minutes");

  console.log(timeFromStart)

  var timeRemainer = timeFromStart % snapshot.val().frequency;

  console.log("Time Remaining: " +
   timeRemainer)

  var minsAway = (snapshot.val().frequency) - timeRemainer;

  console.log(minsAway)

  var nextArrival = moment().add(minsAway, "minutes").format("hh:mm");


  console.log(nextArrival)

  $("#newRow").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td</tr>")
});

$("#trainSubmit").on("click", function(){
  var name = $("#trainName").val().trim();
  var destination = $("#trainDestination").val().trim();
  var time = $("#trainTime").val().trim();
  var frequency = $("#trainFrequency").val().trim();

  database.ref().push({
   name: name,
   destination: destination,
   time: time,
   frequency: frequency
 })
});

setInterval(function(){
    location.reload();
  }, 60000)