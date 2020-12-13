
//Animated Tiles that stay for some time

var unitDestroySequence = [
    {index: 17, duration: 80},
    {index: 37, duration: 60},
    {index: 57, duration: 60},
    {index: 77, duration: 50},
    {index: 97, duration: 50},
];

var particles = [];

class TileParticle {
    constructor(position, sequence, endFunction = function(){})
    {
        this.position = position;
        this.endFunction = endFunction;
        this.currentIndex = 0;
        this.sequence = sequence;
        this.timer = 0;
        particles.push(this);
    }

    draw(deltaTime, camPos, sc)
    {
        if(this.timer >= this.sequence[this.currentIndex].duration)
        {
            this.timer = this.sequence[this.currentIndex].duration - this.timer;
            this.currentIndex++;

            if(this.currentIndex >= this.sequence.length)
            {
                for(let i = 0; i < particles.length; i++)
                {
                    if(this == particles[i])
                    {
                        this.endFunction();
                        particles.splice(i, 1);
                        return;
                    }
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

function drawTileParticles(deltaTime, camPos)
{
    for(let i = 0; i < particles.length; i++)
        particles[i].draw(deltaTime, camPos);
}