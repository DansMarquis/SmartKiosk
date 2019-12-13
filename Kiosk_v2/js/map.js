//var mapboxUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
$(document).ready(function(){
  
   var backgrounds = new Array(
     'url(../img/newyork1.jpg)'
   , 'url(../img/newyork2.jpg)'
   , 'url(../img/newyork3.jpeg)'
   );
 
   var current = 0;
 
   function nextBackground() {
     current++;
     current = current % backgrounds.length;
     $('html').css('background-image', backgrounds[current]);
   }
   setInterval(nextBackground, 7000);
 
   $('html').css('background-image', backgrounds[0]);
})

function setDirections(){
   var text= "";
   $.ajaxSetup({async: false});
   $.get("getDirections", function(data){
      text= data;      
   });
   if (text !== ""){
      var lat= Number(text.split(",")[0]);
      var lon= Number(text.split(",")[1]);
      return [L.latLng(40.706812,-73.947831), L.latLng(lat, lon)];
   } else{
      return [L.latLng(40.706812,-73.947831)];
   }
}

var baseLayer = MQ.mapLayer(), map;

map = L.map('map', {
   layers: baseLayer,
   center: [40.706812,-73.947831],
   zoom: 17,
   //zoomControl: true
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


function createButton(label, container) {
   var btn = L.DomUtil.create('button', '', container);
   btn.setAttribute('type', 'button');
   btn.innerHTML = label;
   return btn;
}

map.on('click', function(e) {
   var container = L.DomUtil.create('div'),
       startBtn = createButton('Start from this location', container),
       destBtn = createButton('Go to this location', container);

   L.popup()
       .setContent(container)
       .setLatLng(e.latlng)
       .openOn(map);

   L.DomEvent.on(startBtn, 'click', function() {
      control.spliceWaypoints(0, 1, e.latlng);
      map.closePopup();
   });
      
   L.DomEvent.on(destBtn, 'click', function() {
      control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
      map.closePopup();
   });
});

var ReversablePlan = L.Routing.Plan.extend({
   createGeocoders: function() {
      var container = L.Routing.Plan.prototype.createGeocoders.call(this),
      reverseButton = createButton('↑↓', container);
      L.DomEvent.on(reverseButton, 'click', function() {
         var waypoints = this.getWaypoints(); 
         this.setWaypoints(waypoints.reverse()); 
      }, this); 
      return container;
   }
});

L.control.layers({
   'Map': baseLayer,
   'Satellite': MQ.satelliteLayer(),
   'Dark': MQ.darkLayer(),
   'Light': MQ.lightLayer()
}, {
   'Traffic Flow': MQ.trafficLayer({layers: ['flow']}),
   'Traffic Incidents': MQ.trafficLayer({layers: ['incidents']})
}).addTo(map);

var plan = new ReversablePlan(setDirections(), {
   geocoder: L.Control.Geocoder.nominatim(),
   routeWhileDragging: true
}),
control = L.Routing.control({
   routeWhileDragging: true,
   plan: plan
}).addTo(map);
