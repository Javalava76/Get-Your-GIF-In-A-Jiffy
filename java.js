

// Initial array of activities
var activities = ["running", "jumping", "laughing", "falling", "eating", "walking", "swimming", "playing guitar", "rolling eyes" ];

// creating buttons with text for activities array

function renderButtons() {

    for (var i=0; i < activities.length; i++) {

    var button = $("<button>");

    // adds a class of "activityBtn" to the button
    button.addClass("activityBtn btn btn-default")
    button.attr("data-name", activities[i]);
    button.text(activities[i]);
    $("#activityButtons").append(button);

    }
}



// adding gifs to the body with ajax call

function displayGif() {

    // empty the array
    $("#gifActivity").empty();
 
    var gifActivity = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifActivity + "&rating=g&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
          url: queryURL,
          method: "GET"
        })

    .done(function(response) {
    console.log(response);

    var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div class='item'>")

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");

          gifImage.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state","still").attr("class","gif img-rounded img-responsive");

          gifDiv.append(gifImage);
          gifDiv.append(p);
          $("#gifActivity").prepend(gifDiv);
                                    
      }
    });

}

renderButtons();

// event handler/click function allowing for viewing gif static/still or animated

 $(document).on("click", "img", function() {


  var state = $(this).attr("data-state");
  console.log(state)


  if (state === "still") {

    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

  } 

  else {

    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});



// event handler/click function for submit button getting user input to add new buttons


  $("#addActivity").on("click", function(event) {
    event.preventDefault();

    var userInput = $("#inputActivity").val().trim();
    
      if (userInput !== "") 

          activities.push(userInput);  

          $("#activityButtons").empty();  
          
          // call renderButtons function
          renderButtons();
      
  });

;

// when the activity button is clicked it displays the returned gifs

  $(document).on("click", ".activityBtn", displayGif);
























