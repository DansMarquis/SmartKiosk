const year = new Date().getFullYear();
var ticketsInfo= getTickets();
sections= Object.keys(ticketsInfo.tickets);
var seats= new Array(sections.length);
var selectedTickets= new Array(sections.length);

for (var i= 0; i< seats.length; i++){
  seats[i]= new Array(ticketsInfo.tickets[sections[i]].length);
  selectedTickets[i]= 0;
  for (var j= 0; j<ticketsInfo.tickets[sections[i]].length; j++){
    seats[i][j]= new Array((ticketsInfo.tickets[sections[i]])[j].length);
    for(var k= 0; k<(ticketsInfo.tickets[sections[i]])[j].length; k++){
      seats[i][j][k]= ticketsInfo.tickets[sections[i]][j][k];
    }
  } 
}

function getTickets(){
  var dict= {};
  $.ajaxSetup({async: false});
  $.get("getTickets", function(data){
    console.log(data);
    dict= data;      
  });
  return dict;
}

function refreshCB(){
  var selector = document.getElementById("sections");
  var idx = selector[selector.selectedIndex].value;
  selectedTickets[idx]= 0;
  for (var i= 0; i < ticketsInfo.tickets[sections[idx]].length; i++){
    for (var j= 0; j< (ticketsInfo.tickets[sections[idx]])[i].length; j++){
      if(!document.getElementById("cb"+i+j).disabled){
        if(document.getElementById("cb"+i+j).checked == true){
          seats[idx][i][j]= 1;
          selectedTickets[idx]+= 1;
        } else{
          seats[idx][i][j]= 0;
        }
      }
    }
  }
  var price= 0;
  for (var i= 0; i< sections.length; i++){
    price+= parseInt(ticketsInfo.prices[i])*selectedTickets[i];
  }
  var sum= selectedTickets.reduce((a, b) => a + b, 0);
  document.getElementById("button").innerHTML= "Buy "+sum+" tickets ("+ price+"$)";
}

function refreshSection(){
  var selector = document.getElementById("sections");
  var idx = selector[selector.selectedIndex].value;
  var elmtTable = document.getElementById('table');
  var tableRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  for (var x=rowCount-1; x>=0; x--) {
    document.getElementById("table").deleteRow(x); 
  }

  // Seats Numbers
  var tr= document.createElement("tr");
  for (var i = 0; i < (ticketsInfo.tickets[sections[idx]])[0].length; i++) {
    var th= document.createElement("th");
    var text= document.createTextNode(i);
    document.getElementById("table").appendChild(tr).appendChild(th).appendChild(text);
  }
  // Seats Checkboxes
  for (var i = 0; i < ticketsInfo.tickets[sections[idx]].length; i++) {
    var tr= document.createElement("tr");
    for (var j= 0; j<(ticketsInfo.tickets[sections[idx]])[i].length; j++) {
      var td= document.createElement("td");
      var label= document.createElement("label");
      label.setAttribute("class","container-table");
      var input= document.createElement("input");
      input.setAttribute("type","checkbox");
      input.setAttribute("id","cb"+i+j);
      input.setAttribute("onClick","refreshCB()");
      var span= document.createElement("span");
      span.setAttribute("class","checkmark");
      span.setAttribute("id","span"+i+j);
      if (ticketsInfo.tickets[sections[idx]][i][j]==2){
        input.setAttribute("disabled","false");
        span.setAttribute("style", "opacity:0")
      }
      label.append(input);
      label.append(span);
      td.appendChild(label);
      tr.appendChild(td);
    }
    document.getElementById("table").appendChild(tr);
  } 

  for (var i= 0; i < ticketsInfo.tickets[sections[idx]].length; i++){
    for (var j= 0; j< (ticketsInfo.tickets[sections[idx]])[i].length; j++){
      if(seats[idx][i][j]== 1){
        document.getElementById("cb"+i+j).checked= true;
      } else if (seats[idx][i][j]==2){
        document.getElementById("cb"+i+j).setAttribute("disabled","false");
        document.getElementById("span"+i+j).setAttribute("style", "opacity:0")
      } else{
        document.getElementById("cb"+i+j).checked= false;
      }
    }
  }
}

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
  
  document.getElementById("title").innerHTML = "<div class=\"title\">" + ticketsInfo.name + "</div>";
  // Sections
  for (var i = 0; i < sections.length; i++) {
    var option= document.createElement("option");
    option.setAttribute("value",i);
    var text= document.createTextNode(sections[i]);
    document.getElementById("sections").appendChild(option).appendChild(text);
  }
  // Seats Numbers
  var tr= document.createElement("tr");
  for (var i = 0; i < (ticketsInfo.tickets[sections[0]])[0].length; i++) {
    var th= document.createElement("th");
    var text= document.createTextNode(i);
    document.getElementById("table").appendChild(tr).appendChild(th).appendChild(text);
  }
  // Seats Checkboxes
  for (var i = 0; i < ticketsInfo.tickets[sections[0]].length; i++) {
    var tr= document.createElement("tr");
    for (var j= 0; j<(ticketsInfo.tickets[sections[0]])[i].length; j++) {
      var td= document.createElement("td");
      var label= document.createElement("label");
      label.setAttribute("class","container-table");
      var input= document.createElement("input");
      input.setAttribute("type","checkbox");
      input.setAttribute("id","cb"+i+j);
      input.setAttribute("onClick","refreshCB()");
      var span= document.createElement("span");
      span.setAttribute("id","span"+i+j);
      span.setAttribute("class","checkmark");
      if (ticketsInfo.tickets[sections[0]][i][j]==2){
        input.setAttribute("disabled","false");
        span.setAttribute("style", "opacity:0");
      }
      label.append(input);
      label.append(span);
      td.appendChild(label);
      tr.appendChild(td);
    }
    document.getElementById("table").appendChild(tr);
  }   
})

function buyTickets(){
  var selector = document.getElementById("sections");
  var idx = selector[selector.selectedIndex].value;
  for (var i= 0; i< seats.length; i++){
    selectedTickets[i]= 0;
    for (var j= 0; j<ticketsInfo.tickets[sections[i]].length; j++){
      for(var k= 0; k<(ticketsInfo.tickets[sections[i]])[j].length; k++){
        if(seats[i][j][k]== 1){
          seats[i][j][k]= 2;
          if(i==idx && document.getElementById("cb"+j+k).checked == true){
            document.getElementById("cb"+j+k).checked = false;
          }  
        }
      }
    } 
  }
  $.post('/buyTickets', {name: ticketsInfo.name, tickets: seats}, function(data) {
 });
 ticketsInfo= getTickets();
 refreshSection();
 refreshCB();
}