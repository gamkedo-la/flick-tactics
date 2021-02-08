
var dialogueFontSize;

var dialogueSpeaker;
var dialogueLine1;
var dialogueLine2;

var dialogues = [];
var characterDelay = 0.01;
var dialogueInput;
var characterTimer = 0.0;
var characterIndex = 0;

var GURU = 0;
var ZAREEM = 1;
var TAJA = 2;
var HULU = 3;
var JONAH = 4;

var FACE_NEUTRAL = 0;
var FACE_HAPPY = 1;
var FACE_SAD = 2;
var FACE_UPSET = 3;
var FACE_ANGRY = 4;
var FACE_SHOCK = 5;

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
    dialogueFontSize = 0.032 * gameWidth;

    dialogueFaceSize = 256.0 * (pixelSize/2.0);
    soldierFaceSprite = new Sprite(tr(vec2((gameWidth/12) + (38.0 * pixelSize), baseYPosition + (64.0 * pixelSize)), toVec2(pixelSize/2.0)), new ImageObject("images/soldierFace1.png"));

    for(let i = 0; i < no_campaign.length; i++)
        dialogues.push(no_campaign[i].dialogue);

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
    dialogueLine3 = new Label(tr(vec2(gameWidth/12, baseYPosition + (dialogueFontSize * 3.0)),
        vec2(gameWidth - (gameWidth/6), gameHeight/9)), "",
        dialogueFontSize + "px " + uiContext.fontFamily, "#ffffff", -1);
    uiArray.push(dialogueLine3);
}

function dialogueProcess(isDelay)
{
    dialogueSpeaker.text = dialogueCO[GURU].name;
    if(renderer.measureText(dialogueLine1.text).width < (gameWidth - (gameWidth/6)) - (gameWidth/10) - dialogueOffsetWhenDisplayingFace)
    {
        dialogueLine1.text += dialogues[0][characterIndex];

        if(renderer.measureText(dialogueLine1.text).width > (gameWidth - (gameWidth/6)) - (gameWidth/10) - dialogueOffsetWhenDisplayingFace
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

            dialogueLine2.text += dialogues[0][characterIndex];
        }
        else if (renderer.measureText(dialogueLine2.text).width < (gameWidth - (gameWidth/6)) - (gameWidth/10) - dialogueOffsetWhenDisplayingFace)
        {
            dialogueLine2.text += dialogues[0][characterIndex];

            if(renderer.measureText(dialogueLine2.text).width > (gameWidth - (gameWidth/6)) - (gameWidth/10) - dialogueOffsetWhenDisplayingFace
            && dialogueLine2.text[dialogueLine2.text.length - 1] !== ' '
            && dialogues[0][characterIndex+1] !== ' ')
                dialogueLine2.text += "-";
        }
        else if(dialogueLine2.text.length <= 0)
        {
            if(dialogueLine2.text[dialogueLine2.text.length - 1] == '-')
                dialogueLine3.text += "-";
            else if(dialogues[0][characterIndex] == ' ')
                characterIndex++;

            dialogueLine3.text += dialogues[0][characterIndex];
        }
        else
        {
            dialogueLine3.text += dialogues[0][characterIndex];
        }
    }
    
    if(isDelay) characterTimer = characterDelay;
    characterIndex++;
}

function dialogueUpdate(deltaTime)
{
    if(dialogues.length > 0 && ui.transitionToState == -1)
    {
        //when not displaying face
        //var dialogueOffsetWhenDisplayingFace = 0;
        //dialogueSpeaker.transform.position.x = dialogueLine1.transform.position.x = dialogueLine2.transform.position.x = dialogueLine3.transform.position.x = (gameWidth/12);

        //when displaying face
        dialogueOffsetWhenDisplayingFace = dialogueFaceSize/2;
        dialogueSpeaker.transform.position.x = dialogueLine1.transform.position.x = dialogueLine2.transform.position.x = dialogueLine3.transform.position.x = (gameWidth/12) + dialogueFaceSize;

        if(isTouched)
        {
            if (characterIndex < dialogues[0].length)
            {
                while(characterIndex < dialogues[0].length) dialogueProcess(false);
            }
            else
            {
                dialogueLine1.text = "";
                dialogueLine2.text = "";
                dialogueLine3.text = "";
                characterTimer = 0;
                characterIndex = 0;
                dialogues.shift();

                if (dialogues.length <= 0) {
                    dialogueIndex = 0;
                    characterIndex = 0;
                    characterTimer = 0;
                    dialogueLine1.text = "";
                    dialogueLine2.text = "";
                    dialogueLine3.text = "";

                    dialogueSpeaker.enabled = dialogueLine1.enabled = dialogueLine2.enabled = false;

                    return false;
                }
            }
        }
        else if (characterTimer <= 0 && characterIndex < dialogues[0].length) dialogueProcess(true);
        
        if(characterTimer > 0) characterTimer -= deltaTime;

        dialogueSpeaker.enabled = dialogueLine1.enabled = dialogueLine2.enabled = true;

        return true;
    }

    return false;
}

function dialogueDraw()
{
    if(dialogues.length > 0 && ui.transitionToState == -1) {
        drawRect(renderer, vec2(gameWidth/16, gameHeight/1.4), vec2(gameWidth - (gameWidth/8), gameHeight/4), true, "#323353", 32);

        //displaying face
        drawRect(renderer, soldierFaceSprite.transform.position.subtract(toVec2(dialogueFaceSize/2.0)), toVec2(dialogueFaceSize), true, "#441111");
        soldierFaceSprite.drawSc();
    }
}