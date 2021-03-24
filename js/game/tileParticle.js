
//Animated Tiles that stay for some time

var unitDestroySequence = [
    {index: 17, duration: 80},
    {index: 37, duration: 60},
    {index: 57, duration: 60},
    {index: 77, duration: 50},
    {index: 97, duration: 50},
];

var smokeSequence = [
    {index: 78, duration: 600},
    {index: 79, duration: 600},
];

var fireSequence = [
    {index: 98, duration: 600},
    {index: 99, duration: 600},
];

var rankUpSequence = [
    {index: 10, duration: 120},
    {index: 30, duration: 120},
    {index: 50, duration: 120}
];

var repairSequence = [
    {index: 11, duration: 120},
    {index: 31, duration: 120},
    {index: 51, duration: 120}
];

var damageSequence = [
    {index: 12, duration: 120},
    {index: 32, duration: 120},
    {index: 52, duration: 120}
];

var incomeSequence = [
    {index: 9, duration: 60},
    {index: 29, duration: 80},
    {index: 49, duration: 120},
    {index: 29, duration: 80},
    {index: 9, duration: 60}
];

var teleportSequence = [
    {index: 8, duration: 120},
    {index: 28, duration: 120},
    {index: 48, duration: 120}
];

const FOREST_FIRE_TURNS = 4;
const AFTER_FOREST_SMOKE_TURNS = 3;
const MECH_FIRE_TURNS = 2;
const SAND_SMOKE_TURNS = 2;
const MECH_SMOKE_TURNS = 3;

var particles = [];

class TileParticle {
    constructor(position, sequence, endFunction = function(self){}, addToParticles = true) {
        this.position = position;
        this.endFunction = endFunction;
        this.currentIndex = 0;
        this.sequence = sequence;
        this.timer = 0;
        this.sound = true;
        this.text = "";
        if(addToParticles) particles.push(this);
    }

    copy(tp) {
        this.position = tp.position;
        this.endFunction = tp.endFunction;
        this.currentIndex = tp.currentIndex;
        this.sequence = tp.sequence;
        this.timer = tp.timer;
        this.sound = tp.sound;
        this.text = tp.text;
        if(typeof tp.turns != "undefined") this.turns = tp.turns;
    }

    forTurns(turns) {
        this.turns = turns;
    }

    playSound() {
        if(this.sound) {
            if(this.sequence == unitDestroySequence) { Math.random() < 0.25 ? playSFX(SFX_BUILDINGDESTROY) : playSFX(SFX_MECHDESTROY); }
            else if(this.sequence == damageSequence) { Math.random() < 0.25 ? playSFX(SFX_BUILDINGDAMAGE) : playSFX(SFX_MECHDAMAGE); }
            else if(this.sequence == incomeSequence) { playSFX(SFX_COIN); }
            else if(this.sequence == rankUpSequence) { playSFX(SFX_RANKUP); }
            else if(this.sequence == teleportSequence) { playSFX(SFX_TELEPORT); }
            else if(this.sequence == fireSequence) { playSFX(SFX_FIRE); }
            else if(this.sequence == smokeSequence) { playSFX(SFX_SMOKE); }
            else if(this.sequence == smokeSequence) { playSFX(SFX_REPAIR); }
            this.sound = false;
        }
    }

    draw(deltaTime, camPos, sc) {
        if(this.timer >= this.sequence[this.currentIndex].duration)
        {
            this.timer = this.sequence[this.currentIndex].duration - this.timer;
            this.currentIndex++;

            if(this.currentIndex >= this.sequence.length) {
                if(typeof this.turns == "undefined") {
                    for(let i = 0; i < particles.length; i++) {
                        if(this == particles[i]) {
                            this.endFunction(this);
                            particles.splice(i, 1);
                            return;
                        }
                    }
                } else {
                    this.currentIndex = 0;
                }
            }
        } else {
            this.timer += deltaTime;
        }

        this.playSound();

        if(typeof sc == "undefined")
            sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
            (tileSize / 64) + gridBlackLinesFixFactor);
        
        drawSheet(this.sequence[this.currentIndex].index, this.position.add(camPos), sc);
        
        drawText(spritesRenderer, this.text, this.position.add(camPos).add(vec2(pixelSize, -pixelSize)), "black");
        drawText(spritesRenderer, this.text, this.position.add(camPos), "white");
    }

    drawIsolate(deltaTime, camPos, sc) {
        if(this.timer >= this.sequence[this.currentIndex].duration)
        {
            this.timer = this.sequence[this.currentIndex].duration - this.timer;
            this.currentIndex++;

            if(this.currentIndex >= this.sequence.length) {
                return false;
            }
        } else {
            this.timer += deltaTime;
        }

        this.playSound();

        if(typeof sc == "undefined")
            sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
            (tileSize / 64) + gridBlackLinesFixFactor);
        
        drawSheet(this.sequence[this.currentIndex].index, this.position.add(camPos), sc);

        drawText(spritesRenderer, this.text, this.position.add(camPos).add(vec2(pixelSize, -pixelSize)), "black");
        drawText(spritesRenderer, this.text, this.position.add(camPos), "white");

        return true;
    }
};

function decrementTileParticlesTurns() {
    for(let i = 0; i < particles.length; i++) {
        if(typeof particles[i].turns != "undefined") {
            particles[i].turns--;
            if(particles[i].turns == 0) { //Infinite Turns if <= -1
                particles[i].endFunction(particles[i]);
                particles.splice(i, 1);
                i--;
            }
        }
    }
}

function drawTileParticles(deltaTime, camPos) {
    if(maxDisplayTilesPerRow != totalTilesInRow)
        for(let i = 0; i < particles.length; i++)
            particles[i].draw(deltaTime, camPos);
}

function isTileOnSmoke(pos) {
    for(let i = 0; i < particles.length; i++) {
        if((particles[i].sequence[0].index == 78 || particles[i].sequence[0].index == 79)
        && pos.isEqual(pixelPositionToTilePositionForDefaultDisplayTilesPerRow(particles[i].position)))
            return true;
    }
    return false;
}

function isTileOnFire(pos) {
    for(let i = 0; i < particles.length; i++) {
        if((particles[i].sequence[0].index == 98 || particles[i].sequence[0].index == 99)
        && pos.isEqual(pixelPositionToTilePositionForDefaultDisplayTilesPerRow(particles[i].position)))
            return true;
    }
    return false;
}

function removeTileParticles(pos) {
    for(let i = 0; i < particles.length; i++) {
        if(pos.isEqual(pixelPositionToTilePosition(particles[i].position))) {
            particles.splice(i, 1);
            i--;
        }
    }
}