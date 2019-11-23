"use strict";

const DISPLACEMENT_THRESHOLD = 2.8;

let emotions = {};
let expressions = [];
let displacement = 9999;

//entry point :
function main() {
  JEEFACETRANSFERAPI.init({
    canvasId: "canvas",
    NNCpath: "src/model/",
    callbackReady: function(errCode) {
      if (errCode) {
        console.log(
          "ERROR - cannot init JEEFACETRANSFERAPI. errCode =",
          errCode
        );
        errorCallback(errCode);
        return;
      }
      console.log("INFO : JEEFACETRANSFERAPI is ready !!!");
      successCallback();
    } //end callbackReady()
  });
} //end main()

function successCallback() {
  // Call next frame
  nextFrame();
  // Add code after API is ready.
}

function errorCallback(errorCode) {
  // Add code to handle the error
  alert("Some error occured " + errorCode);
}
var countPeople = 0
var detect = false
var count = 0
var emotionsObj = {}
var media = {}
function nextFrame() {
  
  if (JEEFACETRANSFERAPI.is_detected()) {
    // Do something awesome with rotation values
    let rotation = JEEFACETRANSFERAPI.get_rotationStabilized();
    // Do something awesome with animation values
    expressions = JEEFACETRANSFERAPI.get_morphTargetInfluences();
    getMeanDisplacement(rotation);
    if (displacement > DISPLACEMENT_THRESHOLD) {
      if(detect == false){
        countPeople = countPeople + 1
        document.getElementById("people").innerHTML = countPeople;
        detect = true
      }
      let emotions = get_emotions();
      count = count + 1
      document.getElementById("emotions").innerHTML = count;

      if(Object.entries(emotionsObj).length == 0 && emotionsObj.constructor == Object){
        emotionsObj = emotions;
      }
      else{
       // console.log("sum= "+emotionsObj.anger+" + "+emotions.anger)
       emotionsObj = sumObjectsByKey(emotionsObj, emotions)
       //console.log("After Sum= "+emotionsObj.anger)
       media = divideObjectsByKey(emotionsObj)

       //console.log("After Division= "+emotionsObj.anger)
       //console.log("After Division Media= "+media.anger)
      
      
    }
       document.getElementById("anger").innerHTML = media.anger;
       document.getElementById("fear").innerHTML = media.fear;
       document.getElementById("happy").innerHTML = media.happy;
       document.getElementById("sad").innerHTML = media.sad;
       document.getElementById("surprise").innerHTML = media.surprise;
       document.getElementById("emotion-anger").style.opacity = emotions.anger;
       document.getElementById("emotion-surprise").style.opacity = emotions.surprise;
       document.getElementById("emotion-happy").style.opacity = emotions.happy;
       document.getElementById("emotion-fear").style.opacity = emotions.fear;
       document.getElementById("emotion-sad").style.opacity = emotions.sad;

      }
    //**************************************************************************** */

    // The API is detected
    console.log("Detected");

  } else {
    // Tell the user that detection is off.
    console.log("Not Detected");
    document.getElementById("emotion-anger").style.opacity =1;
    document.getElementById("emotion-surprise").style.opacity = 1;
    document.getElementById("emotion-happy").style.opacity = 1;
    document.getElementById("emotion-fear").style.opacity = 1;
    document.getElementById("emotion-sad").style.opacity = 1;
    if (detect == true){
      detect = false
      document.getElementById("emotions").innerHTML = count;
     
    }
    console.log(emotionsObj)
    
  }
  // Replay frame
  requestAnimationFrame(nextFrame);
}

function getMeanDisplacement(rotation) {
  displacement = 0;
  let factors = rotation.concat(expressions);
  for (let index = 0; index < factors.length; index++) {
    const element = Math.abs(factors[index]);
    displacement += element;
  }
}

function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = ((a[k] || 0) + b[k]);
    }
    return a;
  }, {});
}
function divideObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = roundToTwo(((a[k] || 0) + b[k] /count)*100);
    }
    return a;
  }, {});
}


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
