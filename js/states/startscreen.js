const STARTSCREEN = 0;
var startscreen = [];

function startscreenSetup() {
    var fontSize = 18.0 * pixelSize;

    titleSprite = new Sprite(tr(), new ImageObject("images/title.png"));
    titleSprite.transform.scale = vec2((sizeFactor / 1.8) / titleSprite.imageObject.image.width, (sizeFactor / 4) / titleSprite.imageObject.image.height);
    titleSprite.transform.position = vec2(gameWidth / 2, gameHeight / 4);

    worldmapSprite = new Sprite(tr(), new ImageObject("images/worldMap.png"));
    worldmapSprite.transform.scale = toVec2(pixelSize);
    worldmapAnimationPoints = [
        {pos: vec2(gameWidth/1.25, gameWidth/2.0), sc: pixelSize},
        {pos: vec2(gameWidth/1.25, gameWidth/10.0), sc: pixelSize*0.9},
        {pos: vec2(gameWidth/4.0, gameWidth/12.0), sc: pixelSize*1.1},
        {pos: vec2(gameWidth/20.0, gameWidth/2.0), sc: pixelSize*0.9}
    ];
    worldmapPositionIndex = 0;
    worldmapSprite.transform.position = worldmapAnimationPoints[worldmapPositionIndex].pos;

    startLabel = new Label(tr(vec2(), vec2(gameWidth, gameHeight)), "Touch/Click anywhere to begin.",
        fontSize.toString() + "px " + uiContext.fontFamily);
    startscreen.push(startLabel);

    menuUI = [];
    playButton = new TextButton(tr(),
        new Label(tr(), "PLAY CAMPAIGN",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    menuUI.push(playButton);
    versusButton = new TextButton(tr(),
        new Label(tr(), "PLAY VERSUS",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    menuUI.push(versusButton);
    editorButton = new TextButton(tr(),
        new Label(tr(), "MAP EDITOR",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    menuUI.push(editorButton);
    aboutButton = new TextButton(tr(),
        new Label(tr(), "CREDITS",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    menuUI.push(aboutButton);

    startscreen.push(new FlexGroup(tr(vec2((gameWidth / 2) - (gameWidth / 6), gameHeight / 2.25), vec2(gameWidth / 3, gameHeight / 2.25)),
        new SubState(tr(), menuUI), false, vec2(0, sizeFactor * 0.025), vec2(1, 5), true));
    startscreen[1].enabled = false;

    startscreenUnit = new Unit(RIFLE_MECH, vec2(gameWidth/2, gameHeight/1.75));
}

function startscreenResize() {
    var fontSize = 18.0 * pixelSize;

    titleSprite.transform.scale = vec2((sizeFactor / 1.8) / titleSprite.imageObject.image.width, (sizeFactor / 4) / titleSprite.imageObject.image.height);
    titleSprite.transform.position = vec2(gameWidth / 2, gameHeight / 4);

    playButton.label.font = aboutButton.label.font = fontSize.toString() + "px " + uiContext.fontFamily;

    startscreen[1].transform.position = vec2((gameWidth / 2) - (gameWidth / 6), gameHeight / 2);
    startscreen[1].transform.scale = vec2(gameWidth / 3, gameHeight / 3);
    startscreen[1].gridSpace = vec2(0, sizeFactor * 0.05);
    startscreen[1].updateCellSize();
}

function drawWorldMapBG(tint = "#661111DD")
{
    worldmapSprite.transform.position = moveToVec2(worldmapSprite.transform.position, worldmapAnimationPoints[worldmapPositionIndex].pos, 1.5);
    worldmapSprite.transform.scale = lerpVec2(worldmapSprite.transform.scale, toVec2(worldmapAnimationPoints[worldmapPositionIndex].sc), 0.005);
    if(worldmapSprite.transform.position.distance(worldmapAnimationPoints[worldmapPositionIndex].pos) < 10)
    {
        worldmapPositionIndex++;
        if(worldmapPositionIndex >= worldmapAnimationPoints.length) worldmapPositionIndex = 0;
    }
    worldmapSprite.drawSc();
    drawRect(renderer, vec2(), vec2(gameWidth, gameHeight), true, tint);
}

function drawPerspectiveUnitsBG(unit1, unit2, unit3, team = RED_TEAM)
{
    startscreenUnit.type = unit1;
    startscreenUnit.setupUnitProperties();
    startscreenUnit.draw(team, vec2(-gameWidth/4.0), toVec2(pixelSize/1.25));
    startscreenUnit.type = unit2;
    startscreenUnit.setupUnitProperties();
    startscreenUnit.draw(team, vec2(-gameWidth/3.25, gameHeight/20.0), toVec2(pixelSize));
    startscreenUnit.type = unit3;
    startscreenUnit.setupUnitProperties();
    startscreenUnit.draw(team, vec2(-gameWidth/2.5, gameHeight/10.0), toVec2(pixelSize*1.5));

    renderer.setTransform(-1, 0, 0, 1, gameWidth - 15, 0);
    startscreenUnit.type = unit1;
    startscreenUnit.setupUnitProperties();
    startscreenUnit.draw(team, vec2(-gameWidth/4.0), toVec2(pixelSize/1.25));
    startscreenUnit.type = unit2;
    startscreenUnit.setupUnitProperties();
    startscreenUnit.draw(team, vec2(-gameWidth/3.25, gameHeight/20.0), toVec2(pixelSize));
    startscreenUnit.type = unit3;
    startscreenUnit.setupUnitProperties();
    startscreenUnit.draw(team, vec2(-gameWidth/2.5, gameHeight/10.0), toVec2(pixelSize*1.5));
    renderer.setTransform(1, 0, 0, 1, 0, 0);
}

function startscreenDraw(deltaTime) {
    if(startscreen[1].enabled)
    {
        drawWorldMapBG();
        drawPerspectiveUnitsBG(HQ_BUILDING, RIFLE_MECH, CANNON_MECH);
        titleSprite.drawSc();
    }
    else
    {
        drawRect(renderer, vec2(), vec2(window.innerWidth, window.innerHeight), true, "black");
    }
}

function startscreenUpdate(deltaTime) {
    if(startscreen[1].enabled)
        playBGM(STARTSCREEN);
}

function startscreenEvent(deltaTime) {
    switch (playButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(playButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                playButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = WORLDMAP;
            playButton.button.resetOutput();
    }

    switch (versusButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = VERSUS;
            versusButton.button.resetOutput();
    }

    switch (editorButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(editorButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                editorButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = EDITOR;
            editorButton.button.resetOutput();
    }

    switch (aboutButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(aboutButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                aboutButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = ABOUT;
            aboutButton.button.resetOutput();
    }
    
    // Skip to gameplay
    if(isKeyPressed('`')) {
        resetKeyPressed();
        ui.transitionToState = GAMEPLAY;
    }
}
