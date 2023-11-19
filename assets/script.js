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
    console.log(geoApiURL);

    fetch(geoApiURL)
    .then(function(response){
        return response.json();
    }).then(function(dataGeo){
        var weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + dataGeo[0].lat + "&lon=" + dataGeo[0].lon +"&appid=" + key;
        
        fetch(weatherApiURL)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            todayweatherEl.getElementsByClassName("card-title")[0].innerHTML = dataGeo[0].local_names.en + " (" + dayjs().format("DD/MM/YYYY") + ")";
            var todayweatherImg = document.createElement('img');
            // todayweatherEl.getElementsByTagName("img")[0].src = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            todayweatherImg.src = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            todayweatherEl.getElementsByClassName("card-title")[0].appendChild(todayweatherImg);
            
            todayweatherEl.getElementsByTagName("p")[0].innerHTML = "Temp: " + Math.round((data.list[0].main.temp - 273.15)*100)/100 + " degree C"; // Convert to Celcius degree
            todayweatherEl.getElementsByTagName("p")[1].innerHTML = "Wind: " + data.list[0].wind.speed + " KPH";
            todayweatherEl.getElementsByTagName("p")[2].innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
           
            // forecastweatherEl.getElementsByClassName("card-title")[0].innerHTML;
        });
    });
});