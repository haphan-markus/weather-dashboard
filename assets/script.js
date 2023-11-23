var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById("search-input");
var key = "0a15a1cb71c1664334fa6ef4000103a4"; //API key
var todayweatherEl = document.getElementById("today");
var forecastweatherEl = document.getElementById("forecast");
var historyEl = document.getElementById("history");
var clearBtnEl = document.getElementById("clear-search-button");

var searchHistory = JSON.parse(window.localStorage.getItem(("searchHistory"))) || [];
for (let i = 0; i < searchHistory.length;i++){
    var historyBtnEl = document.createElement('button');
    historyBtnEl.innerHTML = searchHistory[i];
    historyBtnEl.setAttribute('class','btn btn-secondary search-button form-control');
    historyEl.appendChild(historyBtnEl);
}

searchBtnEl.addEventListener('click',function(e){
    e.preventDefault();
    todayweatherEl.classList.remove("hide");
    forecastweatherEl.classList.remove("hide");

    var searchInputText = searchInputEl.value.trim();
    var geoApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInputText + "&limit=5&appid=" + key;

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
            presentTodayWeather(todayweatherEl,dataGeo,data); // call function to present the weather for today
            present5dayForecast(forecastweatherEl,data); // call function to present the forecast for the next 5 day
        });

        // Create new button for each new search result in div "history"
        var historyBtnEl = document.createElement('button');
        historyBtnEl.innerHTML = dataGeo[0].local_names.en;
        historyBtnEl.setAttribute('class','btn btn-secondary search-button form-control');
        searchHistory.push(dataGeo[0].local_names.en);
        window.localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
        historyEl.appendChild(historyBtnEl);
    });
});

clearBtnEl.addEventListener("click",function(){
    window.localStorage.clear();
})

historyEl.addEventListener('mouseover',function(){
    Array.from(historyEl.getElementsByTagName('button')).forEach(function(el){
        el.addEventListener("click", function(btnEl){
            btnEl.preventDefault();
            todayweatherEl.classList.remove("hide");
            forecastweatherEl.classList.remove("hide");
    
            var geoApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + el.textContent + "&limit=5&appid=" + key;
            fetch(geoApiURL)
            .then(function(response){
                return response.json()
            }).then(function(dataGeo){
                var weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + dataGeo[0].lat + "&lon=" + dataGeo[0].lon +"&appid=" + key;
        
                fetch(weatherApiURL)
                .then(function(response){
                    return response.json()
                }).then(function(data){
                    console.log(data);
                    presentTodayWeather(todayweatherEl,dataGeo,data); // call function to present the weather for today
                    present5dayForecast(forecastweatherEl,data); // call function to present the forecast for the next 5 day
                })
            })
        })
    })
})

function presentTodayWeather(todayEl,geoApiData,apiData){
    todayEl.getElementsByClassName("card-title")[0].innerHTML = geoApiData[0].local_names.en + ", " + geoApiData[0].country + " (" + dayjs().format("DD/MM/YYYY") + ")";
    var todayweatherImg = document.createElement('img');
    todayweatherImg.src = "https://openweathermap.org/img/w/" + apiData.list[0].weather[0].icon + ".png";
    todayEl.getElementsByClassName("card-title")[0].appendChild(todayweatherImg);

    todayEl.getElementsByTagName("p")[0].innerHTML = "Temp: " + Math.round((apiData.list[0].main.temp - 273.15)*100)/100 + " \u00B0C"; // Convert to Celcius degree
    todayEl.getElementsByTagName("p")[1].innerHTML = "Wind: " + apiData.list[0].wind.speed + " KPH";
    todayEl.getElementsByTagName("p")[2].innerHTML = "Humidity: " + apiData.list[0].main.humidity + "%";
}

function present5dayForecast(forecastEl,apiData) {
    for (let i = 0; i < forecastEl.getElementsByClassName("card-title").length;i++){
        forecastEl.getElementsByClassName("card-title")[i].innerHTML = dayjs().add(i+1,'day').format("DD/MM/YYYY");
        forecastEl.getElementsByClassName("weather-icon")[i].src = "https://openweathermap.org/img/w/" + apiData.list[i*8+7].weather[0].icon + ".png";
        forecastEl.getElementsByClassName("temperature")[i].innerHTML = "Temp: " + Math.round((apiData.list[i*8+7].main.temp - 273.15)*100)/100 + " \u00B0C";
        forecastEl.getElementsByClassName("wind")[i].innerHTML = "Wind: " + apiData.list[i*8 + 7].wind.speed + " KPH";
        forecastEl.getElementsByClassName("humidity")[i].innerHTML = "Humidity: " + apiData.list[i*8+7].main.humidity + "%";
    }
}