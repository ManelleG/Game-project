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
    this.position = 10;
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
    $("#10").addClass("computer");
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

    if (this.position === 10 || $("#" + nextTile).hasClass("computer")){
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

    if ($("#" + previousTile).hasClass("player") || $("#" + nextTile).hasClass("computer")){
        if (this.isPlayer){
            console.log("player is attacking!");
            computer.health -=5;
            console.log(computer.health);
        }
        else {
            player.health -= 5;
            console.log(this.health);
        }
    }
    else {
        console.log("no one to attack");
    }

}


//Fonction Is the game over?
Character.prototype.isGameOver = function () {
    if (this.health === 100){
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
        }
    }
}




$(document).ready(function() {
    $(".btn-start").click(function () {
        $(this).remove();
        $(".board").addClass("game-on");
        startNewGame();
        player.mouvement();

    });
});