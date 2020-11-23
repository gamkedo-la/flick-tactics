
var dialogueFontSize;
var dialogueSpeaker;
var dialogueLine1;
var dialogueLine2;

var GURU = 0;
var ZAREEM = 1;
var TAJA = 2;
var HULU = 3;
var JONAH = 4;

var dialogueCO = [
    {name: "GURU:", color: "#fbff86"},
    {name: "ZAREEM:", color: "#8ff8e2"},
    {name: "TAJA:", color: "#ea4f36"},
    {name: "HULU:", color: "#ed8099"},
    {name: "JONAH:", color: "#a884f3"}
];

function dialogueSetup(uiArray)
{
    var baseYPosition = gameHeight/1.4;
    dialogueFontSize = 0.04 * gameWidth;

    //var currentTextLineWidth = renderer.measureText('M').width;

    dialogueSpeaker = new Label(tr(vec2(gameWidth/12, baseYPosition),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)),
        dialogueCO[GURU].name, dialogueFontSize + "px " + uiContext.fontFamily, dialogueCO[GURU].color, -1);
    uiArray.push(dialogueSpeaker);
    dialogueLine1 = new Label(tr(vec2(gameWidth/12, baseYPosition + (dialogueFontSize * 1.0)),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)),
        "Welcome to Flick Tactics Zareem! Here, we'll train you to be the",
        dialogueFontSize + "px " + uiContext.fontFamily, "#ffffff", -1);
    uiArray.push(dialogueLine1);
    dialogueLine2 = new Label(tr(vec2(gameWidth/12, baseYPosition + (dialogueFontSize * 2.0)),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)),
        "most powerful strategest the world has ever created!",
        dialogueFontSize + "px " + uiContext.fontFamily, "#ffffff", -1);
    uiArray.push(dialogueLine2);
}

function dialogueDraw()
{
    drawRect(renderer, vec2(gameWidth/16, gameHeight/1.4), vec2(gameWidth - (gameWidth/8), gameHeight/4), true, "#323353", 32);
}