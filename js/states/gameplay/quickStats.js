
var prevQuickStatsUnit = -1;
var prevQuickStatsTeamID = -1;

function quickStatsUISetup(fontSize) {
    qStatsSize = vec2((isMobile() ? gameBottomBarHeight : (100 * pixelSize)), gameBottomBarHeight);
    qStatsLabels = [];
    for (let i = 0; i < (isMobile() ? 5 : 8); i++)
        qStatsLabels.push(new Label(tr(), "", fontSize + "px " + uiContext.fontFamily));
    qStatsPanel = new Panel(
        tr(vec2(gameWidth - qStatsSize.x, gameHeight - qStatsSize.y), qStatsSize), new SubState(tr(), [
            new FlexGroup(tr(vec2(gameWidth - qStatsSize.x, gameHeight - qStatsSize.y), qStatsSize),
                new SubState(tr(), qStatsLabels), false, vec2(1, 0), vec2(1, (isMobile() ? 5 : 8)), true)]));
    gameplay.push(qStatsPanel);
}

function setQuickStatsForType(type, indexPair)
{
    switch (type) {
        case RIFLE_MECH: qStatsLabels[1].text = "Rifle Mech"; break;
        case CANNON_MECH: qStatsLabels[1].text = "Cannon Mech"; break;
        case ARTILLERY_MECH: qStatsLabels[1].text = "Artillery Mech"; break;
        case SUPPORT_MECH: qStatsLabels[1].text = "Support Mech"; break;
        case TELEPORT_MECH: qStatsLabels[1].text = "Teleport Mech"; break;
        case HQ_BUILDING: qStatsLabels[1].text = "HQ Building"; break;
        case CITY_BUILDING: qStatsLabels[1].text = "City Building"; break;
        case WAR_BUILDING: qStatsLabels[1].text = "War Building"; break;
        case RUIN_BUILDING: qStatsLabels[1].text = "Ruins"; break;
        default: qStatsLabels[1].text = getMUnitI(indexPair).unit.type.toString();
    }
}

function quickStatsUIUpdate() {
    var indexPair = getIndexPair(map.cursorTile);
    var mapUnit = undefined;

    if (indexPair[0] != -1) {
        mapUnit = getMUnitI(indexPair);
        qStatsLabels[0].text = "HOVERED";
        qStatsPanel.color = getActiveTeamColor() + "BB";
        prevQuickStatsUnit = getMUnitI(indexPair).unit;
        prevQuickStatsTeamID = getPlayerI(indexPair).unitGroup.teamID;
    } else {
        mapUnit = getMUnit();
        qStatsLabels[0].text = "SELECTED";
        qStatsPanel.color = getActiveTeamColor() + "DD";
        prevQuickStatsUnit = getMUnit().unit;
        prevQuickStatsTeamID = getPlayer().unitGroup.teamID;
    }

    setQuickStatsForType(mapUnit.unit.type);
    if(!isMobile()) qStatsLabels[5].text = qStatsLabels[6].text = qStatsLabels[7].text = "";
    else qStatsLabels[2].text = qStatsLabels[3].text = qStatsLabels[4].text = "";
    var lIndex = isMobile() ? 2 : 5;
    if(mapUnit.unit.deployTime > 0) qStatsLabels[lIndex++].text = mapUnit.unit.deployTime.toString() + " Turns to Deploy!";
    else {
        qStatsLabels[lIndex++].text = "HP: " + Math.ceil(mapUnit.hp).toString() + (mapUnit.unit.isBuilding ? "" : ", Rank: " + mapUnit.unit.rank.toString());;
        if(typeof mapUnit.unit.ammo != "undefined") qStatsLabels[lIndex++].text = "Ammo: " + (mapUnit.unit.ammo == -1 ? "Inf." : mapUnit.unit.ammo.toString());
        if(typeof mapUnit.unit.boost != "undefined") { if(mapUnit.unit.boost < 0) qStatsLabels[lIndex++].text = (Math.abs(mapUnit.unit.boost)).toString() + " Turns to Cooldown Boost!";
        else if(mapUnit.unit.boost == 0) qStatsLabels[lIndex++].text = "Boost Ready!"; else if(mapUnit.unit.boost >= 1) qStatsLabels[lIndex++].text = "BOOSTED!"; }
    }

    qStatsPanel.enabled = (maxDisplayTilesPerRow == defaultTilesPerRow);
}

function quickStatsUIDraw() {
    if(!isMobile() && maxDisplayTilesPerRow == defaultTilesPerRow && prevQuickStatsUnit != -1 && qStatsPanel.enabled) {
        prevQuickStatsUnit.draw(prevQuickStatsTeamID, vec2(-prevQuickStatsUnit.position.x, -prevQuickStatsUnit.position.y).add(qStatsPanel.subState.uiObjects[0].transform.position).add(qStatsSize.divide(toVec2(2.0))), toVec2(pixelSize/1.5));
    }
}