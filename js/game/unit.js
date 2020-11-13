
//Unit class represents the base unit and not the one that is to be rendered on the map
//Map Unit class consists of Unit and its purpose is to deploy and render units on the map
//Map Unit Group class is a group of Map Units

const RIFLE_MECH = 0;
const CANNON_MECH = 1;
const ARTILLERY_MECH = 2;
const SUPPORT_MECH = 3;
const TELEPORT_MECH = 4;

//buildings acts as units
const HQ_BUILDING = 80;
const CITY_BUILDING = 84;
const WAR_BUILDING = 88;
const RUIN_BUILDING = 92;

class Unit {
    constructor(type, pos) {
        this.type = type;
        this.position = typeof pos == "undefined" ? vec2(0, 0) : pos;
        this.setupUnitProperties();
    }

    setupUnitProperties() {
        this.isBuilding = false;
        switch (this.type) {
            case RIFLE_MECH:
                this.movement = 3;
                break;

            case CANNON_MECH:
                this.movement = 2; //+2 on boost
                break;

            case ARTILLERY_MECH:
                this.movement = 2;
                break;

            case SUPPORT_MECH:
                this.movement = 5;
                break;

            case TELEPORT_MECH:
                this.movement = 5;
                break;

            case HQ_BUILDING:
                this.isBuilding = true;
                this.movement = 0;
                break;

            case CITY_BUILDING:
                this.isBuilding = true;
                this.movement = 0;
                break;

            case WAR_BUILDING:
                this.isBuilding = true;
                this.movement = 0;
                break;
        }
    }

    draw(teamID, offset, scale) {
        if (typeof scale == "undefined") scale = vec2(1, 1);

        if(!this.isBuilding)
            drawSheet(100 + (4 * this.type) + teamID, offset.add(this.position), scale);
        else if(this.isBuilding)
            drawSheet(this.type + teamID, offset.add(this.position), scale);
    }
}

class MapUnit {
    constructor(type, mapPos) {
        this.mapPosition = mapPos;
        var pos = vec2(Math.floor((this.mapPosition.x * tileSize) + (this.mapPosition.x * tileGap)),
            Math.floor((this.mapPosition.y * tileSize) + (this.mapPosition.y * tileGap)));
        this.unit = new Unit(type, pos);

        this.hp = 10.0;
        
        this.clearDisabledActions();
    }

    clearDisabledActions() {
        this.up = this.left = this.down = this.right = 1;
    }

    getCameraPosition() {
        return vec2(-this.unit.position.x + (gameWidth / 2), -this.unit.position.y + (gameHeight / 2));
    }

    draw(teamID, offset) {
        var sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
            (tileSize / 64) + gridBlackLinesFixFactor);
        if(maxDisplayTilesPerRow != defaultTilesPerRow)
            this.unit.position = vec2(Math.floor(this.mapPosition.x * tileSize) + (this.mapPosition.x * tileGap),
                Math.floor(this.mapPosition.y * tileSize) + (this.mapPosition.y * tileGap));
        else
            this.unit.position = lerpVec2(this.unit.position, vec2(Math.floor(this.mapPosition.x * tileSize) + (this.mapPosition.x * tileGap),
                Math.floor(this.mapPosition.y * tileSize) + (this.mapPosition.y * tileGap)), 0.25);

        this.unit.draw(teamID, offset, sc);

        if (ui.stateIndex != BATTLESCREEN && maxDisplayTilesPerRow == defaultTilesPerRow)
        {
            spritesRenderer.font = (24 * pixelSize).toString() + "px OrangeKid";
            drawText(spritesRenderer, this.hp.toString(), offset.add(this.unit.position.add(vec2(-31.6 * pixelSize, -16.6 * pixelSize))), "black");
            drawText(spritesRenderer, this.hp.toString(), offset.add(this.unit.position.add(vec2(-30 * pixelSize, -18 * pixelSize))), "white");
        }
    }
}

class MapUnitGroup {
    constructor(mapUnits) {
        this.mapUnits = mapUnits;
        this.teamID = RED_TEAM;
    }

    clearDisabledActions() {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].clearDisabledActions();
        }
    }

    draw(offset) {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].draw(this.teamID, offset);
        }
    }
}

function updateUnitActionButtons() {
    switch (getPlayer().unitGroup.mapUnits[getPlayer().selectedIndex].unit.type) {
        case RIFLE_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE"; //no
            unitDownBtn.label.text = "EMP"; //no
            unitRightBtn.label.text = "ATTACK";
            break;

        case CANNON_MECH:
            unitUpBtn.label.text = "MOVE"; //push->no
            unitLeftBtn.label.text = "BOOST"; //no
            unitDownBtn.label.text = "MINI-ART"; //no; push->no
            unitRightBtn.label.text = "ATTACK";
            break;

        case ARTILLERY_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE"; //no
            unitDownBtn.label.text = "SHIELD"; //no
            unitRightBtn.label.text = "ATTACK"; //push
            break;

        case SUPPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SUPPLY"; //no
            unitDownBtn.label.text = "REPAIR"; //no
            unitRightBtn.label.text = "TACKLE"; //push
            break;

        case TELEPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "TELEPORT"; //no
            unitDownBtn.label.text = "SHIELD"; //no
            unitRightBtn.label.text = "TACKLE";
            break;
    }
}