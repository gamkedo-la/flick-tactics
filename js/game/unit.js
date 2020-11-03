
//Unit class represents the base unit and not the one that is to be rendered on the map
//Map Unit class consists of Unit and its purpose is to deploy and render units on the map
//Map Unit Group class is a group of Map Units

class Unit {
    constructor(index, pos) {
        this.index = index;
        this.position = typeof pos == "undefined" ? vec2(0, 0) : pos;

        //Unit Properties START
        this.movement = 4;
        //Unit Properties END
    }

    draw(offset, scale) {
        if (typeof scale == "undefined") scale = vec2(1, 1);
        drawSheet(this.index, offset.add(this.position), scale);
    }
}

class MapUnit {
    constructor(index, mapPos) {
        this.mapPosition = mapPos;
        var pos = vec2(Math.floor(this.mapPosition.x * (gameWidth / maxDisplayTilesPerRow)),
            Math.floor(this.mapPosition.y * (gameWidth / maxDisplayTilesPerRow)));
        this.unit = new Unit(index, pos);

        this.hp = 10;
        this.clearDisabledActions()
    }

    clearDisabledActions() {
        this.up = this.left = this.down = this.right = 1;
    }

    getCameraPosition() {
        return vec2(-this.unit.position.x + (gameWidth / 2), -this.unit.position.y + (gameHeight / 2));
    }

    draw(offset) {
        var sc = vec2(((gameWidth / maxDisplayTilesPerRow) / 64) + gridBlackLinesFixFactor,
            ((gameWidth / maxDisplayTilesPerRow) / 64) + gridBlackLinesFixFactor);
        this.unit.position = lerpVec2(this.unit.position, vec2(Math.floor(this.mapPosition.x * (gameWidth / maxDisplayTilesPerRow)),
            Math.floor(this.mapPosition.y * (gameWidth / maxDisplayTilesPerRow))), 0.25);
        this.unit.draw(offset, sc);
        drawText(spritesRenderer, this.hp.toString(), offset.add(this.unit.position.add(vec2(-32 * pixelSize, -16 * pixelSize))), "white");
    }
}

class MapUnitGroup {
    constructor(mapUnits, teamID) {
        this.mapUnits = mapUnits;
        this.teamID = typeof teamID == "undefined" ? 0 : teamID;
    }

    clearDisabledActions() {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].clearDisabledActions();
        }
    }

    draw(offset) {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].draw(offset);
        }
    }
}