var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');
var searchIndex = document.getElementById('search-index');
var currentCity = document.getElementById('current-city');
var cityName = document.getElementById('city-name');
var temp = document.getElementById('temperature');
var humid = document.getElementById('humidity');
var wind = document.getElementById('wind')



// creates city name variable value
$('#search-button').on('click', function(event) {
    event.preventDefault();
    var city = $('#search-input').val();
    console.log(city);

}
)

function searchResults() {
    var result = $('#search-input').val();
    var api = 'https://api.openweathermap.org/geo/1.0/direct';
    weatherCoordsApi = weatherCoordsApi + '?q=' + result + '&limit=&appid=6e0b8bf6700882e16a2de97e399e225b';

    fetch(weatherCoordsApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            var searchedCity = response[0];
            var cityName = searchedCity.name;
            var latitude = searchedCity.lat;
            var longitude = searchedCity.lon;

            var key = "6e0b8bf6700882e16a2de97e399e225b";

            var weatherForecastApi = 'https://api.openweathermap.org/data/2.5/forecast';
            weatherForecastApi = weatherForecastApi + '?lat=' + latitude + '&lon=' + longitude + '&appid=' + key;

            var currentDate = dayjs().format('MM/DD/YYYY');
            cityName.textContent = cityName + ' ' + currentDate;
            console.log(cityName)

            fetch(weatherForecastApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    var todaysWeather = response[0];
                    var currentTemp = todaysWeather.main.temp;
                    var humidity = todaysWeather.main.humidity;
                    var windSpeed = todaysWeather.wind.speed;
                    var iconsUrl = 'http://openweathermap.org/img/wn/' + todayForecast.weather[0].icon + '@2x.png';
                    var icon = document.createElement('img');

                    icon.setAttribute('src', iconsUrl);
                    cityName.append(icon);
                    temp.textContent = 'Temp: ' + currentTemp;
                    humid.textContent = 'Humidity: ' + humidity;
                    wind.textContent = 'Wind: ' + windSpeed;
                    
                }
                )

        }
        )
}







// SOURCE CODE I'M USING AS A RESOURCE

// // STORING
// var lastCitySearched;
// var storedCities;
// var cities = [];

// // var storedCities = JSON.parse(localStorage.getItem("cities"));
// // for (var i = 0; i < storedCities.length; i++) {
// // 	lastCitySearched = storedCities.length - 1;
// // }

// // console.log(storedCities);
// // console.log(storedCities[lastCitySearched]);
// // var lastCity = storedCities[lastCitySearched];

// RENDERING ON INDEX
// // renderLastCityInfo();
// // renderCityList();
// if (localStorage.getItem("cities")) {
// 	storedCities = JSON.parse(localStorage.getItem("cities"));
// 	console.log(storedCities);
// 	for (var i = 0; i < storedCities.length; i++) {
// 		lastCitySearched = storedCities.length - 1;
// 		var lastCity = storedCities[lastCitySearched];
// 	}
// } else {
// 	cities;
// }
// renderLastCityInfo();
// console.log("cities", cities);


// 		// push city input to cities array
// 		cities.push(city);
// 		//store cities in localStorage
// 		localStorage.setItem("cities", JSON.stringify(cities));

// 		var cityItem = $("<li>");
// 		cityItem.addClass("list-group-item city-item");
// 		cityItem.text(response.name);
// 		cityItem.attr("lat", response.coord.lat);
// 		cityItem.attr("lon", response.coord.lon);
// 		$("#city-list").prepend(cityItem);

// 		// When city item is clicked, re render info and forecast
// 		cityItem.on("click", function () {
// 			lat = $(this).attr("lat");
// 			lon = $(this).attr("lon");
// 			renderCityName(response);
// 			renderCityInfo(lat, lon);
// 		});
// 		renderCityName(response);
// 		renderCityInfo(lat, lon);
// 	});
// });

// function renderLastCityInfo() {
// 	$("#city-list").clear;
// 	var queryURL1 =
// 		"https://api.openweathermap.org/data/2.5/weather?q=" +
// 		lastCity +
// 		"&appid=" +
// 		APIKey;
// }



// CURRENT CITY INFORMATION
// function renderCityName(response) {
// 	//get current date
// 	var currentDate = moment().format("L");
// 	// render city name, current date and weather icon
// 	$(".card-title").text(`${response.name} (${currentDate})`);
// 	var weatherIcon = $("<img>");
// 	var iconCode = response.weather[0].icon;
// 	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
// 	weatherIcon.attr("src", iconUrl);
// 	$(".card-title").append(weatherIcon);
// }

// // WHEN I view current weather conditions for that city
// function renderCityInfo(lat, lon) {
// 	var queryURL2 =
// 		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
// 		lat +
// 		"&lon=" +
// 		lon +
// 		"&units=imperial&appid=" +
// 		APIKey;

// 		// WHEN I view the UV index
// 		var uviSpan = $("<span>");
// 		uviSpan.text(`${response.current.uvi}`);
// 		// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// 		var uvi = response.current.uvi;
// 		if (uvi <= 2) {
// 			uviSpan.addClass("badge badge-success");
// 		} else if (uvi <= 5) {
// 			uviSpan.addClass("badge badge-warning");
// 		} else if (uvi <= 7) {
// 			uviSpan.addClass("badge");
// 			uviSpan.css("background-color", "orange");
// 		} else if (uvi <= 9) {
// 			uviSpan.addClass("badge badge-danger");
// 		} else {
// 			uviSpan.addClass("badge");
// 			uviSpan.css("background-color", "purple");
// 			uviSpan.css("color", "white");
// 		}
// 		$("#uv-index").append(uviSpan);

// 		// render 5-Day Forecast
// 		renderForecast(response);
// 	});
// }

// function renderForecast(response) {
// 	$("#forecast").empty();
// 	// Render 5-day forecast
// 	// var n = 5;
// 	var days = response.daily;
// 	// get the 2nd - 6th index of the daily array of the response
// 	days.slice(1, 6).map((day) => {
// 		var dayCard = $("<div>");
// 		dayCard.addClass("card col-md-4 daycard");
// 		// dayCard.css("width", "18rem");
// 		dayCard.css("background-color", "lightblue");
// 		dayCard.css("margin-right", "5px");
// 		dayCard.css("font-size", "15px");

// 		var dayCardBody = $("<div>");
// 		dayCardBody.addClass("card-body");
// 		dayCard.append(dayCardBody);

// 		var dayCardName = $("<h6>");
// 		dayCardName.addClass("card-title");
// 		// take the date of the response object and format it to (MM/DD/YYYY)
// 		var datestamp = moment.unix(day.dt);
// 		var forecastDate = datestamp.format("L");
// 		dayCardName.text(forecastDate);
// 		dayCardBody.append(dayCardName);

// 		//take the icon of the response object and set the url to the src of the iconURL
// 		var weatherIcon = $("<img>");
// 		var iconCode = day.weather[0].icon;
// 		var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
// 		weatherIcon.attr("src", iconUrl);
// 		dayCardBody.append(weatherIcon);

// 		var dayTemp = $("<p>");
// 		dayTemp.text(`Temp: ${day.temp.max} \xB0F`);
// 		dayCardBody.append(dayTemp);

// 		var dayHumidity = $("<p>");
// 		dayHumidity.text(`Humidity: ${day.humidity}%`);
// 		dayCardBody.append(dayHumidity);

// 		$("#forecast").append(dayCard);
// 	});
// }