const VERSUS = 6;
var versus = [];

var versusTeamID = -1;
var versusMapString = "";
var versusMapIndex = 0;

function versusSetup() {
    versusLoadBtn = document.getElementById('file-input2');
    versusLoadBtn.onchange = e => {
        let reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.addEventListener('load', e => {
            versusMapString = e.target.result;
            versusMap = new GameMap(versusMapString);
            versusManager = new PlayerManager(versusMap);
            versusLoadBtn = document.getElementById('file-input2');
        });
    }

    versusMapString = readFile("maps/map0.txt");
    versusMap = new GameMap(versusMapString);
    versusManager = new PlayerManager(versusMap);

    var fontSize = ((isMobile() ? 28 : 18) * pixelSize);

    versusTopRightUI = [];
    if(!isMobile()) {
        versusTopRightUI.push(new Label(tr()));
        versusTopRightUI.push(new Label(tr()));
    }
    versusLoadMapBtn = new TextButton(tr(),
        new Label(tr(), "LOAD EXT. MAP",
    fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusTopRightUI.push(versusLoadMapBtn);
    versusChangeMapBtn = new TextButton(tr(),
        new Label(tr(), "CHANGE MAP (" + (versusMapIndex + 1).toString() + ")",
        fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusTopRightUI.push(versusChangeMapBtn);

    versus.push(new FlexGroup(isMobile() ?
        tr(vec2(0.001, (gameWidth*(MAP_SIZE.y/MAP_SIZE.x)) + ((pixelSize / 4) * 1024)), vec2(gameWidth, ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x))))
        : tr(vec2((gameWidth / 2), 0.001), vec2(gameWidth / 2, ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x)))),
        new SubState(tr(), versusTopRightUI), false, vec2(0.001, 0.001), vec2(2, isMobile() ? 2 : 3), true));

    versusBottomRightUI = [];
    versusTeamBtn = new TextButton(tr(),
        new Label(tr(), "SELECT TEAM",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#002299FF"), "");
    versusBottomRightUI.push(versusTeamBtn);
    versusUserAIToggleBtn = new TextButton(tr(),
        new Label(tr(), "NONE",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#002299FF"), "");
    versusBottomRightUI.push(versusUserAIToggleBtn);

    fillerLabel = new Label(tr());
    versusBottomRightUI.push(fillerLabel);
    versusBottomRightUI.push(fillerLabel);

    versusMoney = 5000;
    versusAP = 5;
    versusMoneyBtn = new TextButton(tr(),
        new Label(tr(), "STARTING MONEY: " + versusMoney.toString() + "$",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusBottomRightUI.push(versusMoneyBtn);
    versusDeployDelayBtn = new TextButton(tr(),
        new Label(tr(), "DEPLOY DELAY: ON",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusBottomRightUI.push(versusDeployDelayBtn);
    versusAPBtn = new TextButton(tr(),
        new Label(tr(), "AP PER TURN: " + versusAP.toString(),
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#22228866", "#FFFFFFFF", "#002299FF"), "");
    versusBottomRightUI.push(versusAPBtn);

    versusBottomRightUI.push(fillerLabel);

    versusToMenuBtn = new TextButton(tr(),
        new Label(tr(), "BACK",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusBottomRightUI.push(versusToMenuBtn);
    versusPlayMapBtn = new TextButton(tr(),
        new Label(tr(), "PLAY",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#662200FF"), "");
    versusBottomRightUI.push(versusPlayMapBtn);

    versus.push(new FlexGroup(isMobile() ?
        tr(vec2(0.001, ((gameWidth * 1.5) * (MAP_SIZE.y/MAP_SIZE.x)) + ((pixelSize / 4) * 1024)), vec2(gameWidth, gameHeight - ((gameWidth * 1.5) * (MAP_SIZE.y/MAP_SIZE.x)) - ((pixelSize / 4) * 1024)))
        : tr(vec2((gameWidth / 2), ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x))), vec2(gameWidth / 2, gameHeight - ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x)))),
        new SubState(tr(), versusBottomRightUI), false, vec2(0.001, 0.001), vec2(2, 5), true));

    versusBottomLeftUI = [];

    if(!isMobile()) {
        versusBottomLeftUI.push(fillerLabel);
        versusBottomLeftUI.push(fillerLabel);
        versusBottomLeftUI.push(fillerLabel);
        versusBottomLeftUI.push(fillerLabel);
        versusBottomLeftUI.push(fillerLabel);
        versusBottomLeftUI.push(fillerLabel);
    }
    versusBottomLeftUI.push(fillerLabel);
    versusBottomLeftUI.push(fillerLabel);
    versusCOName = new Label(tr(), "", fontSize.toString() + "px " + uiContext.fontFamily);
    versusBottomLeftUI.push(versusCOName);
    versusCOPower = new Label(tr(), "", Math.floor(fontSize/1.25).toString() + "px " + uiContext.fontFamily);
    versusBottomLeftUI.push(versusCOPower);
    versusCODesc = new Label(tr(), "", Math.floor(fontSize/1.5).toString() + "px " + uiContext.fontFamily);
    versusBottomLeftUI.push(versusCODesc);
    versusBottomLeftUI.push(fillerLabel);

    versus.push(new FlexGroup(isMobile() ?
    tr(vec2(0.001, ((pixelSize / 4) * 512)), vec2(gameWidth, ((pixelSize / 4) * 512)))
    : tr(vec2(0.001, ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x))), vec2(gameWidth / 2, gameHeight - ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x)))),
        new SubState(tr(), versusBottomLeftUI), false, vec2(0.001, 0.001), vec2(1, isMobile() ? 6 : 12), true));
}

function versusResize() {
}

function versusDraw(deltaTime) {
    drawWorldMapBG("#116611DD");
    //drawPerspectiveUnitsBG(RUIN_BUILDING, TELEPORT_MECH, ARTILLERY_MECH, BLACK_TEAM);
    drawRect(renderer, vec2(), vec2(gameWidth, gameHeight), true, "#00000088");

    if(ui.transitionToState != GAMEPLAY)
    {
        if(isMobile()) {
            versusMap.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x).add(vec2(0, (pixelSize/4) * 1024)), toVec2(gameWidth));
            versusManager.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x).add(vec2(0, (pixelSize/4) * 1024)), toVec2(gameWidth));
        } else {
            versusMap.drawInRect(toVec2((gameWidth/4)/MAP_SIZE.x), toVec2(gameWidth/2));
            versusManager.drawInRect(toVec2((gameWidth/4)/MAP_SIZE.x), toVec2(gameWidth/2));
        }
    }

    var COoffset = isMobile() ? (gameWidth / 4) : (gameWidth / 8);
    var COheight = isMobile() ? ((pixelSize / 4) * 512) : gameHeight - ((pixelSize / 4) * 512);

    //Dark CO bodies
    spritesRenderer.globalCompositeOperation = "overlay";
    for(let i = 0; i < 4; i++) {
        var co = i == 0 ? ZAREEM : i == 1 ? TAJA : i == 2 ? GURU : i;
        var pl = versusManager.getPlayerOfTeamID(i);
        if(pl != -1 && pl.getHQUnitIndex() != -1) {
            bodyNFacesSheet.transform.position = vec2((COoffset/2) + (COoffset * co), COheight);
            bodyNFacesSheet.transform.scale = toVec2(pixelSize / 4);
            bodyNFacesSheet.drawScIn(vec2(1024 * co), toVec2(1024));
        }
    }
    spritesRenderer.globalCompositeOperation = "source-over";

    //Highlighting Team's HQ upon selection
    var co = versusTeamID == 0 ? ZAREEM : versusTeamID == 1 ? TAJA : versusTeamID == 2 ? GURU : versusTeamID;
    var pl = versusManager.getPlayerOfTeamID(versusTeamID);
    if(pl != -1 && pl.getHQUnitIndex() != -1) {
        drawCircle(renderer, pl.unitGroup.mapUnits[pl.getHQUnitIndex()].unit.position,
            16.0*pixelSize, false, "white", 4.0*pixelSize);

        //Selected CO body
        bodyNFacesSheet.transform.position = vec2((COoffset/2) + (COoffset * co), COheight);
        bodyNFacesSheet.transform.scale = toVec2(pixelSize / 4);
        bodyNFacesSheet.drawScIn(vec2(1024 * co), toVec2(1024));
    }
}

function versusUpdate(deltaTime) {
    if(versusManager.isPlayable()) {
        versusPlayMapBtn.label.text = "PLAY";
        versusPlayMapBtn.button.output == UIOUTPUT_RUNNING;
    } else {
        versusPlayMapBtn.label.text = "NOT PLAYABLE";
        versusPlayMapBtn.button.output == UIOUTPUT_DISABLED;
    }
}

function versusPlay() {
    gameplayReset();

    map = new GameMap(versusMapString);
    manager = new PlayerManager(map);

    manager.actionPointsPerTurn = versusManager.actionPointsPerTurn;
    var plIndexSet = false;
    for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].actionPoints = versusAP;
    for(let tid = 0; tid < 4; tid++) {
        var vpl = versusManager.getPlayerOfTeamID(tid);
        var pl = manager.getPlayerOfTeamID(tid);
        pl.control = vpl.control;
        pl.money = versusMoney;//vpl.money;
        pl.deployDelay = vpl.deployDelay;
        pl.actionPoints = vpl.actionPoints;
        if(pl.control == -1) pl.nullify();
        else if(!plIndexSet) {
            manager.index = tid;
            plIndexSet = true;
        }
    }
    ui.transitionToState = GAMEPLAY;
    maxDisplayTilesPerRow = defaultTilesPerRow;
    updateTileSizes();
    updateUnitActionButtons();

    manager.saveState();
}

function editorToVersus( mapString ) {
    versusMapString = mapString;
    versusMap = new GameMap(versusMapString);
    versusManager = new PlayerManager(versusMap);
    ui.transitionToState = VERSUS;
}

function versusEvent(deltaTime) {

    switch (versusLoadMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusLoadMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusLoadMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            versusLoadBtn.click();
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].money = versusMoney;
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].deployDelay = (versusDeployDelayBtn.label.text == "DEPLOY DELAY: ON");
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].actionPoints = versusAP;
            versusManager.actionPointsPerTurn = versusAP;
            versusLoadMapBtn.button.resetOutput();
    }

    switch (versusChangeMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusChangeMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusChangeMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            versusMapIndex++;
            if(versusMapIndex >= TOTAL_DEFAULT_MAPS) versusMapIndex = 0;
            versusChangeMapBtn.label.text = "CHANGE MAP (" + (versusMapIndex + 1).toString() + ")";
            versusMapString = readFile("maps/map" + versusMapIndex.toString() + ".txt");
            versusMap = new GameMap(versusMapString);
            versusManager = new PlayerManager(versusMap, 1);
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].money = versusMoney;
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].deployDelay = (versusDeployDelayBtn.label.text == "DEPLOY DELAY: ON");
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].actionPoints = versusAP;
            versusManager.actionPointsPerTurn = versusAP;
            versusChangeMapBtn.button.resetOutput();
    }

    switch (versusTeamBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusTeamBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusTeamBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            var limit = 10;
            do {
            versusTeamID++;
            if(versusTeamID > BLACK_TEAM) versusTeamID = RED_TEAM;

            var pl = versusManager.getPlayerOfTeamID(versusTeamID);
            limit--;
            } while(pl == -1 && limit > 0);

            switch(versusTeamID)
            {
                case RED_TEAM:
                    versusTeamBtn.label.text = "RED";
                    versusTeamBtn.button.btnColor = versusTeamBtn.button.defColor = "#660000BB";
                    versusCOName.text = COSPECIFICS[ZAREEM].name;
                    versusCOPower.text = COSPECIFICS[ZAREEM].powerName;
                    versusCODesc.text = COSPECIFICS[ZAREEM].powerDesc;
                    break;
                case BLUE_TEAM:
                    versusTeamBtn.label.text = "BLUE";
                    versusTeamBtn.button.btnColor = versusTeamBtn.button.defColor = "#000066BB";
                    versusCOName.text = COSPECIFICS[TAJA].name;
                    versusCOPower.text = COSPECIFICS[TAJA].powerName;
                    versusCODesc.text = COSPECIFICS[TAJA].powerDesc;
                    break;
                case GREEN_TEAM:
                    versusTeamBtn.label.text = "GREEN";
                    versusTeamBtn.button.btnColor = versusTeamBtn.button.defColor = "#006600BB";
                    versusCOName.text = COSPECIFICS[GURU].name;
                    versusCOPower.text = COSPECIFICS[GURU].powerName;
                    versusCODesc.text = COSPECIFICS[GURU].powerDesc;
                    break;
                case BLACK_TEAM:
                    versusTeamBtn.label.text = "BLACK";
                    versusTeamBtn.button.btnColor = versusTeamBtn.button.defColor = "#000000BB";
                    versusCOName.text = COSPECIFICS[HULU].name;
                    versusCOPower.text = COSPECIFICS[HULU].powerName;
                    versusCODesc.text = COSPECIFICS[HULU].powerDesc;
                    break;
            }

            switch(pl.control)
            {
                case 0:
                    versusUserAIToggleBtn.label.text = "USER";
                    versusUserAIToggleBtn.button.btnColor = versusUserAIToggleBtn.button.defColor = "#66660066";
                    break;
                case 1:
                    versusUserAIToggleBtn.label.text = "AI (Work in Progress)";
                    versusUserAIToggleBtn.button.btnColor = versusUserAIToggleBtn.button.defColor = "#00666666";
                    break;
                case -1:
                    versusUserAIToggleBtn.label.text = "NONE";
                    versusUserAIToggleBtn.button.btnColor = versusUserAIToggleBtn.button.defColor = "#00000066";
                    break;
            }

            versusTeamBtn.button.resetOutput();
    }

    switch (versusUserAIToggleBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusUserAIToggleBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusUserAIToggleBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            var pl = versusManager.getPlayerOfTeamID(versusTeamID);
            if(pl == -1) break;

            switch(pl.control)
            {
                case -1:
                    pl.control = 0;
                    versusUserAIToggleBtn.label.text = "USER";
                    versusUserAIToggleBtn.button.btnColor = versusUserAIToggleBtn.button.defColor = "#66660066";
                    break;
                case 0:
                    pl.control = 1;
                    versusUserAIToggleBtn.label.text = "AI (Work in Progress)";
                    versusUserAIToggleBtn.button.btnColor = versusUserAIToggleBtn.button.defColor = "#00666666";
                    break;
                case 1:
                    pl.control = -1;
                    versusUserAIToggleBtn.label.text = "NONE";
                    versusUserAIToggleBtn.button.btnColor = versusUserAIToggleBtn.button.defColor = "#00000066";
                    break;
            }

            versusUserAIToggleBtn.button.resetOutput();
    }

    switch (versusMoneyBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusMoneyBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusMoneyBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            switch(versusMoney) {
                case 0: versusMoney = 5000; break;
                case 5000: versusMoney = 10000; break;
                case 10000: versusMoney = 25000; break;
                case 25000: versusMoney = 50000; break;
                case 50000: versusMoney = 0; break;
                default: versusMoney = 5000;
            }
            versusMoneyBtn.label.text = "STARTING MONEY: " + versusMoney.toString() + "$";
            for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].money = versusMoney;
            versusMoneyBtn.button.resetOutput();
    }

    switch (versusDeployDelayBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusDeployDelayBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusDeployDelayBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            if(versusDeployDelayBtn.label.text == "DEPLOY DELAY: ON") {
                versusDeployDelayBtn.label.text = "DEPLOY DELAY: OFF";
                for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].deployDelay = false;
            } else {
                versusDeployDelayBtn.label.text = "DEPLOY DELAY: ON";
                for(let i = 0; i < versusManager.players.length; i++) versusManager.players[i].deployDelay = true;
            }

            versusDeployDelayBtn.button.resetOutput();
    }

    switch (versusAPBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusAPBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusAPBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            switch(versusAP) {
                case 3: versusAP = 5; break;
                case 5: versusAP = 10; break;
                case 10: versusAP = 15; break;
                case 15: versusAP = 3; break;
                default: versusAP = 5;
            }
            versusAPBtn.label.text = "AP PER TURN: " + versusAP.toString();
            versusManager.actionPointsPerTurn = versusAP;
            versusAPBtn.button.resetOutput();
    }

    switch (versusToMenuBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusToMenuBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusToMenuBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            maxDisplayTilesPerRow = defaultTilesPerRow;
            updateTileSizes();
            ui.transitionToState = STARTSCREEN;
            versusToMenuBtn.button.resetOutput();
    }

    switch (versusPlayMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusPlayMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusPlayMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            if(versusPlayMapBtn.label.text == "PLAY") {
                versusPlay();
                playSFX(SFX_BUTTON_CLICK);
                versusPlayMapBtn.button.resetOutput();
            }
    }
}