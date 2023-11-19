var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById("search-input");
var key = "87251923eddd66bd3c797f59bf9006ff"; //API key
var todayweatherEl = document.getElementById("today");
console.log(todayweatherEl);
var forecastweatherEl = document.getElementById("forecast");
console.log(forecastweatherEl.getElementsByClassName("card-title"));

searchBtnEl.addEventListener('click',function(e){
    e.preventDefault();
    var searchInputText = searchInputEl.value.trim();
    var geoApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInputText + "&limit=5&appid=" + key;

    fetch(geoApiURL)
    .then(function(response){
        return response.json();
    }).then(function(dataGeo){
        console.log(dataGeo);
        var weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + dataGeo[0].lat + "&lon=" + dataGeo[0].lon +"&appid=" + key;
        
        fetch(weatherApiURL)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            todayweatherEl.getElementsByClassName("card-title")[0].innerHTML = dataGeo[0].local_names.en + " (" + dayjs().format("DD/MM/YYYY") + ")";
            var todayweatherImg = document.createElement('img');
            todayweatherImg.src = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            todayweatherEl.getElementsByClassName("card-title")[0].appendChild(todayweatherImg);
            
            todayweatherEl.getElementsByTagName("p")[0].innerHTML = "Temp: " + Math.round((data.list[0].main.temp - 273.15)*100)/100 + " \u00B0C"; // Convert to Celcius degree
            todayweatherEl.getElementsByTagName("p")[1].innerHTML = "Wind: " + data.list[0].wind.speed + " KPH";
            todayweatherEl.getElementsByTagName("p")[2].innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
            
            // a for loop to present the day for the next 5 day
            for (let i = 0; i < forecastweatherEl.getElementsByClassName("card-title").length;i++){
                forecastweatherEl.getElementsByClassName("card-title")[i].innerHTML = dayjs().add(i+1,'day').format("DD/MM/YYYY");
                forecastweatherEl.getElementsByClassName("weather-icon")[i].src = "http://openweathermap.org/img/w/" + data.list[i*8+7].weather[0].icon + ".png";
                forecastweatherEl.getElementsByClassName("temperature")[i].innerHTML = "Temp: " + Math.round((data.list[i*8+7].main.temp - 273.15)*100)/100 + " \u00B0C";
                forecastweatherEl.getElementsByClassName("wind")[i].innerHTML = "Wind: " + data.list[i*8 + 7].wind.speed + " KPH";
                forecastweatherEl.getElementsByClassName("humidity")[i].innerHTML = "Humidity: " + data.list[i*8+7].main.humidity + "%";
            }
        });
    });
});