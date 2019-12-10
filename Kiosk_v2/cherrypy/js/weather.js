$(document).ready(function(){
  $('html').css('background-image', 'url(../img/weather.gif)');
  fetch('https://api.openweathermap.org/data/2.5/weather?q=New York,US&units=imperial&apikey=e47d2c26f0b371ccb8091575a3e0ba9c')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var date= new Date(data.dt* 1000);
    document.getElementById("hour").innerHTML = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"}).split(":")[0] + ":" 
            +date.toLocaleTimeString("en-US", {timeZone: "America/New_York"}).split(":")[1]
            +date.toLocaleTimeString("en-US", {timeZone: "America/New_York"}).split(" ")[1];
    document.getElementById("date").innerHTML = date.toLocaleDateString("en-US", {timeZone: "America/New_York"});
    document.getElementById("currentIcon").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    document.getElementById("currentTemp").innerHTML = Math.round(data.main.temp) + "ºF";
    document.getElementById("desc").innerHTML = data.weather[0].description.toUpperCase();
    document.getElementById("pressure").innerHTML= data.main.pressure+" hPa";
    document.getElementById("humidity").innerHTML= data.main.humidity+"%";
    document.getElementById("wind").innerHTML= data.wind.speed+" mph";

  })
  .catch(function() {
    console.log("exception");
  });
  
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=New York,US&units=imperial&apikey=e47d2c26f0b371ccb8091575a3e0ba9c')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    for (var i= 0; i<4; i++){
      var date= new Date(data.list[i].dt* 1000);
      document.getElementById("hour"+i).innerHTML = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"}).split(":")[0] + ":" 
            +date.toLocaleTimeString("en-US", {timeZone: "America/New_York"}).split(":")[1]
            +date.toLocaleTimeString("en-US", {timeZone: "America/New_York"}).split(" ")[1];
      document.getElementById("icon"+i).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";  
      document.getElementById("temp"+i).innerHTML = Math.round(data.list[i].main.temp) + "ºF";    
    }
  })
  .catch(function() {
    console.log("exception");
  }); 
})


