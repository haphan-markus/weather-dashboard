
var key = "87251923eddd66bd3c797f59bf9006ff";
var latitude = 51.5072;
var longitude = 0.1276;

var apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude+"&appid=" + key;

fetch(apiURL)
.then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
});