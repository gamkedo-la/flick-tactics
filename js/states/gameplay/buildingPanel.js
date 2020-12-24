
// Inside Panel:
// Top Row:     Tabs
// Middle Row:  Description/Label + Images
// Bottom Row:  Text Buttons

var buildingPanelDefaultBtnColor = "#00000088";
var buildingPanelHoverBtnColor = "#000000DD";
var buildingPanelPrevSelected = null;

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
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab2Objects = [];
    buildingPanelTab2Objects.push(new Label(tr(), ""));
    buildingPanelTab2Objects.push(new Label(tr(), ""));
    buildingPanelTab2Objects.push(new Label(tr(), ""));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab3Objects = [];
    buildingPanelTab3Objects.push(new Label(tr(), ""));
    buildingPanelTab3Objects.push(new Label(tr(), ""));
    buildingPanelTab3Objects.push(new Label(tr(), ""));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab4Objects = [];
    buildingPanelTab4Objects.push(new Label(tr(), ""));
    buildingPanelTab4Objects.push(new Label(tr(), ""));
    buildingPanelTab4Objects.push(new Label(tr(), ""));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab5Objects = [];
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), ""),
        new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

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

function isTouchInsideBPanel()
{
    return buildingPanel.enabled
    && touchPos[0].x >= panelX && touchPos[0].x < panelX + panelW
    && touchPos[0].y >= panelY && touchPos[0].y < panelY + panelH;
}

function resetB()
{
    for(let i = 0; i < buildingPanelTabs.length; i++)
    {
        buildingPanelTabs[i].textButton.label.text = "";
        buildingPanelTabs[i].visible = false;
    }
    for(let i = 0; i < buildingPanelLabels.length; i++)
    {
        buildingPanelLabels[i].text = "";
        buildingPanelLabels[i].visible = false;
    }
    for(let i = 0; i < buildingPanelButtons.length; i++)
    {
        buildingPanelButtons[i].label.text = "";
        buildingPanelButtons[i].visible = false;
    }
}
function setBTab(index, text)
{
    if(text == "") buildingPanelTabs[index].visible = false;
    else
    {
        buildingPanelTabs[index].visible = true;
        buildingPanelTabs[index].textButton.label.text = text;
    }
}
function setBLabel(tabIndex, index, text)
{
    var tIndex = (tabIndex * 3) + index;
    if(text == "") buildingPanelLabels[tIndex].visible = false;
    else
    {
        buildingPanelLabels[tIndex].visible = true;
        buildingPanelLabels[tIndex].text = text;
    }
}
function setBButton(tabIndex, index, text)
{
    var tIndex = (tabIndex * 3) + index;
    if(text == "") buildingPanelButtons[tIndex].visible = false;
    else
    {
        buildingPanelButtons[tIndex].visible = true;
        buildingPanelButtons[tIndex].label.text = text;
    }
}
function getBButton(tabIndex, index, type)
{
    var tIndex = (tabIndex * 3) + index;
    if(buildingPanelButtons[tIndex].visible && buildingPanelPrevSelected != null && buildingPanelPrevSelected.unit.type == type)
        return buildingPanelButtons[tIndex];
    return 0;
}

function buildingPanelUpdate(buildingMapUnit) {

    if(buildingPanelPrevSelected == null
    || buildingPanelPrevSelected != buildingMapUnit)
    {
        buildingPanelPrevSelected = buildingMapUnit;
        buildingPanelTabs[0].select();
    }

    if (maxDisplayTilesPerRow == defaultTilesPerRow) {
        unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
        buildingPanel.enabled = true;
    }
    else {
        buildingPanel.enabled = false;
    }

    buildingPanel.color = getActiveTeamColor();

    switch(buildingMapUnit.unit.type)
    {
        case HQ_BUILDING:
            resetB();

            setBTab(0, "OBJECTIVE");
            setBLabel(0, 0, "WIN: Destroy the Enemy HQ or destroy all enemy units.");
            setBLabel(0, 1, "LOSE: This HQ gets destroyed.");
            setBLabel(0, 2, "Protect HQ building at all costs!");
            setBButton(0, 0, "Restart Game");
            setBButton(0, 1, "Need Help?");
            setBButton(0, 2, "End Turn");

            setBTab(1, "CO");
            setBLabel(1, 0, "Player CO: Zareem.");
            setBLabel(1, 1, "CO Power: Rifle Boomer.");
            setBLabel(1, 2, "All your buildings deploys a Rifle Mech.");
            setBButton(1, 0, "Previous CO");
            setBButton(1, 1, "Use Power!");
            setBButton(1, 2, "Next CO");

            setBTab(3, "STATS");
            setBLabel(3, 0, "Player Mechs: " + getPlayer().getTotalNumberOfMechs().toString() + ", Player Buildings: " + getPlayer().getTotalNumberOfBuildings().toString());
            setBLabel(3, 1, "Enemy Mechs: XX, Enemy Buildings: XX");
            setBLabel(3, 2, "Player Income: XX, Enemy Income: XX");

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
            setBLabel(0, 1, "Cost is also a requirement for supply/repair. Income Generation per turn: " + (buildingMapUnit.hp * (buildingMapUnit.unit.incomePerHp + (buildingMapUnit.unit.incomePerHp * buildingMapUnit.unit.incomeRankMultiplier * buildingMapUnit.unit.rank))).toString() + ".");

            if(buildingMapUnit.unit.boost == 0) {
                setBLabel(0, 2, "Use BOOST to get 2 times the income for a turn (Uses 1 AP, " + buildingMapUnit.unit.boostCooldown + " Cooldown Turns).");
                setBButton(0, 2, "Boost");
            } else {
                setBLabel(0, 2, "It will take " + buildingMapUnit.unit.boost + " turn(s) before it can be boost can be used again.");
            }

            setBTab(4, "LEVEL");
            setBLabel(4, 0, "Current City Level: " + buildingMapUnit.unit.rank + ". Upgrade's Cost: " + (buildingMapUnit.unit.rankUpgradeCost + (buildingMapUnit.unit.rankUpgradeCost * buildingMapUnit.unit.rankUpgradeCostMultiplier * buildingMapUnit.unit.rank)).toString() + ".");
            setBLabel(4, 1, "Income Generation per turn AFTER UPGRADE: " + (buildingMapUnit.hp * (buildingMapUnit.unit.incomePerHp + (buildingMapUnit.unit.incomePerHp * buildingMapUnit.unit.incomeRankMultiplier * (buildingMapUnit.unit.rank + 1)))).toString() + ".");
            setBLabel(4, 2, "Boost Cooldown Turns AFTER UPGRADE: " + buildingMapUnit.unit.boostCooldown + ".");
            setBButton(4, 2, "Upgrade");
        break;

        case WAR_BUILDING:
            resetB();

            setBTab(0, "WAR BUILDING");
            setBButton(0, 2, "Boost");

            setBTab(1, "ATTACK MECHS");
            setBButton(1, 0, "Buy Rifle");
            setBButton(1, 1, "Buy Cannon");
            setBButton(1, 2, "Buy Artillery");

            setBTab(2, "ABILITY MECHS");
            setBButton(2, 1, "Buy Support");
            setBButton(2, 2, "Buy Teleport");

            setBTab(4, "LEVEL");
            setBLabel(4, 0, "Current War Building Level: " + buildingMapUnit.unit.rank + ". Upgrade's Cost: " + (buildingMapUnit.unit.rankUpgradeCost + (buildingMapUnit.unit.rankUpgradeCost * buildingMapUnit.unit.rankUpgradeCostMultiplier * buildingMapUnit.unit.rank)).toString() + ".");
            //setBLabel(4, 1, "Income Generation per turn AFTER UPGRADE: " + buildingMapUnit.hp * 400 + ".");
            //setBLabel(4, 2, "Boost Cooldown Turns AFTER UPGRADE: 4.");
            setBButton(4, 2, "Upgrade");

        break;

        case RUIN_BUILDING:
            resetB();
            buildingPanel.enabled = false;
        break;
    }
}

function buildingPanelDraw() {

}

function buildingPanelEvent() {
    if(isTouchInsideBPanel())
    {
        //HQ BUILDING EVENTS
        var hqBuilding_helpBtn = getBButton(0, 0, HQ_BUILDING);
        if (hqBuilding_helpBtn != 0 && hqBuilding_helpBtn.button.output == UIOUTPUT_SELECT) {
            helpMenu.enabled = !helpMenu.enabled;
            hqBuilding_helpBtn.button.resetOutput();
        }
        var hqBuilding_restartBtn = getBButton(0, 1, HQ_BUILDING);
        if (hqBuilding_restartBtn != 0 && hqBuilding_restartBtn.button.output == UIOUTPUT_SELECT) {

            //TODO: RESTART MISSION/GAME

            hqBuilding_restartBtn.button.resetOutput();
        }
        var hqBuilding_endBtn = getBButton(0, 2, HQ_BUILDING);
        if (hqBuilding_endBtn != 0 && hqBuilding_endBtn.button.output == UIOUTPUT_SELECT) {
            manager.endTurn();
            actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
            hqBuilding_endBtn.button.resetOutput();
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
            ui.transitionToState = STARTSCREEN;
            hqBuilding_exitBtn.button.resetOutput();
        }

        // WAR BUILDING EVENTS
        var mechToBuyBtn = [
            [1, 0, RIFLE_MECH],
            [1, 1, CANNON_MECH],
            [1, 2, ARTILLERY_MECH],
            [2, 1, SUPPORT_MECH],
            [2, 2, TELEPORT_MECH]
        ];
        for(let i = 0; i < mechToBuyBtn.length; i++)
        {
            var warBuilding_buyBtn = getBButton(mechToBuyBtn[i][0], mechToBuyBtn[i][1], WAR_BUILDING);
            if (warBuilding_buyBtn != 0 && warBuilding_buyBtn.button.output == UIOUTPUT_SELECT)
            {
                var pos = buildingPanelPrevSelected.mapPosition;
                if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1)
                    getPlayer().unitGroup.mapUnits.push(new MapUnit(mechToBuyBtn[i][2], pos.add(vec2(0, 1))));
                else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(1, 0)))[0] == -1)
                    getPlayer().unitGroup.mapUnits.push(new MapUnit(mechToBuyBtn[i][2], pos.add(vec2(1, 0))));
                else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, -1)))[0] == -1)
                    getPlayer().unitGroup.mapUnits.push(new MapUnit(mechToBuyBtn[i][2], pos.add(vec2(0, -1))));
                else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(-1, 0)))[0] == -1)
                    getPlayer().unitGroup.mapUnits.push(new MapUnit(mechToBuyBtn[i][2], pos.add(vec2(-1, 0))));
                warBuilding_buyBtn.button.resetOutput();
            }
        }
    }
}
