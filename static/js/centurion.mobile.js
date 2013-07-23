/// <reference path="../Libs/jquery-1.5.1-vsdoc.js" />

var secondsPerTick = 60;
var intervalShots = secondsPerTick * 1000;

var timeRem = secondsPerTick;
var nbShotsTaken = 0;
var nbShotsToTake = 100;
var paused = false;
var initialized = false;

function initialize() {
    if (!(initialized)) {
        $("#aStart").click(function () { return startGame(); });
        $('#pauser').change(function (event, ui) { togglePauseGameMobile(); });
        initialized = true;
    }
}

function startGame() {
    setInterval(shotTick, intervalShots);
    setInterval(decreaseTime, 1000);
    setShotsText();
    setTimeText();
    $(".start").hide();
    $(".game").show();
    $("#aUnpause").hide();
    return false;
}

function togglePauseGameMobile() {
    paused = !paused;
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
    $("#shotsTaken").text(nbShotsTaken);
    $("#shotsToTake").text("/" + nbShotsToTake);
}

function shotTick() {
    if (!(paused)) {
        $("#song").get(0).play();
        nbShotsTaken++;
        timeRem = secondsPerTick;
        setShotsText();
        checkVictory();
    }
}

function checkVictory() {
    return false;
}

function setBody() {
    $('#mainContent').height($(window).height() - $("footer").height() - $("header").height() - 18 );
    $("div.ui-page-active").trigger('pagecreate')
}

$(window).resize(function () {
    setBody();
});

$(document).bind('pageinit', function () {
    initialize();
    setBody();
});

$(document).ready(function () { setShotsText(); setBody(); });