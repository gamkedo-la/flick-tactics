const HELP = 9;
var help = [];
var helpFromGameplay = false;

var helpList = [
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
{ text: "a lot of help.", color: "white" },
{ text: "a lot of help.", color: "red" },
];

function helpSetup() {
    var fontStr = (12 * pixelSize).toString() + "px " + uiContext.fontFamily;

    helpLabelGroup = [];
    for(var i = 0; i < helpList.length; i++) {
        helpLabelGroup.push(new Label(tr(), helpList[i].text, fontStr, helpList[i].color));
    }

    help.push(new FlexGroup(tr(vec2(0, 20 * pixelSize), vec2(gameWidth, gameHeight - (44 * pixelSize))),
        new SubState(tr(), helpLabelGroup), false, vec2(), vec2(1, helpList.length), true));

    helpToStartButton = new TextButton(tr(vec2(gameWidth - (80 * pixelSize), gameHeight - (40 * pixelSize)), vec2(80 * pixelSize, 40 * pixelSize)),
        new Label(tr(), "BACK", fontStr, "lightblue"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    help.push(helpToStartButton);
}

function helpResize() {
    var fontStr = (12 * pixelSize).toString() + "px " + uiContext.fontFamily;

    for (let i = 0; i < helpLabelGroup.length; i++) {
        helpLabelGroup[i].font = fontStr;
    }
    helpToStartButton.label.font = fontStr;

    help[0].transform.position = vec2(0, 20 * pixelSize);
    help[0].transform.scale = vec2(gameWidth, gameHeight / 2);

    helpToStartButton.transform.position = vec2(gameWidth - (80 * pixelSize), gameHeight - (20 * pixelSize));
    helpToStartButton.transform.scale = vec2(80 * pixelSize, 20 * pixelSize);
}

function helpDraw(deltaTime) {
    drawWorldMapBG("#222222EE");
}

function helpUpdate(deltaTime) {
}

function helpEvent(deltaTime) {
    switch (helpToStartButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(helpToStartButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                helpToStartButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = helpFromGameplay ? GAMEPLAY : STARTSCREEN;
            helpFromGameplay = false;
            helpToStartButton.button.resetOutput();
    }
}