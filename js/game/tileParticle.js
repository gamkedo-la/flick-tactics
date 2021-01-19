
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

const FOREST_FIRE_TURNS = 6;
const AFTER_FOREST_SMOKE_TURNS = 4;
const SAND_SMOKE_TURNS = 2;

var particles = [];

class TileParticle {
    constructor(position, sequence, endFunction = function(self){})
    {
        this.position = position;
        this.endFunction = endFunction;
        this.currentIndex = 0;
        this.sequence = sequence;
        this.timer = 0;
        particles.push(this);
    }

    forTurns(turns)
    {
        this.turns = turns;
    }

    draw(deltaTime, camPos, sc)
    {
        if(this.timer >= this.sequence[this.currentIndex].duration)
        {
            this.timer = this.sequence[this.currentIndex].duration - this.timer;
            this.currentIndex++;

            if(this.currentIndex >= this.sequence.length)
            {
                if(typeof this.turns == "undefined")
                {
                    for(let i = 0; i < particles.length; i++)
                    {
                        if(this == particles[i])
                        {
                            this.endFunction(this);
                            particles.splice(i, 1);
                            return;
                        }
                    }
                }
                else
                {
                    this.currentIndex = 0;
                }
            }
        }
        else
        {
            this.timer += deltaTime;
        }

        if(typeof sc == "undefined")
            sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
            (tileSize / 64) + gridBlackLinesFixFactor);
        
        drawSheet(this.sequence[this.currentIndex].index, this.position.add(camPos), sc);
    }
};

function decrementTileParticlesTurns()
{
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

function drawTileParticles(deltaTime, camPos)
{
    for(let i = 0; i < particles.length; i++)
        particles[i].draw(deltaTime, camPos);
}

function isTileOnSmoke(pos)
{
    for(let i = 0; i < particles.length; i++) {
        if((particles[i].sequence[0].index == 78 || particles[i].sequence[0].index == 79)
        && pos.isEqual(pixelPositionToTilePosition(particles[i].position)))
            return true;
    }
    return false;
}

function isTileOnFire(pos)
{
    for(let i = 0; i < particles.length; i++) {
        if((particles[i].sequence[0].index == 98 || particles[i].sequence[0].index == 99)
        && pos.isEqual(pixelPositionToTilePosition(particles[i].position)))
            return true;
    }
    return false;
}