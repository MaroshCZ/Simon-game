
var buttonColours= ['red','blue','green','yellow'];
// Creating empty arrays at the start, so code will flow properly
var userClickedPattern= [];
var gamePattern=[];
var level= 0;


  function nextSequence() {
    userClickedPattern= []
    var randomNumber= Math.floor(Math.random()*4);                    // Generating random colour and saving it to pattern- random number

    var randomChosenColour= buttonColours[randomNumber];              // Choosing colour with random number

    gamePattern.push(randomChosenColour);                             // Saving chosen colour to pattern

    $('#'+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  // Assigning flash to button with id of current randomChosenColour

    playSound(randomChosenColour)            // Calling function playSound with randomChosenColour

    level= level + 1;

    $('h1').html('Level ' + level)            // Changing levels
  }


// Detecting colour of button clicked by user and saving it to pattern
$('.btn').click(function(){

  var userChosenColour = $(this).attr('id');

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour)               // Calling function playSound with userChosenColour
  animatePress(userChosenColour)           // Calling function animatePress with userChosenColour
  checkAnswer(userClickedPattern.length - 1)
})

// Creating function which will play sound for given name- button colour
function playSound(name) {
  var myAudio = new Audio('sounds/'+ name + '.mp3')
  myAudio.play();
}

// Creating function which will add class pressed to btn with id of inputed colour
// and using add/removeClass as queue items so we can use delay which is que item by default
function animatePress(currentColour) {
 $('#'+ currentColour).queue(function() {
   $(this).addClass('pressed').dequeue()
 })
   .delay(200).queue(function(){
   $(this).removeClass('pressed').dequeue();
 })
}

// If we needed to use this more we can write our own extension and create own function queueRemoveClass
 $.fn.queueRemoveClass = function(className) {
 this.queue('fx', function(next) {
        $(this).removeClass(className);
        next();
    });
     return this;
};


// With this function, we can start the game by keypress, but only when it isnt started already (level= 0)
$(document).keydown(function() {
  if (level === 0) {
    nextSequence()
  }
  else {
    alert('You have already started')
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  if (gamePattern.length === userClickedPattern.length) {
   setTimeout(nextSequence, 1000);
  }
  }
  else  {
    $('body').addClass('game-over').delay(500).queueRemoveClass('game-over')
    $('h1').html('Game Over, Press Any Key to Restart')
    startOver()
  }
}

function startOver() {
  level= 0;
  gamePattern= [];
}
