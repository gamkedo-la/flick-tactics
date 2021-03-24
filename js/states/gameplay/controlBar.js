
function controlBarUISetup(fontSize) {
    controlBar = [];

    if(!isMobile()) {
        controlBar.push(new Label(tr(), ""));
        controlBar.push(new Label(tr(), ""));
    }

    controlHomeBtn = new TextButton(tr(),
        new Label(tr(), "To Base", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(controlHomeBtn);

    moneyLabel = new Label(tr(), getPlayer().money.toString() + "$",
        fontSize.toString() + "px " + uiContext.fontFamily);
    controlBar.push(moneyLabel);

    turnLabel = new Label(tr(), "Turn " + manager.turnCount.toString(),
        fontSize.toString() + "px " + uiContext.fontFamily);
    controlBar.push(turnLabel);

    actionPointsLabel = new Label(tr(), "AP: " + getPlayer().actionPoints.toString(),
        fontSize.toString() + "px " + uiContext.fontFamily);
    controlBar.push(actionPointsLabel);
    
    resetTurnBtn = new TextButton(tr(),
        new Label(tr(), "Reset", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(resetTurnBtn);

    if(!isMobile())
        controlBar.push(new Label(tr(), ""));

    controlMenuBtn = new TextButton(tr(),
        new Label(tr(), "Menu", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(controlMenuBtn);

    gameplay.push(new FlexGroup(isMobile() ?
        tr(vec2(0.001, 0.001), vec2(gameWidth, 40 * pixelSize))
        : tr(vec2(0.001, 0.001), vec2(gameWidth, 25 * pixelSize)),
        new SubState(tr(), isMobile() ? [resetTurnBtn, controlHomeBtn, controlMenuBtn, moneyLabel, turnLabel, actionPointsLabel] : controlBar),
        false, vec2(10 * pixelSize, 0), isMobile() ? vec2(3, 1) : vec2(9, 1), true));
}

function controlBarUIUpdate() {
    moneyLabel.text = getPlayer().money.toString() + "$";
    actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
    if(getPlayer().actionPoints <= 2) {
        actionPointsLabel.textColor = "#FFBBBB";
        if(getPlayer().actionPoints > 0 && gameTime % (600 * getPlayer().actionPoints) < (300 * getPlayer().actionPoints))
            actionPointsLabel.text = "";
    } else {
        actionPointsLabel.textColor = "white";
    }
    turnLabel.text = "Turn " + manager.turnCount.toString();
}

function stepBackAction() {
    if(getPlayer().getSelectedMapUnit().up == 0)
        getPlayer().getSelectedMapUnit().up = 1;
    else if(getPlayer().getSelectedMapUnit().left == 0)
        getPlayer().getSelectedMapUnit().left = 1;
    else if(getPlayer().getSelectedMapUnit().right == 0)
        getPlayer().getSelectedMapUnit().right = 1;
    else
        return false;
    return true;
}

function controlBarUIEvents() {
    switch (controlHomeBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(controlHomeBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                controlHomeBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);

            var hqIndex = getPlayer().getHQUnitIndex();
            if(hqIndex > -1) getPlayer().selectedIndex = hqIndex;
            else manager.endTurn();

            controlHomeBtn.button.resetOutput();
    }
    switch (resetTurnBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(resetTurnBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                resetTurnBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            if(!stepBackAction()) manager.restoreState();
            resetTurnBtn.button.resetOutput();
    }
    switch (controlMenuBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(resetTurnBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                resetTurnBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            versusBtn.label.text = "PLAY NEW";
            continueBtn.enabled = true;
            ui.transitionToState = STARTSCREEN;
            resetTurnBtn.button.resetOutput();
    }
}

function controlBarDisable() {
    for(let i = 0; i < controlBar.length; i++)
        controlBar[i].enabled = false;
}

function controlBarEnable() {
    for(let i = 0; i < controlBar.length; i++)
        controlBar[i].enabled = true;
}