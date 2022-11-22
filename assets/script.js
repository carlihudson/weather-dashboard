var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');
var searchIndex = document.getElementById('search-index');
var currentCity = document.getElementById('current-city');
var cityNameElm = document.getElementById('city-name');
var tempElm = document.getElementById('temperature');
var humidElm = document.getElementById('humidity');
var windElm = document.getElementById('wind');
var forecastElm = document.getElementById('forecast');



// creates city name variable value
$('#search-button').on('click', function(event) {
    event.preventDefault();
    var city = $('#search-input').val();

    if(city) {
        searchResults(city);
        searchInput.value = '';

    } else {
        cityNameElm.textContent = '';
        alert('Please enter a city')
    }

}
)

// function to call api
function searchResults() {
    var result = $('#search-input').val();
    var api = 'https://api.openweathermap.org/geo/1.0/direct';
    api = api + '?q=' + result + '&limit=&appid=6e0b8bf6700882e16a2de97e399e225b';
  

    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var searchedCity = response[0];
            var cityName = searchedCity.name;
            var latitude = searchedCity.lat;
            var longitude = searchedCity.lon;

            var key = "6e0b8bf6700882e16a2de97e399e225b";

            var weatherForecastApi = 'https://api.openweathermap.org/data/2.5/forecast';
            weatherForecastApi = weatherForecastApi + '?lat=' + latitude + '&lon=' + longitude + '&appid=' + key + '&units=imperial';

           // declaring and appending current date to the dom
            var currentDate = dayjs().format('MM/DD/YYYY');
            var cityNameAndDate = cityName + ' ' + currentDate;

            cityNameElm.setAttribute('style', 'font-weight: bold; font-size: 2rem; ')
            cityNameElm.append(cityNameAndDate)
            	

            fetch(weatherForecastApi)
                .then(function (response) {
                    return response.json();
            
                })
                .then(function (response) { 

                    var todaysWeather = response.list;

                    for(var i = 0; i > 5; i++) {
                        var fiveDates = dayjs().add([i], 'day').format('MM/DD/YYYY')
                        console.log(fiveDates);
                    }
                    
                    // retrieving next five days data
                    for(var i = 0; i < 5; i++) {
                        todaysWeather[i]

                        var tempForecast = document.createElement('p');
                        tempForecast.setAttribute('style', 'font-weight: bold; ');
                        tempForecast.textContent = 'Temp: ' + Math.floor(todaysWeather[i].main.temp) + ' °F';
                        console.log(tempForecast)

                        var windForecast = document.createElement('p');
                        windForecast.setAttribute('style', 'font-weight: bold; ');
                        windForecast.textContent = 'Wind: ' + Math.floor(todaysWeather[i].wind.speed) + ' MPH';
                        console.log(windForecast)

                        var humidForecast = document.createElement('p');
                        humidForecast.setAttribute('style', 'font-weight: bold; ');
                        humidForecast.textContent = 'Humidity: ' + Math.floor(todaysWeather[i].main.humidity) + '%';
                        console.log(humidForecast)

                    }

                    // current weather for searched city
                    var currentTemp = todaysWeather[i].main.temp
                        tempElm.setAttribute('style', 'font-weight: bold; font-size: 1.25rem; ')
                        tempElm.append('Temp: ' + currentTemp + ' °F')

                    var windSpeed = todaysWeather[i].wind.speed;
                        windElm.setAttribute('style', 'font-weight: bold; font-size: 1.25rem; ')
                        windElm.append('Wind: ' + windSpeed + ' MPH')

                    var humidity = todaysWeather[i].main.humidity;
                        humidElm.setAttribute('style', 'font-weight: bold; font-size: 1.25rem; ')
                        humidElm.append('Humidity: ' + humidity + '%') 
                    
                }
                )

        }
        )
}
