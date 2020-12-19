
// Inside Panel:
// Top Row:     Tabs
// Middle Row:  Description/Label + Images
// Bottom Row:  Text Buttons

var buildingPanelDefaultBtnColor = "#00000088";
var buildingPanelHoverBtnColor = "#000000DD";

function buildingPanelSetup() {
    var panelX = 120 * pixelSize;
    var panelY = (gameHeight / 2) + (60 * pixelSize);
    var panelW = gameWidth - (panelX * 2);
    var panelH = 160 * pixelSize;
    var tabGap = 4 * pixelSize;

    buildingPanelTab1Objects = [];
    buildingPanelTab1Objects.push(new Label(tr(), "WIN: Destroy the Enemy HQ or destroy all enemy units."));
    buildingPanelTab1Objects.push(new Label(tr(), "LOSE: This HQ gets destroyed."));
    buildingPanelTab1Objects.push(new Label(tr(), "Protect HQ building at all costs!"));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab1Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab2Objects = [];
    buildingPanelTab2Objects.push(new Label(tr(), "Player CO: Zareem."));
    buildingPanelTab2Objects.push(new Label(tr(), "CO Power: Rifle Boomer."));
    buildingPanelTab2Objects.push(new Label(tr(), "All your buildings deploys a Rifle Mech."));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), "More Info"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab2Objects.push(new TextButton(tr(), new Label(tr(), "Use Power"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab3Objects = [];
    buildingPanelTab3Objects.push(new Label(tr(), "Enemy CO: Guru."));
    buildingPanelTab3Objects.push(new Label(tr(), "CO Power: Extra Action."));
    buildingPanelTab3Objects.push(new Label(tr(), "You get 3 more Action Points."));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), "Use Power"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), "Use Power"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab3Objects.push(new TextButton(tr(), new Label(tr(), "Use Power"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab4Objects = [];
    buildingPanelTab4Objects.push(new Label(tr(), "Total Player Units: XX, Total Enemy Units: XX"));
    buildingPanelTab4Objects.push(new Label(tr(), "Total Turns: XX, Your Action Points: XX"));
    buildingPanelTab4Objects.push(new Label(tr(), "Total Income: XX, Total Buildings: XX"));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab4Objects.push(new TextButton(tr(), new Label(tr(), ""), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

    buildingPanelTab5Objects = [];
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new Label(tr(), "Tip: Try to move rifle mechs to mountains in order to gain defense."));
    buildingPanelTab5Objects.push(new Label(tr(), ""));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), "SFX: ON"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), "BGM: ON"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));
    buildingPanelTab5Objects.push(new TextButton(tr(), new Label(tr(), "Restart"), new Button(tr(), buildingPanelDefaultBtnColor, buildingPanelHoverBtnColor, buildingPanelHoverBtnColor)));

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

function buildingPanelUpdate(buildingMapUnit) {

    switch(buildingMapUnit.unit.type)
    {
        case HQ_BUILDING:
            resetB();

            setBTab(0, "OBJECTIVE");
            setBTab(1, "PLAYER CO");
            setBTab(2, "ENEMY CO");
            setBTab(3, "STATS");
            setBTab(4, "OPTIONS");

            setBLabel(0, 0, "WIN: Destroy the Enemy HQ or destroy all enemy units.");
            setBLabel(0, 1, "LOSE: This HQ gets destroyed.");
            setBLabel(0, 2, "Protect HQ building at all costs!");
            setBLabel(1, 0, "Player CO: Zareem.");
            setBLabel(1, 1, "CO Power: Rifle Boomer.");
            setBLabel(1, 2, "All your buildings deploys a Rifle Mech."); 
            setBLabel(2, 0, "Enemy CO: Guru.");
            setBLabel(2, 1, "CO Power: Extra Action.");
            setBLabel(2, 2, "You get 3 more Action Points.");
            setBLabel(3, 0, "Total Player Mechs: " + getPlayer().getTotalNumberOfMechs().toString() + ", Total Player Buildings: " + getPlayer().getTotalNumberOfBuildings().toString());
            setBLabel(3, 1, "Total Enemy Mechs: XX, Total Enemy Buildings: XX");
            setBLabel(3, 2, "Total Player Income: XX, Total Enemy Income: XX");
            setBLabel(4, 1, "Tip: Try to move rifle mechs to mountains in order to gain defense.");

            setBButton(0, 0, "Exit to Menu");
            setBButton(0, 1, "Restart Game");
            setBButton(0, 2, "Need Help?");
            setBButton(1, 2, "Use Power!");
        break;

        case CITY_BUILDING:
            resetB();
        break;

        case WAR_BUILDING:
            resetB();
        break;

        case RUIN_BUILDING:
            resetB();
        break;
    }

    if (maxDisplayTilesPerRow == defaultTilesPerRow) {
        unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
        buildingPanel.enabled = true;
    }
    else {
        buildingPanel.enabled = false;
    }

    buildingPanel.color = getActiveTeamColor();
}

function buildingPanelDraw() {

}

function buildingPanelEvent() {
    var SFXTextButton = buildingPanelTab5Objects[3];
    var BGMTextButton = buildingPanelTab5Objects[4];


    // These button label checks  could probably be 
    // moved up into buildingPanelSetup() at some point,
    // rather than checking every frame. If/when that happens,
    // the label.text lines in the button output checks should
    // be un-commented so the buttons continue to update on click
    // properly!
    if(gameOptions.SFXEnabled) {
        SFXTextButton.label.text = "SFX: ON";
    } else {
        SFXTextButton.label.text = "SFX: OFF";
    }

    if(gameOptions.BGMEnabled) {
        BGMTextButton.label.text = "BGM: ON";
    } else {
        BGMTextButton.label.text = "BGM: OFF";
    }
    // end button label checks (see above)

    if(SFXTextButton.button.output == UIOUTPUT_SELECT) {
        if(gameOptions.SFXEnabled) {
            gameOptions.SFXEnabled = false;
            //SFXTextButton.label.text = "SFX: OFF";
        } else {
            gameOptions.SFXEnabled = true;
            //SFXTextButton.label.text = "SFX: ON";
        }
    }

    if(BGMTextButton.button.output == UIOUTPUT_SELECT) {
        if(gameOptions.BGMEnabled) {
            gameOptions.BGMEnabled = false;
            //BGMTextButton.label.text = "BGM: OFF";
        } else {
            gameOptions.BGMEnabled = true;
            //BGMTextButton.label.text = "BGM: ON";
        }
    }

    if (buildingPanelButtons[2].button.output == UIOUTPUT_SELECT) {
        helpMenu.enabled = !helpMenu.enabled;
        buildingPanelButtons[2].button.resetOutput();
    }
}
