$(document).ready(function() {

    $("#submitCity").click(function() {
        var $inputCity = $("#searchEntry").val();
        getSearchCityData($inputCity);
    });

    function getSearchCityData(city) {
        // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=e608601503792398e6b798711ad0c1a0";
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial&cnt=5" + "&appid=166a433c57516f51dfab1f7edaed8413";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            createButtonDiv(city);
            updateCurrentDayEl(city);
            generateFiveDay();

            //create history buttons
            function createButtonDiv(city) {
                var $buttonDiv = $("<div>");
                $buttonDiv.attr("class", "p-2 bd-highlight buttonDiv");
                $(".historyButtonDiv").append($buttonDiv);
                var $historyButton = $("<button>");
                $historyButton.attr("type", "button");
                $historyButton.attr("class", "btn btn-secondary generatedHistoryBtn");
                $historyButton.text(city);
                $buttonDiv.append($historyButton);
            }

            //onclick for the history buttons
            $(".generatedHistoryBtn").on("click", function() {
                var $buttonSearchHistory = $(this).text();
                updateCurrentDayEl($buttonSearchHistory);
            })

            //update the current day element
            function updateCurrentDayEl(city) {
                var $currentDayDate = response.list[0].dt;
                var $currentDayTemp = response.list[0].temp.day;
                var $currentDayHumidity = response.list[0].humidity;
                var $currentDayWindSpeed = response.list[0].speed;
                $(".currentDayDate").text(city + " " + $currentDayDate);
                $(".currentDayTemp").text("Temp: " + $currentDayTemp);
                $(".currentDayHumidity").text("Humidity: " + $currentDayHumidity);
                $(".currentDayWindSpeed").text("Wind Speed: " + $currentDayWindSpeed);
            }

            //generate the 5 day forecast
            function generateFiveDay() {
                for (i = 0; i <= 4; i++) {
                    $(".weatherDate-" + [i]).text("Date: " + response.list[i].dt);
                    $(".weatherTemp-" + [i]).text("Temp: " + response.list[i].temp.day);
                    $(".weatherHumidity-" + [i]).text("Humidity: " + response.list[i].humidity);
                }
            }

        });
    }



});