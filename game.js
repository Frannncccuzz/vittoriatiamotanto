

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function playSound(color){
    let sound = new Audio(`./sounds/${color}.mp3`);
    return sound.play();
}



function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4)
    let buttonColours = ["red", "blue", "green", "yellow"];
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").html(`LEVEL ${level}`);
}



$(".btn").on("click", (Event) => {
    let userChosenColour = Event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    let currentLevel = userClickedPattern.length - 1;
    checkAnswer(currentLevel)
})

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");     
    }, 100);
}

$(".start").on("click", ()=>{
    if(!started){
        started=true;
        nextSequence();
    }
  

})

function checkAnswer(currentLvl){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[currentLvl] === gamePattern[currentLvl]){
        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(() => {
                nextSequence();      
        }, 1000);

        }    
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");      
        }, 200);
        $("h1").html("Game Over, Click button to restart")
        startOver();
    }

}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;

}