/// <reference path="../Libs/jquery-1.5.1-vsdoc.js" />

var secondsPerTick = 60;
var intervalShots = secondsPerTick * 1000;

var timeRem = secondsPerTick;
var nbShotsTaken = 0;
var nbShotsToTake = 100;
var paused = false;

function initialize() {
    $(".game").hide();
    $("#aStart").click(function () { return startGame(); });
    $("#aPause").click(function () { return togglePauseGame(); });
    $("#aUnpause").click(function () { return togglePauseGame(); });  
}

function startGame() {
    nbShotsTaken = $("#txtNbShotsStart").val();
    setInterval(shotTick, intervalShots);
    setInterval(decreaseTime, 1000);
    setShotsText();
    setTimeText();
    $(".start").hide();
    $(".game").show();
    $("#aUnpause").hide();
    return false;
}

function togglePauseGame() {
    paused = !paused;

    if (paused) {
        $("#aPause").hide();
        $("#aUnpause").show();
    } else {
        $("#aPause").show();
        $("#aUnpause").hide();
    }
    return false;
}

function decreaseTime() {
    if (!(paused)) {
        timeRem--;
        setTimeText();
    }
}

function setTimeText() {
    var rem = timeRem;
    if (rem < 10) { rem = '0' + rem; }
    $("#timeRemaining").text(rem);
}

function setShotsText() {
    $("#shotsTaken").text(nbShotsTaken + '/' + nbShotsToTake);
}

function shotTick() {
    if (!(paused)) {
        $("#song").get(0).play();
        nbShotsTaken++;
        timeRem = secondsPerTick;
        $("#shotsTaken").text(nbShotsTaken + '/' + nbShotsToTake);
        checkVictory();
    }
}

function checkVictory() {
    return false;
}

$(document).ready(function () { initialize(); });