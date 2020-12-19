
function helpMenuSetup() {
    var panelX = 100 * pixelSize;
    var panelY = (gameHeight / 5.5) + (40 * pixelSize);
    var panelW = gameWidth - (panelX * 2);
    var panelH = 300 * pixelSize;
    var tabGap = 4 * pixelSize;

    helpMenuTab1Objects = [];
    helpMenuTab1Objects.push(new Label(tr(), "WIN: Destroy the Enemy HQ or destroy all enemy units."));
    helpMenuTab1Objects.push(new Label(tr(), "LOSE: This HQ gets destroyed."));
    helpMenuTab1Objects.push(new Label(tr(), "Protect HQ building at all costs!"));
    helpMenuTab1Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), "#00000000", "#00000000", "#00000000")));
    helpMenuTab1Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), "#00000000", "#00000000", "#00000000")));
    helpMenuTab1Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), "#00000000", "#00000000", "#00000000")));

    helpMenuTabs = [];
    helpMenuTabs.push(new Tab(tr(vec2(), vec2((panelW / 5) - tabGap, panelH / 4)), helpMenuTab1Objects, undefined,
        new TextButton(tr(), new Label(tr(), "OBJECTIVE")), true, "grey", "black"));


    helpMenuLabels = [];
    helpMenuLabels.push(helpMenuTab1Objects[0]);
    helpMenuLabels.push(helpMenuTab1Objects[1]);
    helpMenuLabels.push(helpMenuTab1Objects[2]);

    helpMenuButtons = [];
    helpMenuButtons.push(helpMenuTab1Objects[3]);
    helpMenuButtons.push(helpMenuTab1Objects[4]);
    helpMenuButtons.push(helpMenuTab1Objects[5]);

    helpMenu = new Panel(
        tr(vec2(panelX, panelY), vec2(panelW, panelH)), new SubState(tr(), [
            new FlexGroup(
                tr(vec2(panelX + tabGap, panelY + tabGap), vec2(panelW, panelH / 4)),
                new SubState(tr(), helpMenuTabs),
                false, vec2(tabGap, 0), vec2(5, 1)),
            new FlexGroup(
                tr(vec2(panelX + tabGap, panelY + tabGap + (panelH / 3)), vec2(panelW, panelH / 3)),
                new SubState(tr(), helpMenuLabels),
                false, vec2(), vec2(1, 3)),
            new FlexGroup(
                tr(vec2(panelX + tabGap, panelY + tabGap + ((panelH / 3) * 2)), vec2(panelW, panelH / 4)),
                new SubState(tr(), helpMenuButtons),
                false, vec2(), vec2(3, 1)),
        ]));

    helpMenu.enabled = false;
}

function helpMenuUpdate() {
    
    for(let i = 0; i < helpMenuTabs.length; i++)
        helpMenuTabs[i].textButton.label.text = "HQ";
    for(let i = 0; i < helpMenuLabels.length; i++)
        helpMenuLabels[i].text = "HQ";
    for(let i = 0; i < helpMenuButtons.length; i++)
        helpMenuButtons[i].label.text = "HQ";

    helpMenuLabels[0].text = "Total Player Mech: " + getPlayer().getTotalNumberOfMechs().toString();
    helpMenuLabels[1].text = "Total Player Buildings: " + getPlayer().getTotalNumberOfBuildings().toString();
}

function helpMenuDraw() {

}

function helpMenuEvent() {

}
