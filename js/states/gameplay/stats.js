var gameplayStatIndex = 0;

function statsUISetup(fontSize) {
    statsGap = vec2(pixelSize * 16, pixelSize * 8);
    statsPos = isMobile() ? vec2(statsGap.x, statsGap.y + (gameHeight/2)) : vec2(statsGap.x + (256 * pixelSize), statsGap.y + (gameHeight/2));
    statsSize = isMobile() ? vec2(gameWidth, (gameHeight/2) - (180 * pixelSize)) : vec2(gameWidth - (256 * pixelSize), gameHeight - (gameHeight/2) - (45 * pixelSize));

    statsCOName = new Label(isMobile() ?
        tr(vec2(0, fontSize * 6.0), vec2(gameWidth, fontSize))
        : tr(vec2(statsPos.x, fontSize * 6.0), vec2(gameWidth, fontSize)),
        "", fontSize.toString() + "px " + uiContext.fontFamily,
        undefined, isMobile() ? 0 : -1);
    gameplay.push(statsCOName);
    statsCOPower = new Label(isMobile() ?
        tr(vec2(0, fontSize * 7.0), vec2(gameWidth, fontSize))
        : tr(vec2(statsPos.x, fontSize * 7.0), vec2(gameWidth, fontSize)),
        "", Math.floor(fontSize/1.25).toString() + "px " + uiContext.fontFamily,
        undefined, isMobile() ? 0 : -1);
    gameplay.push(statsCOPower);
    statsCODesc = new Label(isMobile() ?
        tr(vec2(0, fontSize * 8.0), vec2(gameWidth, fontSize))
        : tr(vec2(statsPos.x, fontSize * 8.0), vec2(gameWidth, fontSize)),
        "", Math.floor(fontSize/1.5).toString() + "px " + uiContext.fontFamily,
        undefined, isMobile() ? 0 : -1);
    gameplay.push(statsCODesc);

    statsGroup = [];
    for (let i = 0; i < 8; i++) statsGroup.push(new Label(tr(), "", fontSize + "px " + uiContext.fontFamily));
    statsPrevBtn = new TextButton(tr(), new Label(tr(), "Prev. CO", fontSize + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"));
    statsGroup.push(statsPrevBtn);
    statsNextBtn = new TextButton(tr(), new Label(tr(), "Next CO", fontSize + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"));
    statsGroup.push(statsNextBtn);

    gameplay.push(new FlexGroup(tr(statsPos, statsSize),
        new SubState(tr(), statsGroup), false, statsGap, vec2(2, 5), true));

    statsDisplayBtn = new TextButton(tr(vec2((gameWidth/2) - (64 * pixelSize), gameHeight - (16 * pixelSize)), vec2(64 * pixelSize, 16 * pixelSize)),
        new Label(tr(), "^", fontSize + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"));
    gameplay.push(statsDisplayBtn);
}

function statsTextUpdate() {
    if(gameTime % 200 < 100 && statsCOName.text != COSPECIFICS[manager.players[gameplayStatIndex].CO].name) {
        statsCOName.text = COSPECIFICS[manager.players[gameplayStatIndex].CO].name + (manager.index == gameplayStatIndex ? " (YOU)" : "");
        statsCOPower.text = COSPECIFICS[manager.players[gameplayStatIndex].CO].powerName;
        statsCODesc.text = COSPECIFICS[manager.players[gameplayStatIndex].CO].powerDesc;

        statsGroup[0].text = "Power Meter: " + Math.floor(manager.players[gameplayStatIndex].powerMeter * 100).toString() + "%";
        statsGroup[2].text = "Income Per Turn: " + manager.players[gameplayStatIndex].getTotalIncome().toString();
        statsGroup[3].text = "City Damage: " + (manager.players[gameplayStatIndex].getTotalIncome() == manager.players[gameplayStatIndex].getTotalIncome(true) ? "No" : "Yes");
        statsGroup[4].text = "Total Buildings: " + manager.players[gameplayStatIndex].getTotalNumberOfBuildings().toString();
        statsGroup[5].text = "Total Mechs: " + manager.players[gameplayStatIndex].getTotalNumberOfMechs().toString();
        statsGroup[6].text = "Total Attack Mechs: " + (manager.players[gameplayStatIndex].getTotalNumberOfMechs(RIFLE_MECH) + manager.players[gameplayStatIndex].getTotalNumberOfMechs(CANNON_MECH) + manager.players[gameplayStatIndex].getTotalNumberOfMechs(ARTILLERY_MECH)).toString();
        statsGroup[7].text = "Total Ability Mechs: " + (manager.players[gameplayStatIndex].getTotalNumberOfMechs(SUPPORT_MECH) + manager.players[gameplayStatIndex].getTotalNumberOfMechs(TELEPORT_MECH)).toString();
    }
}

function statsMobileDraw() {
    for(let i = 0; i < statsGroup.length; i++) statsGroup[i].enabled = true;

    map.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x).add(vec2(0, (pixelSize/4) * 1024)), toVec2(gameWidth));
    manager.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x).add(vec2(0, (pixelSize/4) * 1024)), toVec2(gameWidth));

    var COoffset = gameWidth / 4;
    var COheight = (pixelSize / 4) * 512;

    //Dark CO bodies
    spritesRenderer.globalCompositeOperation = "overlay";
    for(let i = 0; i < manager.players.length; i++) {
        if(manager.players[i] != -1 && manager.players[i].control != -1) {
            bodyNFacesSheet.transform.position = vec2((COoffset/2) + (COoffset * (manager.players[i].CO > HULU ? HULU : manager.players[i].CO)), COheight);
            bodyNFacesSheet.transform.scale = toVec2(pixelSize / 4);
            bodyNFacesSheet.drawScIn(vec2(1024 * manager.players[i].CO), toVec2(1024));
        }
    }
    spritesRenderer.globalCompositeOperation = "source-over";

    drawCircle(renderer, manager.players[gameplayStatIndex].unitGroup.mapUnits[manager.players[gameplayStatIndex].getHQUnitIndex()].unit.position,
        16.0*pixelSize, false, "white", 4.0*pixelSize);

    //Selected CO body
    bodyNFacesSheet.transform.position = vec2((COoffset/2) + (COoffset * (manager.players[gameplayStatIndex].CO > HULU ? HULU : manager.players[gameplayStatIndex].CO)), COheight);
    bodyNFacesSheet.transform.scale = toVec2(pixelSize / 4);
    bodyNFacesSheet.drawScIn(vec2(1024 * manager.players[gameplayStatIndex].CO), toVec2(1024));

    statsCOName.enabled = statsCOPower.enabled = statsCODesc.enabled = true;
    statsTextUpdate();
}

function statsDraw() {
    statsDisplayBtn.enabled = true;

    if(statsDisplayBtn.label.text == "v") {
        statsCOName.enabled = statsCOPower.enabled = statsCODesc.enabled = true;
        for(let i = 0; i < statsGroup.length; i++) statsGroup[i].enabled = true;

        drawRect(renderer, vec2(0, 80 * pixelSize), vec2(gameWidth, 60 * pixelSize), true, "black");

        bodyNFacesSheet.transform.position = vec2(gameWidth / 4, gameHeight - ((pixelSize / 2.0) * 512));
        bodyNFacesSheet.transform.scale = toVec2(pixelSize / 2.0);
        bodyNFacesSheet.drawScIn(vec2(1024 * manager.players[gameplayStatIndex].CO), toVec2(1024));

        drawRect(renderer, statsPos.subtract(statsGap), statsSize.add(statsGap), true, getTeamColor(manager.players[gameplayStatIndex].unitGroup.teamID) + "BB");
        drawRect(renderer, statsPos.subtract(statsGap), statsSize.add(statsGap), true, "#00000066");
    } else {
        statsCOName.enabled = statsCOPower.enabled = statsCODesc.enabled = false;
        for(let i = 0; i < statsGroup.length; i++) statsGroup[i].enabled = false;
    }

    statsTextUpdate();
}

function statsEvent() {
    if(!isMobile()) {
        switch (statsDisplayBtn.button.output) {
            case UIOUTPUT_HOVER:
                if(statsDisplayBtn.button.hoverTrigger) {
                    playSFX(SFX_BUTTON_HOVER);
                    statsDisplayBtn.button.hoverTrigger = false;
                }
                break;

            case UIOUTPUT_SELECT:
                playSFX(SFX_BUTTON_CLICK);
                gameplayStatsIndex = manager.index;
                if(statsDisplayBtn.label.text == "^") statsDisplayBtn.label.text = "v";
                else statsDisplayBtn.label.text = "^";
                statsDisplayBtn.button.resetOutput();
        }
    }
    switch (statsNextBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(statsNextBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                statsNextBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            var limit = 10;
            do {
                gameplayStatIndex++;
                limit++;
                if (gameplayStatIndex >= manager.players.length) {
                    gameplayStatIndex = 0;
                }
            } while ((manager.players[gameplayStatIndex].selectedIndex == -1 || manager.players[gameplayStatIndex].control == -1) && limit < 10)
            statsNextBtn.button.resetOutput();
    }
    switch (statsPrevBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(statsPrevBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                statsPrevBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            var limit = 10;
            do {
                gameplayStatIndex--;
                limit++;
                if (gameplayStatIndex < 0) {
                    gameplayStatIndex = manager.players.length - 1;
                }
            } while ((manager.players[gameplayStatIndex].selectedIndex == -1 || manager.players[gameplayStatIndex].control == -1) && limit < 10)
            statsPrevBtn.button.resetOutput();
    }
}