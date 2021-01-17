
var aiTaskTimer = 0;
var aiDelayPerTask = 500;

var aiUnitSelected = false;
var aiMechMove = false;

//TEMP
var aiNoMechMoveLeft = false;

function aiUpdate(deltaTime)
{
    if(getPlayer().control == 1) {
        if(aiTaskTimer <= 0)
        {
            //MECH CONTROL
            if(getPlayer().actionPoints > 0 && getPlayer().getTotalNumberOfMechs() > 0
            && !aiNoMechMoveLeft /*TEMP*/) {

                //Selecting unmoved Mech
                if(!aiUnitSelected) {
                    var unmovedIndex = getPlayer().setSelectedIndexToAnyUnmovedMech();
                    aiUnitSelected = true;
                    if(unmovedIndex == -1) { aiNoMechMoveLeft = true; aiUnitSelected = false; }

                //Selecting Mech's Move command
                } else if (getPlayer().getSelectedMapUnit().up != -1
                    && getPlayer().getSelectedMapUnit().up != 0) {
                    getPlayer().getSelectedMapUnit().up = 0;

                //Selecting a tile to move to
                } else {
                    map.eventAIUnitMovement(getPlayer().getSelectedMapUnit());
                    getPlayer().actionPoints--;
                    aiUnitSelected = false;
                }


            //BUILDING CONTROL
            } else if (getPlayer().money >= MECHCOST[0] && getPlayer().hasWarBuilding() && Math.random() < 0.8) {

                //Selecting War Building
                if(!aiUnitSelected) {
                    getPlayer().setSelectedIndexToAnyWarBuilding();
                    aiUnitSelected = true;

                //Deploy a Rifle Mech
                } else {
                    if(getPlayer().money >= MECHCOST[2])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 2);
                    else if(getPlayer().money >= MECHCOST[1])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 1);
                    else if(getPlayer().money >= MECHCOST[3])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 3);
                    else if(getPlayer().money >= MECHCOST[4])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 4);
                    else if(getPlayer().money >= MECHCOST[0])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 0);
                    aiUnitSelected = false;
                }

            
            // END TURN IF NOTHING LEFT TO DO
            } else {
                manager.endTurn();
                aiUnitSelected = false;

                aiNoMechMoveLeft = false; //TEMP
            }

            aiTaskTimer = aiDelayPerTask;
        } else {
            aiTaskTimer -= deltaTime;
        }
    } else {
        aiTaskTimer = aiDelayPerTask;
    }
}

function isAnySpaceFreeAroundBuilding(buildingMapUnit) {
    var pos = buildingMapUnit.mapPosition;
    return manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1
        || manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(1, 0)))[0] == -1
        || manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, -1)))[0] == -1
        || manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1;
}

function deployMechFromBuilding(buildingMapUnit, type) {
    var pos = buildingMapUnit.mapPosition;
    if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(0, 1)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(1, 0)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(1, 0)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, -1)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(0, -1)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(-1, 0)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(-1, 0)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
}