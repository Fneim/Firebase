// // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD5O872GrO9q840oOuwfEghU9K-xbZG32E",
        authDomain: "wk4-firebase-project.firebaseapp.com",
        databaseURL: "https://wk4-firebase-project.firebaseio.com",
        projectId: "wk4-firebase-project",
        storageBucket: "",
        messagingSenderId: "617196112498"
    };
    firebase.initializeApp(config);

    // //connect to firebase
    var database = firebase.database();

    //onclick button will run anonymous function
    $("#submit").on("click", function(event) {

        event.preventDefault();

        var train = $("#train-input").val();
        var dest = $("#dest-input").val();
        var firstTrainTime = $("#first-train-input").val();
        var freq = $("#freq-input").val();

        //storing train info in temp object
        var newTrain = {
            train: train,
            dest: dest,
            firstTrain: firstTrainTime,
            freq: freq
        };

        //uploading train info to the database
        database.ref().push(newTrain);

        console.log(newTrain.train);
        console.log(newTrain.dest);
        console.log(newTrain.firstTrain);
        console.log(newTrain.freq);

        alert("New Train Successfully Added");

        $("#train-input").val("");
        $("#dest-input").val("");
        $("#first-train-input").val("");
        $("#freq-input").val("");
    });

    database.ref().on("child_added", function(snapshot, prevChildKey) {

        var train = snapshot.val().train;
        var dest = snapshot.val().dest;
        var firstTrainTime = snapshot.val().firstTrain;
        var freq = snapshot.val().freq;

        console.log(train);
        console.log(dest);
        console.log(firstTrainTime);
        console.log(freq);

        var convertedTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        console.log("Convert: " + convertedTime);

        var currentTime = moment();
        console.log("Current: " + moment(currentTime).format("LT"));

        var diffTime = moment().diff(moment(convertedTime), "minutes");
        console.log("Difference: " + diffTime);

        var remainder = diffTime % freq;
        console.log("Remainder :" + remainder);

        var minutesLeft = freq - remainder;
        console.log("Minutes away" + minutesLeft);

        var nextArrival = moment().add(minutesLeft, "minutes");
        console.log("Arrival :" + moment(nextArrival).format("LT"));


        $("#table> tbody")
            .append($("<tr>")
                .append($("<td>").text(train))
                .append($("<td>").text(dest))
                .append($("<td>").text(freq))
                .append($("<td>").text(moment(nextArrival, "").format("LT")))
                .append($("<td>").text(minutesLeft))
            );
    })