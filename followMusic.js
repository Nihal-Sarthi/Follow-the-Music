// For Laptops and Computers

var instrument = ["guitar", "bell", "drum", "flute", "horn", "kalimba"];
var gameSequence = [];
var userSequence = [];

function nextSequence() {
  userSequence = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 6);
  var randomInstrument = instrument[randomNumber];
  playInstrument(randomInstrument);
  $("#" + randomInstrument)
    .fadeIn()
    .fadeOut()
    .fadeIn();
  gameSequence.push(randomInstrument);
}

function animatePress(currentInstrument) {
  $("#" + currentInstrument).addClass("pressed");
  setTimeout(function () {
    $("#" + currentInstrument).removeClass("pressed");
  }, 300);
}

function playInstrument(instrumentName) {
  var sound = new Audio("sounds/" + instrumentName + ".mp3");
  sound.play();
}

var started = false;
var level = 0;
$("#level-title").click(() => {
  if (started == false) {
    $("#level-title").fadeOut(120).fadeIn(90);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  if (started == true) {
    var userChosenInstrument = $(this).attr("id");
    userSequence.push(userChosenInstrument);
    animatePress(userChosenInstrument);
    playInstrument(userChosenInstrument);
    checkAnswer(userSequence.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (userSequence[currentLevel] == gameSequence[currentLevel]) {
    if (userSequence.length == gameSequence.length) {
      console.log("correct");
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("incorrect");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 2000);
    playInstrument("wrong");
    $("#level-title").text("Game Over On Level " + level);
    setTimeout(() => {
      $("#level-title")
        .fadeOut()
        .html(
          '<button class="start-button"><img src="images/start-button.png" alt="start button" id="start-icon"></button>'
        )
        .fadeIn();
      $("#restart-icon").addClass("show");
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

$("#instructions").click(function () {
  $("#instructions").fadeOut(100).fadeIn(100);
  $("#description").toggle();
});

// For Mobile Phones and Tablets

var width = window.innerWidth;
if (width < 920) {
  instrument = ["guitar", "drum", "horn", "kalimba"];

  function nextSequence() {
    userSequence = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomInstrument = instrument[randomNumber];
    playInstrument(randomInstrument);
    $("#" + randomInstrument)
      .fadeIn()
      .fadeOut()
      .fadeIn();
    gameSequence.push(randomInstrument);
  }

  function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] == gameSequence[currentLevel]) {
      if (userSequence.length == gameSequence.length) {
        setTimeout(nextSequence, 1000);
      }
    } else {
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 2000);
      playInstrument("wrong");
      $("#level-title").text("Game Over on Level " + level);
      setTimeout(() => {
        $("#level-title").fadeOut();
        $("#level-title")
          .html(
            '<button class="start-button"><img src="images/start-button.png" alt="start button" id="start-icon"></button>'
          )
          .fadeIn();
      }, 5000);
      restart();
    }
  }
}
