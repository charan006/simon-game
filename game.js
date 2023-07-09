var buttonColours=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var gameStarted=false;
var level=0;
var keypress=false;
$("body").keypress(function(){
    keypress=true;
    if(gameStarted==false){        
        $("#level-title").text("Level "+ level);
        nextSequence();
        gameStarted=true;
        checkAnswer();
    }
  });

$(".btn").click(function(e){
    if(keypress==true){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("correct");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            console.log("Sound played");
          }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gameStarted=false;
    level=0;
    gamePattern=[];
    keypress=false;
}

function playSound(s_name){
    var audio = new Audio("sounds/" + s_name + ".mp3");
    audio.play();
};

function animatePress(id_pressed){
    $("#"+id_pressed).addClass("pressed");
    setTimeout(function() {
        $("#"+id_pressed).removeClass("pressed");
        console.log("Sound played");
      }, 100);
};

function nextSequence(){
    level=level+1;
    $("#level-title").text("Level "+ level);
    userClickedPattern=[]

    randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
