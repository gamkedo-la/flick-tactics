const WORLDMAP = 4;
var worldmap = [];
var worldmapMissionFocus = false;
var currentMissionIndex = 0;
var missionFocusLerpFactor = 0.1;
var worldmapFocusCircleRadius = 0.0;
var worldmapFocusCircleMaxRadiusFactor = 128.0;
var worldmapFocusZoomFactor = 1.0;

var missionPoints = [
    vec2(543.1028037383178, 235.66355140186917),
    vec2(385.196261682243, 119.62616822429906),
    vec2(418.69158878504675, -58.61682242990654),
    vec2(289.49532710280374, -23.925233644859812),
    vec2(183.02803738317758, 26.317757009345794),
    vec2(256, -238.05607476635515),
    vec2(23.925233644859812, -217.7196261682243),
    vec2(-221.30841121495328, -198.57943925233644),
    vec2(486.8785046728972, 260.78504672897196),
    vec2(-404.33644859813086, 308.6355140186916),
    vec2(-557.4579439252336, 174.65420560747663),
];

function worldmapSetup() {
    worldmapFlagSprite = new Sprite(tr(), new ImageObject("images/worldmapFlags.png"));
}

function worldmapResize() {
}

function drawMissionFlag(drawPoint) {
    worldmapFlagSprite.transform.position = drawPoint;
    worldmapFlagSprite.transform.scale = worldmapSprite.transform.scale.divide(toVec2(2.0));
    worldmapFlagSprite.drawScIn(vec2(0, (gameTime % 800 < 400)*64), vec2(64, 64));
}

function focusCurrentMission() {
    var focusPoint = missionPoints[currentMissionIndex]
        .multiply(worldmapSprite.transform.scale)
        .add(vec2(gameWidth/2, gameHeight/2));
    var drawPoint = ((missionPoints[currentMissionIndex].negative())
        .multiply(worldmapSprite.transform.scale)
        .add(worldmapSprite.transform.position));

    worldmapSprite.transform.position = lerpVec2(worldmapSprite.transform.position, focusPoint, missionFocusLerpFactor);
    worldmapSprite.transform.scale = lerpVec2(worldmapSprite.transform.scale, toVec2(pixelSize * worldmapFocusZoomFactor), missionFocusLerpFactor);

    renderer.globalAlpha = worldmapFocusCircleRadius / (worldmapSprite.transform.scale.x*worldmapFocusCircleMaxRadiusFactor);

    //Mission Focus Circle
    worldmapFocusCircleRadius = lerp(worldmapFocusCircleRadius, worldmapSprite.transform.scale.x*worldmapFocusCircleMaxRadiusFactor, missionFocusLerpFactor);
    drawCircle(renderer, drawPoint, worldmapFocusCircleRadius, false, "white", worldmapSprite.transform.scale.x*6.0);

    drawMissionFlag(drawPoint);

    renderer.globalAlpha = 1.0;
}

function worldmapDraw(deltaTime) {
    drawRect(renderer, vec2(0, 0), vec2(window.innerWidth, window.innerHeight), true, "#5599FF");
    
    worldmapSprite.drawSc();

    if(!worldmapMissionFocus)
    {
        worldmapSprite.transform.position = vec2(gameWidth/2.0, gameHeight/2.0);
        worldmapSprite.transform.scale = vec2(gameWidth/1792.0, gameHeight/1024.0);
        if(gameWidth/gameHeight < 1792.0/1024.0)
            worldmapSprite.transform.scale = vec2(gameWidth/1792.0, gameWidth/1792.0);
        else
            worldmapSprite.transform.scale = vec2(gameHeight/1024.0, gameHeight/1024.0);
    }
    else
    {
        focusCurrentMission();
    }
}

function worldmapUpdate(deltaTime) {
}

function worldmapEvent(deltaTime) {
    if(isTouched)
    {
        if(!worldmapMissionFocus) worldmapMissionFocus = true;
        else if(currentMissionIndex < missionPoints.length - 1) currentMissionIndex++;
        else { currentMissionIndex = 0; worldmapMissionFocus = false; }
        worldmapFocusCircleRadius = 0.0;
    }
}