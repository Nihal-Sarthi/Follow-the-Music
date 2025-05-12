// For Laptops and big screen devices

// Game start
var gameInstruments = ["guitar", "bell", "drum", "flute", "horn", "kalimba"];
var gamePattern = [];
var playerPattern = [];

let gameStarted = false;
let level = 0;

// Start Game
$("#start-button").on("click", () => {
  if (gameStarted === false) {
    gameStarted = true;
    setTimeout(nextPattern, 600); // Start the game after a short delay
  }
});

// create pattern
function nextPattern() {
  $("#start-button").hide("fast");
  level++;
  playerPattern = [];
  $("#level-title").html(`Level: ${level}`);
  $("#level-title").show("fast");
  let randomNumber = Math.floor(Math.random() * gameInstruments.length);
  let randomChosenColor = gameInstruments[randomNumber];
  gamePattern.push(randomChosenColor);
  animateButton(randomChosenColor);
  playMusic(randomChosenColor);
}

function animateButton(color) {
  $(`.${color}`).addClass("pressed");
  setTimeout(() => {
    $(`.${color}`).removeClass("pressed");
  }, "400");
}

function playMusic(color) {
  let sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

// Click button
$(".my-btn").on("click", (e) => {
  let buttonId = e.target.id; // To get the id of button clicked
  playerPattern.push(buttonId);
  playMusic(buttonId);
  animateButton(buttonId);
  checkPattern(playerPattern.length - 1); // To compare playerPattern and gamePattern array values
});

// check answer
function checkPattern(currentLevel) {
  if (playerPattern[currentLevel] === gamePattern[currentLevel]) {
    // Comparing each index value of both arrays as each button is clicked
    if (playerPattern.length === gamePattern.length) {
      setTimeout(playEntireGamePattern, 2000); // Wait for 2 seconds before executing playEntireGamePattern()
    }
  } else {
    gameOver();
  }
}

// Repeat previous values and add one more value
function playEntireGamePattern() {
  // Loop through the gamePattern array and play each sound
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      animateButton(gamePattern[i]);
      playMusic(gamePattern[i]);
    }, 800 * i);
  }
  setTimeout(nextPattern, gamePattern.length * 700); // next pattern plays after looping through array
}

function gameOver() {
  $("#level-title").fadeOut(250).fadeIn();
  $("#level-title").html(`Game Over At Level: ${level}`);
  $("body").addClass("game-over");
  playMusic("wrong");
  setTimeout(resetGame, 4000);
}

// Reset Game
function resetGame() {
  gamePattern = [];
  playerPattern = [];
  level = 0;
  gameStarted = false;
  $("body").removeClass("game-over");
  $("#level-title").html(``);
  $("#start-button").show();
}

$("#instructions").click(function () {
  $("#description").toggle();
});

$(".close-btn").click(function () {
  $("#description").hide();
});

// For Mobile Phones and small screen devices

var width = window.innerWidth;

if (width < 825) {
  $("#level-title").hide();

  $("#start-button").on("click", () => {
    if (gameStarted === false) {
      gameStarted = true;
      nextPattern();
    }
  });

  gameInstruments = ["guitar", "bell", "flute", "kalimba"];

  function nextPattern() {
    level++;
    $("#level-title").show("fast");
    $("#start-button").hide("fast");
    $("#level-title").html(`Level: ${level}`);
    playerPattern = [];
    let randomNumber = Math.floor(Math.random() * gameInstruments.length);
    let randomChosenColor = gameInstruments[randomNumber];
    gamePattern.push(randomChosenColor);
    setTimeout(() => {
      animateButton(randomChosenColor);
      playMusic(randomChosenColor);
    }, 700);
  }

  function resetGame() {
    gamePattern = [];
    playerPattern = [];
    level = 0;
    gameStarted = false;
    $("body").removeClass("game-over");
    $("#level-title").hide("slow");
    $("#start-button").show("slow");
  }
}
