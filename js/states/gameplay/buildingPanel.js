
// Inside Panel:
// Top Row:     Tabs
// Middle Row:  Description/Label + Images
// Bottom Row:  Text Buttons

var buildingPanelDefaultBtnColor = "#00000088";
var buildingPanelHoverBtnColor = "#000000DD";
var buildingPanelDisabledBtnColor = "#88000088";
var buildingPanelPrevSelected = null;
var buildingPanelCOSelection = 0;

const MECHCOST = [2000, 8000, 12000, 5000, 5000];

function buildingPanelSetup() {
    panelX = 160 * pixelSize;
    panelH = gameBottomBarHeight;
    panelY = gameHeight - panelH;
    panelW = gameWidth - (panelX * 2);
    var tabGap = 4 * pixelSize;

    buildingPanelTab1Objects = [];
    buildingPanelTab1Objects.push(new Label(tr(), ""));
    buildingPanelTab1Objects.push(new Label(tr(), ""));
    buildingPanelTab1Objects.push(new Label(tr(), ""));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));

    buildingPanelTab2Objects = [];
    buildingPanelTab2Objects.push(new Label(tr(), ""));
    buildingPanelTab2Objects.push(new Label(tr(), ""));
    buildingPanelTab2Objects.push(new Label(tr(), ""));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));

    buildingPanelTab3Objects = [];
    buildingPanelTab3Objects.push(new Label(tr(), ""));
    buildingPanelTab3Objects.push(new Label(tr(), ""));
    buildingPanelTab3Objects.push(new Label(tr(), ""));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));

    buildingPanelTab4Objects = [];
    buildingPanelTab4Objects.push(new Label(tr(), ""));
    buildingPanelTab4Objects.push(new Label(tr(), ""));
    buildingPanelTab4Objects.push(new Label(tr(), ""));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));

    buildingPanelTab5Objects = [];
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor, buildingPanelDisabledBtnColor)));

    buildingPanelTabs = [];
    buildingPanelTabs.push(new Tab(tr(vec2(), vec2((panelW / 5) - tabGap, panelH / 4)), buildingPanelTab1Objects, undefined,
        new TextButton(tr(), new Label(tr(), "OBJECTIVE")), true, buildingPanelHoverBtnColor, buildingPanelDefaultBtnColor));
    buildingPanelTabs.push(new Tab(tr(vec2(), vec2((panelW / 5) - tabGap, panelH / 4)), buildingPanelTab2Objects, undefined,
        new TextButton(tr(), new Label(tr(), "PLAYER CO")), false, buildingPanelHoverBtnColor, buildingPanelDefaultBtnColor));
    buildingPanelTabs.push(new Tab(tr(vec2(), vec2((panelW / 5) - tabGap, panelH / 4)), buildingPanelTab3Objects, undefined,
        new TextButton(tr(), new Label(tr(), "ENEMY CO")), false, buildingPanelHoverBtnColor, buildingPanelDefaultBtnColor));
    buildingPanelTabs.push(new Tab(tr(vec2(), vec2((panelW / 5) - tabGap, panelH / 4)), buildingPanelTab4Objects, undefined,
        new TextButton(tr(), new Label(tr(), "STATS")), false, buildingPanelHoverBtnColor, buildingPanelDefaultBtnColor));
    buildingPanelTabs.push(new Tab(tr(vec2(), vec2((panelW / 5) - tabGap, panelH / 4)), buildingPanelTab5Objects,
        [buildingPanelTabs[0], buildingPanelTabs[1], buildingPanelTabs[2], buildingPanelTabs[3]],
        new TextButton(tr(), new Label(tr(), "OPTIONS"), undefined), false, buildingPanelHoverBtnColor, buildingPanelDefaultBtnColor));

    buildingPanelLabels = [];
    buildingPanelLabels.push(buildingPanelTab1Objects[0]);
    buildingPanelLabels.push(buildingPanelTab1Objects[1]);
    buildingPanelLabels.push(buildingPanelTab1Objects[2]);

    buildingPanelLabels.push(buildingPanelTab2Objects[0]);
    buildingPanelLabels.push(buildingPanelTab2Objects[1]);
    buildingPanelLabels.push(buildingPanelTab2Objects[2]);

    buildingPanelLabels.push(buildingPanelTab3Objects[0]);
    buildingPanelLabels.push(buildingPanelTab3Objects[1]);
    buildingPanelLabels.push(buildingPanelTab3Objects[2]);

    buildingPanelLabels.push(buildingPanelTab4Objects[0]);
    buildingPanelLabels.push(buildingPanelTab4Objects[1]);
    buildingPanelLabels.push(buildingPanelTab4Objects[2]);

    buildingPanelLabels.push(buildingPanelTab5Objects[0]);
    buildingPanelLabels.push(buildingPanelTab5Objects[1]);
    buildingPanelLabels.push(buildingPanelTab5Objects[2]);

    buildingPanelButtons = [];
    buildingPanelButtons.push(buildingPanelTab1Objects[3]);
    buildingPanelButtons.push(buildingPanelTab1Objects[4]);
    buildingPanelButtons.push(buildingPanelTab1Objects[5]);

    buildingPanelButtons.push(buildingPanelTab2Objects[3]);
    buildingPanelButtons.push(buildingPanelTab2Objects[4]);
    buildingPanelButtons.push(buildingPanelTab2Objects[5]);

    buildingPanelButtons.push(buildingPanelTab3Objects[3]);
    buildingPanelButtons.push(buildingPanelTab3Objects[4]);
    buildingPanelButtons.push(buildingPanelTab3Objects[5]);

    buildingPanelButtons.push(buildingPanelTab4Objects[3]);
    buildingPanelButtons.push(buildingPanelTab4Objects[4]);
    buildingPanelButtons.push(buildingPanelTab4Objects[5]);

    buildingPanelButtons.push(buildingPanelTab5Objects[3]);
    buildingPanelButtons.push(buildingPanelTab5Objects[4]);
    buildingPanelButtons.push(buildingPanelTab5Objects[5]);

    buildingPanel = new Panel(
        tr(vec2(panelX, panelY), vec2(panelW, panelH)), new SubState(tr(), [
            new FlexGroup(
                tr(vec2(panelX + tabGap, panelY + tabGap), vec2(panelW, panelH / 4)),
                new SubState(tr(), buildingPanelTabs),
                false, vec2(tabGap, 0), vec2(5, 1)),
            new FlexGroup(
                tr(vec2(panelX + tabGap, panelY + tabGap + (panelH / 3)), vec2(panelW, panelH / 3)),
                new SubState(tr(), buildingPanelLabels),
                false, vec2(), vec2(1, 3)),
            new FlexGroup(
                tr(vec2(panelX + tabGap, panelY + tabGap + ((panelH / 3) * 2)), vec2(panelW, panelH / 4)),
                new SubState(tr(), buildingPanelButtons),
                false, vec2(), vec2(3, 1)),
        ]));
}

//#region buildingpanel_helpers

function isTouchInsideBPanel() {
    return buildingPanel.enabled
    && touchPos[0].x >= panelX && touchPos[0].x < panelX + panelW
    && touchPos[0].y >= panelY && touchPos[0].y < panelY + panelH;
}
function resetB() {
    for(let i = 0; i < buildingPanelTabs.length; i++) {
        buildingPanelTabs[i].textButton.label.text = "";
        buildingPanelTabs[i].visible = false;
    }
    for(let i = 0; i < buildingPanelLabels.length; i++) {
        buildingPanelLabels[i].text = "";
        buildingPanelLabels[i].visible = false;
    }
    for(let i = 0; i < buildingPanelButtons.length; i++) {
        buildingPanelButtons[i].label.text = "";
        buildingPanelButtons[i].visible = false;
    }
}
function setBTab(index, text) {
    if(text == "") buildingPanelTabs[index].visible = false;
    else
    {
        buildingPanelTabs[index].visible = true;
        buildingPanelTabs[index].textButton.label.text = text;
    }
}
function setBLabel(tabIndex, index, text) {
    var tIndex = (tabIndex * 3) + index;
    if(text == "") buildingPanelLabels[tIndex].visible = false;
    else
    {
        buildingPanelLabels[tIndex].visible = true;
        buildingPanelLabels[tIndex].text = text;
    }
}
function setBButton(tabIndex, index, text, disabled = false) {
    var tIndex = (tabIndex * 3) + index;
    if(text == "") buildingPanelButtons[tIndex].visible = false;
    else
    {
        buildingPanelButtons[tIndex].visible = true;
        buildingPanelButtons[tIndex].label.text = text;

        if(disabled)
            buildingPanelButtons[tIndex].button.output = UIOUTPUT_DISABLED;
        else
            buildingPanelButtons[tIndex].button.output = UIOUTPUT_RUNNING;
    }
}
function getBButton(tabIndex, index, type) {
    var tIndex = (tabIndex * 3) + index;
    if(buildingPanelButtons[tIndex].visible && buildingPanelPrevSelected != null && buildingPanelPrevSelected.unit.type == type)
        return buildingPanelButtons[tIndex];
    return 0;
}

//#endregion

function buildingPanelUpdate(buildingMUnit) {

    if(gameTime % 100 < 50) return;

    if(buildingPanelPrevSelected == null
    || buildingPanelPrevSelected != buildingMUnit)
    {
        buildingPanelPrevSelected = buildingMUnit;
        buildingPanelTabs[0].select();
    }

    if (maxDisplayTilesPerRow == defaultTilesPerRow) {
        unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
        buildingPanel.enabled = true;
    }
    else {
        buildingPanel.enabled = false;
    }

    buildingPanel.color = getActiveTeamColor();

    switch(buildingMUnit.unit.type)
    {
        case HQ_BUILDING:
            resetB();

            setBTab(0, "OBJECTIVE");
            setBLabel(0, 0, "WIN: Destroy the Enemy HQ(s).");
            setBLabel(0, 1, "LOSE: Your HQ gets destroyed.");
            setBLabel(0, 2, "Protect your HQ building at all costs!");
            setBButton(0, 0, "Restart Game");
            setBButton(0, 1, "Need Help?");
            setBButton(0, 2, "End Turn");

            setBTab(1, "CO");
            setBLabel(1, 0, (manager.index == buildingPanelCOSelection ? "(YOU) " : "") + "Player CO: " + COSPECIFICS[manager.players[buildingPanelCOSelection].CO].name + ".");
            setBLabel(1, 1, "CO Power: " + COSPECIFICS[manager.players[buildingPanelCOSelection].CO].powerName + ".");
            setBLabel(1, 2, COSPECIFICS[manager.players[buildingPanelCOSelection].CO].powerDesc);

            setBButton(1, 0, "Previous CO");

            if(getPlayer().powerMeter >= 0.999)
                setBButton(1, 1, "Use Power!");
            else
                setBButton(1, 1, "not enough power", true);

            setBButton(1, 2, "Next CO");

            setBLabel(2, 0, "CO Power: Rifle Boomer.");
            setBLabel(2, 1, "All your buildings deploys a Rifle Mech.");

            if(getPlayer().powerMeter >= 0.999)
                setBButton(2, 1, "Use Power!");
            else
                setBButton(2, 1, "not enough power", true);

            setBTab(3, "STATS");
            setBLabel(3, 0, "Total Mechs: " + getPlayer().getTotalNumberOfMechs().toString() + ", Total Buildings: " + getPlayer().getTotalNumberOfBuildings().toString());
            setBLabel(3, 1, "Rifle: " + getPlayer().getTotalNumberOfMechs(RIFLE_MECH).toString() +
                ", Cannon: " + getPlayer().getTotalNumberOfMechs(CANNON_MECH).toString() +
                ", Artillery: " + getPlayer().getTotalNumberOfMechs(ARTILLERY_MECH).toString() +
                ", Support: " + getPlayer().getTotalNumberOfMechs(SUPPORT_MECH).toString() +
                ", Teleport: " + getPlayer().getTotalNumberOfMechs(TELEPORT_MECH).toString());
            setBLabel(3, 2, "Income Per Turn: " + getPlayer().getTotalIncome() + ", Repair Required: " + (getPlayer().isAnyBuildingDamaged() ? ("Yes, Income after repairs: " + getPlayer().getTotalIncome(true).toString()) : "No"));

            setBTab(4, "OPTIONS");
            setBLabel(4, 1, "Tip: Try to move Rifle Mechs to mountains in order to gain defense.");
            setBButton(4, 0, gameOptions.SFXEnabled ? "SFX: ON" : "SFX: OFF");
            setBButton(4, 1, gameOptions.BGMEnabled ? "BGM: ON" : "BGM: OFF");
            setBButton(4, 2, "Exit to Menu");

        break;

        case CITY_BUILDING:
            resetB();

            setBTab(0, "CITY");
            setBLabel(0, 0, "Generates Income with which new mechs are deployed via War Building.");
            setBLabel(0, 1, "Cost is also a requirement for supply/repair. Income Generation per turn: " + (Math.ceil(buildingMUnit.hp) * (buildingMUnit.unit.incomePerHp + (buildingMUnit.unit.incomePerHp * buildingMUnit.unit.incomeRankMultiplier * buildingMUnit.unit.rank))).toString() + ".");

            if(buildingMUnit.unit.boost == 0) {
                setBLabel(0, 2, "Use BOOST to get 2 times the income for a turn (Uses 1 AP, " + (buildingMUnit.unit.boostCooldown - (buildingMUnit.unit.boostCooldownDecreasePerRank * buildingMUnit.unit.rank)) + " Cooldown Turns).");
                if(getPlayer().actionPoints > 0) setBButton(0, 2, "Boost");
                else setBButton(0, 2, "No AP", true);
            } else if (buildingMUnit.unit.boost < 0) {
                setBLabel(0, 2, "It will take " + (-buildingMUnit.unit.boost).toString() + " turn(s) before it can be boost can be used again.");
            } else {
                setBLabel(0, 2, "BOOSTED: You will receive twice the income for a turn!");
            }

            setBTab(4, "RANK");
            if(buildingMUnit.unit.rank < 3) {
                setBLabel(4, 0, "Current City Rank: " + buildingMUnit.unit.rank + ". Upgrade's Cost: " + (buildingMUnit.unit.rankUpgradeCost + (buildingMUnit.unit.rankUpgradeCost * buildingMUnit.unit.rankUpgradeCostMultiplier * buildingMUnit.unit.rank)).toString() + ".");
                setBLabel(4, 1, "Income Generation per turn AFTER UPGRADE: " + (buildingMUnit.hp * (buildingMUnit.unit.incomePerHp + (buildingMUnit.unit.incomePerHp * buildingMUnit.unit.incomeRankMultiplier * (buildingMUnit.unit.rank + 1)))).toString() + ".");
                setBLabel(4, 2, "Boost Cooldown Turns AFTER UPGRADE: " + (buildingMUnit.unit.boostCooldown - (buildingMUnit.unit.boostCooldownDecreasePerRank * (buildingMUnit.unit.rank + 1))) + ".");
                
                if(getPlayer().money >= buildingMUnit.unit.rankUpgradeCost + (buildingMUnit.unit.rankUpgradeCost * buildingMUnit.unit.rankUpgradeCostMultiplier * buildingMUnit.unit.rank))
                    setBButton(4, 2, "Upgrade");
                else
                    setBButton(4, 2, "insufficient cash", true);
                
            } else setBLabel(4, 0, "Current City Rank: 3. MAX Rank!");
        break;

        case WAR_BUILDING:
            resetB();

            setBTab(0, "WAR BUILDING");
            setBLabel(0, 0, "Deploy New Mechs to attack the enemy and support the existing mechs.");
            setBLabel(0, 1, "ATTACK: Rifle, Cannon and Artillery. ABILITY: Support and Teleport.");
            if(buildingMUnit.unit.boost == 0) {
                if(getPlayer().deployDelay) setBLabel(0, 2, "Use BOOST to deploy a complete mech without any turn delay (Uses 1 AP, " + (buildingMUnit.unit.boostCooldown - (buildingMUnit.unit.boostCooldownDecreasePerRank * buildingMUnit.unit.rank)) + " Cooldown Turns).");
                else setBLabel(0, 2, "Use BOOST to deploy a max rank mech (Uses 1 AP, " + (buildingMUnit.unit.boostCooldown - (buildingMUnit.unit.boostCooldownDecreasePerRank * buildingMUnit.unit.rank)) + " Cooldown Turns).");
                if(getPlayer().actionPoints > 0) setBButton(0, 2, "Boost");
                else setBButton(0, 2, "No AP", true);
            } else if(buildingMUnit.unit.boost < 0) {
                setBLabel(0, 2, "It will take " + (-buildingMUnit.unit.boost).toString() + " turn(s) before it can be boosted again.");
            } else {
                setBLabel(0, 2, "BOOSTED: " + (getPlayer().deployDelay ? "Build a complete mech without any turn delay!" : "Build a max rank mech!"));
            }

            setBTab(1, "ATTACK MECHS");
            setBLabel(1, 0, "RIFLE (" + MECHCOST[RIFLE_MECH] + "$" + (getPlayer().deployDelay ? ", deploys in " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][RIFLE_MECH].toString() + " turn(s)" : "") + "): Light Weight but Less Attacking Power.");
            setBLabel(1, 1, "CANNON (" + MECHCOST[CANNON_MECH] + "$" + (getPlayer().deployDelay ? ", deploys in " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][CANNON_MECH].toString() + " turn(s)" : "") + "): Heavy Weight with Immense Attacking Power.");
            setBLabel(1, 2, "ARTILLERY (" + MECHCOST[ARTILLERY_MECH] + "$" + (getPlayer().deployDelay ? ", deploys in " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][ARTILLERY_MECH].toString() + " turn(s)" : "") + "): Only Mech that can attack from a Long Distance.");

            if(getPlayer().money >= MECHCOST[RIFLE_MECH]) setBButton(1, 0, "Buy Rifle");
            else setBButton(1, 0, "insufficient cash", true);
            if(getPlayer().money >= MECHCOST[CANNON_MECH]) setBButton(1, 1, "Buy Cannon");
            else setBButton(1, 1, "insufficient cash", true);
            if(getPlayer().money >= MECHCOST[ARTILLERY_MECH]) setBButton(1, 2, "Buy Artillery");
            else setBButton(1, 2, "insufficient cash", true);

            setBTab(2, "ABILITY MECHS");
            setBLabel(2, 0, "SUPPORT (" + MECHCOST[SUPPORT_MECH] + "$" + (getPlayer().deployDelay ? ", deploys in " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][SUPPORT_MECH].toString() + " turn(s)" : "") + "): Essential Mech that Provides Supplies and Repair Units.");
            setBLabel(2, 1, "TELEPORT (" + MECHCOST[TELEPORT_MECH] + "$" + (getPlayer().deployDelay ? ", deploys in " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][TELEPORT_MECH].toString() + " turn(s)" : "") + "): Mech with the Ability to Teleport and Swap Positions.");

            if(getPlayer().money >= MECHCOST[SUPPORT_MECH]) setBButton(2, 1, "Buy Support");
            else setBButton(2, 1, "insufficient cash", true);
            if(getPlayer().money >= MECHCOST[TELEPORT_MECH]) setBButton(2, 2, "Buy Teleport");
            else setBButton(2, 2, "insufficient cash", true);

            setBTab(4, "RANK");
            if(buildingMUnit.unit.rank < 3) {
                setBLabel(4, 0, "Current War Building Rank: " + buildingMUnit.unit.rank + ". Upgrade's Cost: " + (buildingMUnit.unit.rankUpgradeCost + (buildingMUnit.unit.rankUpgradeCost * buildingMUnit.unit.rankUpgradeCostMultiplier * buildingMUnit.unit.rank)).toString() + ".");
                if(getPlayer().deployDelay)
                    setBLabel(4, 1, "Mech Deploy Delay Turns AFTER UPGRADE: "
                    + "Rifle " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][RIFLE_MECH].toString() + "->" + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank+1][RIFLE_MECH].toString()
                    + ", Cannon " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][CANNON_MECH].toString() + "->" + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank+1][CANNON_MECH].toString()
                    + ", Artillery " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][ARTILLERY_MECH].toString() + "->" + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank+1][ARTILLERY_MECH].toString()
                    + ", Support " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][SUPPORT_MECH].toString() + "->" + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank+1][SUPPORT_MECH].toString()
                    + ", Teleport " + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][TELEPORT_MECH].toString() + "->" + buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank+1][TELEPORT_MECH].toString()
                    + ".");
                else
                    setBLabel(4, 1, "Mech Deploy Rank AFTER UPGRADE: " + buildingMUnit.unit.rank.toString() + "->" + (buildingMUnit.unit.rank+1).toString() + ".");
                setBLabel(4, 2, "Boost Cooldown Turns AFTER UPGRADE: " + (buildingMUnit.unit.boostCooldown - (buildingMUnit.unit.boostCooldownDecreasePerRank * (buildingMUnit.unit.rank + 1))) + ".");
                
                if(getPlayer().money >= buildingMUnit.unit.rankUpgradeCost + (buildingMUnit.unit.rankUpgradeCost * buildingMUnit.unit.rankUpgradeCostMultiplier * buildingMUnit.unit.rank))
                    setBButton(4, 2, "Upgrade");
                else
                    setBButton(4, 2, "insufficient cash", true);
                
            } else setBLabel(4, 0, "Current War Building Rank: 3. MAX Rank!");

        break;

        case RUIN_BUILDING:
            resetB();
            buildingPanel.enabled = false;
        break;
    }
}

function buildingPanelDraw() {
    if(getPlayer().getSelectedMapUnit().unit.type == HQ_BUILDING && maxDisplayTilesPerRow == defaultTilesPerRow && buildingPanel.enabled)
    {
        var sc = pixelSize/3.0
        bodyNFacesSheet.transform.scale = toVec2(sc);
        bodyNFacesSheet.transform.position = vec2(panelX + panelW/2, panelY - (8.0 * pixelSize));
        drawRect(renderer, bodyNFacesSheet.transform.position.subtract(toVec2(128 * sc)), toVec2(256 * sc), true, getActiveTeamColor());
        bodyNFacesSheet.drawScIn(facePositions[getPlayer().powerMeter >= 1.0 || getPlayer().powered ? FACE_HAPPY : FACE_NEUTRAL].add(vec2(1024 * getPlayer().CO)), toVec2(256));
        
        if(!getPlayer().powered) {
            drawRect(renderer, vec2(panelX - 128 * sc + panelW/2, panelY + sc * 104.0), vec2(sc * 256, sc * 12.0), true, "black");
            drawRect(renderer, vec2(panelX - 128 * sc + panelW/2, panelY + sc * 104.0), vec2(sc * 256 * getPlayer().powerMeter, sc * 12.0), true, getPlayer().powerMeter >= 1.0 && gameTime % 600 < 300 ? "white" : "#66ff66");
        } else {
            renderer.globalAlpha = ((Math.sin(gameTime/100.0) + 1.0) / 8.0);
            renderer.globalCompositeOperation = "lighter";
            drawRect(renderer, bodyNFacesSheet.transform.position.subtract(toVec2(128 * sc)), toVec2(256 * sc), true, "white");
            renderer.globalAlpha = 1.0;
            renderer.globalCompositeOperation = "source-over";
        }
    }
}

function buildingPanelEvent() {
    if(isTouchInsideBPanel())
    {
        var buildingMUnit = getPlayer().getSelectedMapUnit();

        //HQ BUILDING EVENTS
        var hqBuilding_helpBtn = getBButton(0, 1, HQ_BUILDING);
        if (hqBuilding_helpBtn != 0 && hqBuilding_helpBtn.button.output == UIOUTPUT_SELECT) {
            helpMenu.enabled = !helpMenu.enabled;
            hqBuilding_helpBtn.button.resetOutput();
        }
        var hqBuilding_restartBtn = getBButton(0, 0, HQ_BUILDING);
        if (hqBuilding_restartBtn != 0 && hqBuilding_restartBtn.button.output == UIOUTPUT_SELECT) {

            //TODO: RESTART MISSION/GAME

            hqBuilding_restartBtn.button.resetOutput();
        }
        var hqBuilding_endBtn = getBButton(0, 2, HQ_BUILDING);
        if (hqBuilding_endBtn != 0 && hqBuilding_endBtn.button.output == UIOUTPUT_SELECT) {
            manager.endTurn();
            hqBuilding_endBtn.button.resetOutput();
        }

        var hqBuilding_prevCOBtn = getBButton(1, 0, HQ_BUILDING);
        if (hqBuilding_prevCOBtn != 0 && hqBuilding_prevCOBtn.button.output == UIOUTPUT_SELECT) {
            buildingPanelCOSelection--;
            if(buildingPanelCOSelection < 0) buildingPanelCOSelection = manager.players.length - 1;
            hqBuilding_prevCOBtn.button.resetOutput();
        }

        var hqBuilding_powerBtn = getBButton(1, 1, HQ_BUILDING);
        var hqBuilding_powerBtn2 = getBButton(2, 1, HQ_BUILDING);
        if ((hqBuilding_powerBtn != 0 && hqBuilding_powerBtn.button.output == UIOUTPUT_SELECT)
        || (hqBuilding_powerBtn2 != 0 && hqBuilding_powerBtn2.button.output == UIOUTPUT_SELECT)) {

            if(getPlayer().powerMeter >= 0.999) {
                activatePower();
                getPlayer().powerMeter = 0.0;
            }

            hqBuilding_powerBtn.button.resetOutput();
            hqBuilding_powerBtn2.button.resetOutput();
        }

        var hqBuilding_nextCOBtn = getBButton(1, 2, HQ_BUILDING);
        if (hqBuilding_nextCOBtn != 0 && hqBuilding_nextCOBtn.button.output == UIOUTPUT_SELECT) {
            buildingPanelCOSelection++;
            if(buildingPanelCOSelection >= manager.players.length) buildingPanelCOSelection = 0;
            hqBuilding_nextCOBtn.button.resetOutput();
        }

        var hqBuilding_sfxBtn = getBButton(4, 0, HQ_BUILDING);
        if(hqBuilding_sfxBtn != 0 && hqBuilding_sfxBtn.button.output == UIOUTPUT_SELECT) {
            gameOptions.SFXEnabled = !gameOptions.SFXEnabled;
            hqBuilding_sfxBtn.label.text = gameOptions.SFXEnabled ? "SFX: ON" : "SFX: OFF";
            hqBuilding_sfxBtn.button.resetOutput();
        }

        var hqBuilding_bgmBtn = getBButton(4, 1, HQ_BUILDING);
        if(hqBuilding_bgmBtn != 0 && hqBuilding_bgmBtn.button.output == UIOUTPUT_SELECT) {
            gameOptions.BGMEnabled = !gameOptions.BGMEnabled;
            hqBuilding_bgmBtn.label.text = gameOptions.BGMEnabled ? "BGM: ON" : "BGM: OFF";
            hqBuilding_bgmBtn.button.resetOutput();
        }

        var hqBuilding_exitBtn = getBButton(4, 2, HQ_BUILDING);
        if(hqBuilding_exitBtn != 0 && hqBuilding_exitBtn.button.output == UIOUTPUT_SELECT) {
            gameplayReset();
            ui.transitionToState = STARTSCREEN;
            hqBuilding_exitBtn.button.resetOutput();
        }

        // WAR BUILDING EVENTS
        var warBuilding_boostBtn = getBButton(0, 2, WAR_BUILDING);
        if(warBuilding_boostBtn != 0 && warBuilding_boostBtn.button.output == UIOUTPUT_SELECT) {
            getPlayer().actionPoints--;
            if(buildingMUnit.unit.boost >= 0)
                buildingMUnit.unit.boost = 1;
            warBuilding_boostBtn.button.resetOutput();
        }

        var mechToBuyBtn = [
            [1, 0, RIFLE_MECH],
            [1, 1, CANNON_MECH],
            [1, 2, ARTILLERY_MECH],
            [2, 1, SUPPORT_MECH],
            [2, 2, TELEPORT_MECH]
        ];
        for(let i = 0; i < mechToBuyBtn.length; i++) {
            var warBuilding_buyBtn = getBButton(mechToBuyBtn[i][0], mechToBuyBtn[i][1], WAR_BUILDING);
            if (warBuilding_buyBtn != 0 && warBuilding_buyBtn.button.output == UIOUTPUT_SELECT) {
                var pos = buildingPanelPrevSelected.mapPosition;
                var newMapUnit = null;
                var offsets = [vec2(0, 1), vec2(1, 0), vec2(0, -1), vec2(-1, 0)];
                for(let o = 0; o < offsets.length; o++) {
                    if(manager.getPlayerAndUnitIndexOnTile(pos.add(offsets[o]))[0] == -1
                    && map.getTileTypeFromPosition(pos.add(offsets[o])) != SEA_TILE
                    && map.getTileTypeFromPosition(pos.add(offsets[o])) != MOUNTAIN_TILE) {
                        removeTileParticles(pos.add(offsets[o]));
                        new TileParticle(tilePositionToPixelPosition(pos.add(offsets[o])), teleportSequence);
                        newMapUnit = new MapUnit(mechToBuyBtn[i][2], pos.add(offsets[o]));
                        newMapUnit.hp = Math.ceil(buildingMUnit.hp);
                        break;
                    }
                }
                if(newMapUnit != null) {
                    getPlayer().money -= MECHCOST[mechToBuyBtn[i][2]];

                    //Deploy Delay Effect
                    if(getPlayer().deployDelay) newMapUnit.unit.deployTime
                        = buildingMUnit.unit.mechDeployDelay[buildingMUnit.unit.rank][mechToBuyBtn[i][2]];
                    else newMapUnit.unit.rank = buildingMUnit.unit.rank;

                    //Boosted Unit Build
                    if(buildingMUnit.unit.boost == 1) {
                        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = 0;
                        else newMapUnit.unit.rank = 3; //3 is max rank
                        buildingMUnit.unit.boost = -(buildingMUnit.unit.boostCooldown - (buildingMUnit.unit.boostCooldownDecreasePerRank * buildingMUnit.unit.rank));
                    }

                    getPlayer().unitGroup.mapUnits.push(newMapUnit);
                } else {
                    //TODO NEGATIVE UI SOUND EFFECT
                }
                warBuilding_buyBtn.button.resetOutput();
            }
        }

        var warBuilding_upgradeBtn = getBButton(4, 2, WAR_BUILDING);
        if(warBuilding_upgradeBtn != 0 && warBuilding_upgradeBtn.button.output == UIOUTPUT_SELECT) {
            getPlayer().money -= buildingMUnit.unit.rankUpgradeCost + (buildingMUnit.unit.rankUpgradeCost * buildingMUnit.unit.rankUpgradeCostMultiplier * buildingMUnit.unit.rank);
            buildingMUnit.unit.rank++;
            new TileParticle(tilePositionToPixelPosition(buildingMUnit.mapPosition), rankUpSequence);
            warBuilding_upgradeBtn.button.resetOutput();
        }

        // CITY BUILDING EVENTS
        var cityBuilding_boostBtn = getBButton(0, 2, CITY_BUILDING);
        if(cityBuilding_boostBtn != 0 && cityBuilding_boostBtn.button.output == UIOUTPUT_SELECT) {
            getPlayer().actionPoints--;
            if(buildingMUnit.unit.boost == 0)
                buildingMUnit.unit.boost = 1;
            cityBuilding_boostBtn.button.resetOutput();
        }

        var cityBuilding_upgradeBtn = getBButton(4, 2, CITY_BUILDING);
        if(cityBuilding_upgradeBtn != 0 && cityBuilding_upgradeBtn.button.output == UIOUTPUT_SELECT) {
            getPlayer().money -= buildingMUnit.unit.rankUpgradeCost + (buildingMUnit.unit.rankUpgradeCost * buildingMUnit.unit.rankUpgradeCostMultiplier * buildingMUnit.unit.rank);
            buildingMUnit.unit.rank++;
            new TileParticle(tilePositionToPixelPosition(buildingMUnit.mapPosition), rankUpSequence);
            cityBuilding_upgradeBtn.button.resetOutput();
        }
    }

    /*for(let i = 0; i < buildingPanelTabs.length; i++) {
        if(buildingPanelTabs[i].textButton.button.output == UIOUTPUT_HOVER) {
            if(buildingPanelTabs[i].textButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                buildingPanelTabs[i].textButton.button.hoverTrigger = false;
            }
        }
    }*/

    for(let i = 0; i < buildingPanelButtons.length; i++) {
        if(buildingPanelButtons[i].button.output == UIOUTPUT_HOVER) {
            if(buildingPanelButtons[i].button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                buildingPanelButtons[i].button.hoverTrigger = false;
            }
        }
    }
}
