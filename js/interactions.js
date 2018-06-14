//Characters constructor

function Character (health, strength){
    this.health = health;
    this.strength = strength;
}

function Player (health, strength) {
    Character.call(this,health, strength);
    this.position = 1;
    this.type = "player";
    this.isPlayer = true;
}

Player.prototype = Object.create(Character.prototype);

function Computer (health, strength) {
    Character.call(this,health, strength);
    this.position = 5;
    this.type = "computer";
    this.isPlayer = false;
}

Computer.prototype = Object.create(Character.prototype);

var computer;
var player;

//Fonction Start new game
function startNewGame() {
    computer = new Computer (100, 2);
    player = new Player (100, 2);
    $("#5").addClass("computer");
    $("#1").addClass("player");

}

//Move Left
Character.prototype.moveLeft = function () {
    var previousTile = (this.position)-1;

    if (this.position === 1 || $("#" + previousTile).hasClass("player")){
        console.log("Can't go further");
    }

    else {
        $("." + this.type).removeClass();
        $("#" + previousTile).addClass(this.type);
        this.position = previousTile;
    }
}

//Move Right
Character.prototype.moveRight = function () {
    var nextTile = (this.position)+1;

    if (this.position === 5 || $("#" + nextTile).hasClass("computer")){
        console.log("Can't move");
    }

    else {
        $("." + this.type).removeClass();
        $("#" + nextTile).addClass(this.type);
        this.position = nextTile;
    }
}


//Fonction d'attaque
Character.prototype.attack = function () {

    var previousTile = (this.position) - 1;
    var nextTile = (this.position) + 1;

    if (this.isPlayer){
        var that = this;
        $("#" + this.position).addClass("attack-player");
        var resetPosition = setTimeout(function () {
            $("#" + that.position).removeClass("attack-player");
        }, 150);
    }
    else{
        var that = this;
        $("#" + this.position).addClass("attack-computer");
        var resetPosition = setTimeout(function () {
            $("#" + that.position).removeClass("attack-computer");
        }, 150);
    }

    if ($("#" + previousTile).hasClass("player") || $("#" + nextTile).hasClass("computer")){
        if (this.isPlayer){
            // computer.health -=5;
            if (computer.receiveDamage()){
                //PLAYER WON!
                $(".board").addClass("player-won");
                $(".computer").removeClass();
                $(".player").removeClass();
            }
            console.log("computer.health " + computer.health)
        }
        else {
            // player.health -= 5;
            if (player.receiveDamage()){
                //COMPUTER WON
                $(".board").addClass("computer-won");
                $(".computer").removeClass();
                $(".player").removeClass();
            }

            console.log("player.health " + player.health);
        }
    }
    // else {
    //     // console.log("no one to attack");
    // }

    $("#" + this.position).addClass(this.type);
}


//Fonction receive damage
Character.prototype.receiveDamage = function () {
    this.health -= 5;
    if (this.health === 0){
            return true;
    }
    return false;
}



// Mouvement du player:
Player.prototype.mouvement = function() {
    document.onkeydown = (e) => {
        switch (e.keyCode){
            //Up arrow
            // case 38:
            //     this.move(0,-1);
            //     break;

            //Down arrow
            // case 40:
            //     this.move(0,1);
            //     break;

            //Left arrow
            case 37:
                this.moveLeft();
                break;
            //Right arrow
            case 39:
                this.moveRight();
                break;
            //Space bar
            case 32:
                this.attack();
                break;
        }
    }
}

Computer.prototype.autoMouvement = function () {
    setInterval(() => {
        var randomFunction = Math.floor(Math.random()*3);
        if (randomFunction === 0){
            this.moveLeft();
        }
        if (randomFunction === 1){
            this.moveRight();
        }
        if (randomFunction === 2){
            this.attack();
        }
    }, Math.floor(Math.random()*600));
}



//Animations:
// var tID; //we will use this variable to clear the setInterval()

// function stopAnimate () {
//     clearInterval(tID);
// }

// function animateScript() {
//     var position = 49.8; //start position for the image slicer
//     const interval = 100; //100 ms of interval for the setInterval()
//     const diff = 49.8;

//     tID = setInterval ( () => {
//         document.getElementById("image").style.backgroundPosition = `-${position}px 0px`;
//         //we use the ES6 template literal to insert the variable "position"
//         if (position < 299){
//             position = position + diff;
//         }
//         //we increment the position by 256 each time
//         else
//         { position = 49.8 }
//         //reset the position to 256px, once position exceeds 1536px
//         }
//         , interval ); //end of setInterval
// } //end of animateScript()

// function stopGame() {
//     var stop = setInterval
// }

$(document).ready(function() {
    $(".btn-start").click(function () {
        $(this).remove();
        $(".board").addClass("game-on");
        startNewGame();
        player.mouvement();

        // "AI":
        computer.autoMouvement();
    });
});