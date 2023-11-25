// For Laptops and Computers

var instrument = ["guitar", "bell", "drum", "flute", "horn", "kalimba"];
var gameSequence = [];
var userSequence = [];

function nextSequence() {
    userSequence =[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*6);
    var randomInstrument = instrument[randomNumber];
    playInstrument(randomInstrument);
    $("#" + randomInstrument).fadeIn().fadeOut().fadeIn();
    gameSequence.push(randomInstrument);
}

function animatePress(currentInstrument) {
    $("#" + currentInstrument).addClass("pressed");
    setTimeout(function(){
        $("#" + currentInstrument).removeClass("pressed");
    }, 300);
}

function playInstrument(instrumentName) {
    var sound = new Audio("sounds/" + instrumentName + ".mp3")
    sound.play();
}

var started = false;
var level = 0;
$(document).keydown(function(){
    if(started == false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})

$(".btn").click(function(e){
    if(started == true) {
        var userChosenInstrument = $(this).attr("id");
        userSequence.push(userChosenInstrument);
        animatePress(userChosenInstrument);
        playInstrument(userChosenInstrument);
        checkAnswer(userSequence.length - 1);
    }
})

function checkAnswer(currentLevel) {
    if(userSequence[currentLevel] == gameSequence[currentLevel]) {
        if(userSequence.length == gameSequence.length) {
            console.log("correct")
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("incorrect");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");            
        }, 2000);
        playInstrument("wrong");
        $("#level-title").text("You Lost At Level " + level);
        setTimeout(() => {
            $("#level-title").fadeOut().text("Press Any Key To Restart").fadeIn();
        }, 5000);    
        restart();
    }
}
function restart() {
    gameSequence = [];
    userSequence = [];
    level = 0;
    started = false;
}

// For Mobile Phones and Tablets

var width = window.innerWidth;
if (width < 890) {
  instrument = ["guitar", "drum", "horn", "kalimba"];
  $("#level-title").text("Tap Here To Start");
  var started = false;
  var level = 0;
  $("#level-title").click(() => {
    if(started == false) {
        nextSequence();
        $("#level-title").text("Playing at level " + level);
        started = true;
    }
  })
  function nextSequence() {
    userSequence =[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomInstrument = instrument[randomNumber];
    playInstrument(randomInstrument);
    $("#" + randomInstrument).fadeIn().fadeOut().fadeIn();
    gameSequence.push(randomInstrument);
}

function checkAnswer(currentLevel) {
    if(userSequence[currentLevel] == gameSequence[currentLevel]) {
        if(userSequence.length == gameSequence.length) {
            console.log("correct")
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("incorrect");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");            
        }, 2000);
        playInstrument("wrong");
        $("#level-title").text("You Lost At Level " + level);  
        setTimeout(() => {
            $("#level-title").fadeOut().text("Tap Here To Restart").fadeIn(); 
        }, 5000);
        restart();
    }
}
}

