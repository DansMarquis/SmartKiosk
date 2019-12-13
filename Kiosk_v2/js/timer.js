const year = new Date().getFullYear();
var eventos= getEvents();

function getEvents(){
  var dict= {};
  $.ajaxSetup({async: false});
  $.get("getEventsList", function(data){
    dict= data;      
  });
  return dict;
} 
var current= 0;

  $(document).ready(function(){
  
  var header = $('body');

  function nextBackground() {
    current++;
    current = current % eventos.length;
    $('html').css('background-image', 'url('+eventos[current].image+')');
    document.getElementById("title").innerHTML = "<div class=\"title\">" + eventos[current].name + "</div>";
    document.getElementById("description").innerHTML = "<div class=\"description\">" 
      + eventos[current].etype + ", "+ eventos[current].age + ", "+ new Date(eventos[current].date*1000).toUTCString()  + "</div>";
    setDirections();
    setTickets();  
  }
  setInterval(nextBackground, 15000);

  $('html').css('background-image', 'url('+eventos[0].image+')');
  document.getElementById("title").innerHTML = "<div class=\"title\">" + eventos[0].name + "</div>";
  document.getElementById("description").innerHTML = "<div class=\"description\">" 
      + eventos[0].etype + ", "+ eventos[0].age + ", "+ new Date(eventos[0].date*1000).toUTCString()  + "</div>";
  setDirections(); 
  setTickets();   
})


// countdown
let timer = setInterval(function() {

  // get today's date
  const today = new Date().getTime();

  // get the difference
  const diff = new Date(eventos[current].date*1000).getTime() - today;

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

function setTickets(){
  $.post('/setTickets', {name: eventos[current].name, tickets: eventos[current].tickets, prices: eventos[current].prices}, function(data) {
 });
}