var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById("search-input");
var key = "87251923eddd66bd3c797f59bf9006ff"; //API key
var todayweatherEl = document.getElementById("today");
console.log(todayweatherEl);

// console.log(searchBtnEl);
// console.log(searchInputEl);
// var searchInputText = searchInputEl.value.trim();

searchBtnEl.addEventListener('click',function(e){
    e.preventDefault();
    var searchInputText = searchInputEl.value.trim();
    console.log(searchInputEl);
    console.log(searchInputText);
    var geoApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInputText + "&limit=5&appid=" + key;
    console.log(geoApiURL);
    
    // var latitude = 51.5072;
    // var longitude = 0.1276;

    fetch(geoApiURL)
    .then(function(response){
        return response.json();
    }).then(function(dataGeo){
        console.log(dataGeo);
        var latitude = dataGeo[0].lat;
        var longitude = dataGeo[0].lon;
        // console.log(latitude);
        // console.log(longitude);

        var weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude+"&appid=" + key;
        
        fetch(weatherApiURL)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            todayweatherEl.getElementsByClassName("card-title")[0].innerHTML = dataGeo[0].local_names.en;
            todayweatherEl.getElementsByTagName("img")[0].src = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            
            // console.log(todayweatherEl.getElementsByTagName("img")[0].src);
            // console.log(data.list[0].weather[0].icon);
            var tempToday =  Math.round((data.list[0].main.temp - 273.15)*100)/100;
            todayweatherEl.getElementsByTagName("p")[0].innerHTML = "Temp: " + tempToday + " degree C"; // Convert to Celcius degree
             
            todayweatherEl.getElementsByTagName("p")[1].innerHTML = "Wind: " + data.list[0].wind.speed + " KPH";
            // var windToday = data.list[0].wind.speed;
            todayweatherEl.getElementsByTagName("p")[2].innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
            // var humidityToday = data.list[0].main.humidity;
            
            // console.log(tempToday);
            // console.log(windToday);
            // console.log(humidityToday);
        });
    });
});





