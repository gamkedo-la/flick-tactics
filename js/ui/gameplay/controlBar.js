
function controlBarUISetup(fontSize) {
    controlBar = [];
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    actionPointsLabel = new Label(tr(), "AP: " + getPlayer().actionPoints.toString(),
        fontSize.toString() + "px " + uiContext.fontFamily);
    controlBar.push(actionPointsLabel);
    resetTurnBtn = new TextButton(tr(),
        new Label(tr(), "Reset", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(resetTurnBtn);
    endTurnBtn = new TextButton(tr(),
        new Label(tr(), "END", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(endTurnBtn);
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    gameplay.push(new FlexGroup(tr(vec2(0.01, 0.01), vec2(gameWidth, 25 * pixelSize)),
        new SubState(tr(), controlBar), false, vec2(10 * pixelSize, 0), vec2(9, 1), true));
}

function disableControlBar()
{
    for(let i = 0; i < controlBar.length; i++)
        controlBar[i].enabled = false;
}

function enableControlBar()
{
    for(let i = 0; i < controlBar.length; i++)
        controlBar[i].enabled = true;
}