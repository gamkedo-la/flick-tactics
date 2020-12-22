
function quickStatsUISetup() {
    qStatsSize = vec2(100 * pixelSize, gameBottomBarHeight);
    qStatsLabels = [];
    for(let i = 0; i < 8; i++)
        qStatsLabels.push(new Label(tr(), ""));
    qStatsPanel = new Panel(
        tr(vec2(gameWidth - qStatsSize.x, gameHeight - qStatsSize.y), qStatsSize), new SubState(tr(), [
            new FlexGroup(tr(vec2(gameWidth - qStatsSize.x, gameHeight - qStatsSize.y), qStatsSize),
        new SubState(tr(), qStatsLabels), false, vec2(1, 0), vec2(1, 8), true)]));
    gameplay.push(qStatsPanel);
}