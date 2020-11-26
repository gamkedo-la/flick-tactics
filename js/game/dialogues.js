
var dialogueFontSize;

var dialogueSpeaker;
var dialogueLine1;
var dialogueLine2;

var dialogues = [
    "Welcome to Flick Tactics Zareem! Here, we'll train you to be the most powerful strategest the world has ever created!",
    "Uh... Hello sir!",
    "It's GURU SIR!",
    "YES! GURU SIR!",
    "That's right young'n.  When I was your age, I'd already fought a bear with my bear hands and it couldn't bear it at all!",
    "Right... sir....?",
    "That's GURU SIR!",
    "YES! GURU SIR!",
    "Let's learn Movement, click a unit and select \"Move\" then select a square to move to!",
    "On it's GURU SIR!"
];
var characterDelay = 0.01;
var dialogueInput;
var characterTimer = 0.0;
var characterIndex = 0;

var GURU = 0;
var ZAREEM = 1;
var TAJA = 2;
var HULU = 3;
var JONAH = 4;

var dialogueCO = [
    {name: "GURU:", color: "#fbff86"},
    {name: "ZAREEM:", color: "#8ff8e2"},
    {name: "TAJA:", color: "#ea4f36"},
    {name: "HULU:", color: "#ed8099"},
    {name: "JONAH:", color: "#a884f3"}
];

function dialogueSetup(uiArray)
{
    var baseYPosition = gameHeight/1.4;
    dialogueFontSize = 0.04 * gameWidth;

    dialogueSpeaker = new Label(tr(vec2(gameWidth/12, baseYPosition),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)),
        dialogueCO[GURU].name, dialogueFontSize + "px " + uiContext.fontFamily, dialogueCO[GURU].color, -1);
    uiArray.push(dialogueSpeaker);
    dialogueLine1 = new Label(tr(vec2(gameWidth/12, baseYPosition + (dialogueFontSize * 1.0)),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)), "",
        dialogueFontSize + "px " + uiContext.fontFamily, "#ffffff", -1);
    uiArray.push(dialogueLine1);
    dialogueLine2 = new Label(tr(vec2(gameWidth/12, baseYPosition + (dialogueFontSize * 2.0)),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)), "",
        dialogueFontSize + "px " + uiContext.fontFamily, "#ffffff", -1);
    uiArray.push(dialogueLine2);
}

function dialogueUpdate(deltaTime)
{
    if(dialogues.length > 0)
    {
        if(isTouched)
        {
            if (characterIndex < dialogues[0].length)
            {
                while(characterIndex < dialogues[0].length)
                {
                    if(renderer.measureText(dialogueLine1.text).width < (gameWidth - (gameWidth/6)) - (gameWidth/10))
                    {
                        dialogueLine1.text += dialogues[0][characterIndex];

                        if(renderer.measureText(dialogueLine1.text).width > (gameWidth - (gameWidth/6)) - (gameWidth/10)
                        && dialogueLine1.text[dialogueLine1.text.length - 1] !== ' '
                        && dialogues[0][characterIndex+1] !== ' ')
                            dialogueLine1.text += "-";
                    }
                    else
                    {
                        if(dialogueLine2.text.length <= 0)
                        {
                            if(dialogueLine1.text[dialogueLine1.text.length - 1] == '-')
                                dialogueLine2.text += "-";
                            else if(dialogues[0][characterIndex] == ' ')
                                characterIndex++;
                        }
                        
                        dialogueLine2.text += dialogues[0][characterIndex];
                    }
                    
                    characterIndex++;
                }
            }
            else
            {
                dialogueLine1.text = "";
                dialogueLine2.text = "";
                characterTimer = 0;
                characterIndex = 0;
                dialogues.shift();

                if (dialogues.length <= 0)
                {
                    dialogueIndex = 0;
                    characterIndex = 0;
                    characterTimer = 0;
                    dialogueLine1.text = "";
                    dialogueLine2.text = "";

                    dialogueSpeaker.enabled = dialogueLine1.enabled = dialogueLine2.enabled = false;

                    return false;
                }
            }
        }
        else if (characterTimer <= 0 && characterIndex < dialogues[0].length)
        {
            if(renderer.measureText(dialogueLine1.text).width < (gameWidth - (gameWidth/6)) - (gameWidth/10))
            {
                dialogueLine1.text += dialogues[0][characterIndex];

                if(renderer.measureText(dialogueLine1.text).width > (gameWidth - (gameWidth/6)) - (gameWidth/10)
                && dialogueLine1.text[dialogueLine1.text.length - 1] !== ' '
                && dialogues[0][characterIndex+1] !== ' ')
                    dialogueLine1.text += "-";
            }
            else
            {
                if(dialogueLine2.text.length <= 0)
                {
                    if(dialogueLine1.text[dialogueLine1.text.length - 1] == '-')
                        dialogueLine2.text += "-";
                    else if(dialogues[0][characterIndex] == ' ')
                        characterIndex++;
                }
                
                dialogueLine2.text += dialogues[0][characterIndex];
            }
            
            characterTimer = characterDelay;
            characterIndex++;
        }
        
        if(characterTimer > 0)
        {
            characterTimer -= deltaTime;
        }

        return true;
    }

    return false;
}

function dialogueDraw()
{
    if(dialogues.length > 0)
        drawRect(renderer, vec2(gameWidth/16, gameHeight/1.4), vec2(gameWidth - (gameWidth/8), gameHeight/4), true, "#323353", 32);
}