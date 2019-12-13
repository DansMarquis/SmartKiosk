$(document).ready(function(){
  
  function resetDirection(){
    $.post('/setDirections', {dest: ""}, function(data) {
    });
  }
  
  resetDirection();

  var backgrounds = new Array(
    'url(../img/heineken.jpg)'
  , 'url(../img/cocacola.jpeg)'
  , 'url(../img/burgerking.jpg)'
  );

  var current = 0;

  function nextBackground() {
    current++;
    current = current % backgrounds.length;
    $('html').css('background-image', backgrounds[current]);
  }
  setInterval(nextBackground, 7000);

  $('html').css('background-image', backgrounds[0]);

  $('.close').click(function(){
    $('ul').toggleClass('active');
  })
})