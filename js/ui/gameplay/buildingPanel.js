
function drawBuildingPanel()
{
    var panelXOffset = 100*pixelSize;
    var panelHeight = 200*pixelSize;

    drawRect(spritesRenderer,
        vec2(panelXOffset, (gameHeight/2)+(40*pixelSize)),
        vec2(gameWidth-(panelXOffset*2), panelHeight),
        true, getActiveTeamColor() + "BB");
}