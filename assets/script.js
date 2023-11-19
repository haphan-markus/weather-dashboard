var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById("search-input");
// console.log(searchBtnEl);
// console.log(searchInputEl);
// var searchInputText = searchInputEl.value.trim();
searchBtnEl.addEventListener('click',function(e){
    e.preventDefault();
    var searchInputText = searchInputEl.value.trim();
    console.log(searchInputEl);
    console.log(searchInputText);
    
});


var key = "87251923eddd66bd3c797f59bf9006ff";
var latitude = 51.5072;
var longitude = 0.1276;

var geoApiURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

var weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude+"&appid=" + key;

fetch(apiURL)
.then(function(response){
    return response.json();
}).then(function(data){
    // console.log(data);
});