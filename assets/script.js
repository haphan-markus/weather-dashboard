var searchBtnEl = document.getElementById('search-button');
var searchInputEl = document.getElementById("search-input");
// console.log(searchBtnEl);
// console.log(searchInputEl);
// var searchInputText = searchInputEl.value.trim();

var key = "87251923eddd66bd3c797f59bf9006ff";

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
    }).then(function(data){
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log(latitude);
        console.log(longitude);
    });
});



// var weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude+"&appid=" + key;

// fetch(weatherApiURL)
// .then(function(response){
//     return response.json();
// }).then(function(data){
//     // console.log(data);
// });