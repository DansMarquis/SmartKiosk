const year = new Date().getFullYear(); 
var eventos = new Array(
  {"image":"url(../img/teatro.jpg)", "name": "Theatre Play","type": "Cultural Event", "age": "M12", "date": new Date("December 17, 2019 22:00:00"), "cord": [40.763278, -73.983159]},
  {"image":"url(../img/concerto.jpg)", "name": "Outside Concert","type": "Musical Event", "age": "M3", "date": new Date("December 18, 2019 15:00:00"), "cord": [40.785091, -73.968285]},
  {"image":"url(../img/futebol.jpg)", "name": "Football Game" ,"type": "Sports Event", "age": "M3", "date": new Date("December 19, 2019 19:30:00"), "cord": [40.829643, -73.926175]});
var current= 0;

  $(document).ready(function(){
  
  var header = $('body');

  function nextBackground() {
    current++;
    current = current % eventos.length;
    $('html').css('background-image', eventos[current].image);
    document.getElementById("title").innerHTML = "<div class=\"title\">" + eventos[current].name + "</div>";
    document.getElementById("description").innerHTML = "<div class=\"description\">" 
      + eventos[current].type + ", "+ eventos[current].age + ", "+ eventos[current].date.toUTCString()  + "</div>";
    setDirections();  
  }
  setInterval(nextBackground, 15000);

  $('html').css('background-image', eventos[0].image);
  document.getElementById("title").innerHTML = "<div class=\"title\">" + eventos[0].name + "</div>";
  document.getElementById("description").innerHTML = "<div class=\"description\">" 
      + eventos[0].type + ", "+ eventos[0].age + ", "+ eventos[0].date.toUTCString()  + "</div>";
  setDirections();    
})


// countdown
let timer = setInterval(function() {

  // get today's date
  const today = new Date().getTime();

  // get the difference
  const diff = eventos[current].date.getTime() - today;

  // math
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // display
  document.getElementById("timer").innerHTML =
    "<div class=\"days\"> \
  <div class=\"numbers\">" + days + "</div>days</div> \
<div class=\"hours\"> \
  <div class=\"numbers\">" + hours + "</div>hours</div> \
<div class=\"minutes\"> \
  <div class=\"numbers\">" + minutes + "</div>minutes</div> \
<div class=\"seconds\"> \
  <div class=\"numbers\">" + seconds + "</div>seconds</div> \
</div>";

}, 1000);

function setDirections(){
  $.post('/setDirections', {dest: eventos[current].cord.toString()}, function(data) {
 });
}