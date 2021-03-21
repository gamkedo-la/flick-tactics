const HELP = 9;
var help = [];
var helpMore = 0;
var helpFromGameplay = false;

var helpList = [
{ text: "It is a Turn Based Strategy Game where you get AP (or action points) at the start of each turn.", color: "#88ffff" },
{ text: "The main objective is to destroy the HQ building of all the other teams.", color: "#88ffff" },
{ text: "If some other team ends up destroying your HQ building, you lose.", color: "#88ffff" },
{ text: "HQ Building acts as the In-Game Menu and have a lot of stats and options! Defending it is a priority!", color: "#ffff88"},
{ text: "", color: "white" },
{ text: "Click the Unit (Building or Mech) to select it.", color: "white" },
{ text: "You can also use right and left arrow keys to select other units.", color: "white" },
{ text: "Or you can also use the right and left on-screen arrow buttons on the side of screen.", color: "white" },
{ text: "", color: "white" },
{ text: "After selecting a Mech, you will get few options.", color: "white" },
{ text: "Selecting any of them will show the places where you can use them.", color: "white" },
{ text: "Selecting the move option will allow you to move the unit to any of the white flashing tiles.", color: "white" },
{ text: "Any of the Unit action will cost an action point.", color: "white" },
{ text: "When you have moved a unit, it will darken. When you have used all AP, all units get dark.", color: "white" },
{ text: "", color: "white" },
{ text: "After selecting a Building, a building panel will appear.", color: "white" },
{ text: "Using the building panel, you can boost or upgrade the City or War building.", color: "white" },
{ text: "City Building generates income/cost which will you can upgrade and/or deploy more Mechs.", color: "white" },
{ text: "War Building is used to deploy new Mechs. Deploying mechs doesn't cost AP but it requires cost.", color: "white" },
{ text: "", color: "white" },
{ text: "Forest and Mountain has higher defense values. But if a cannon or artillery mech attacks on a forest, it results in fire.", color: "white" },
{ text: "Sand has lower defense values and attacking on sand results in smoke.", color: "white" },
{ text: "A unit standing on fire will receive damage every turn whereas a unit on sand can not attack while on that tile.", color: "white" },
{ text: "", color: "white" },
{ text: "RIFLE MECHS", color: "#ffbbbb" },
{ text: "They have good movement and weak attack. They can move on the mountains to gain defense as well as attack advantage.", color: "white" },
{ text: "They also have weak defense but they have a smoke to avoid from being attacked directly.", color: "white" },
{ text: "They are good for hunting down Teleport and Supply Mechs. They are also cheap and deploys quickly.", color: "white" },
{ text: "", color: "white" },
{ text: "CANNON MECHS", color: "#ffbbbb" },
{ text: "They are the most defensive mechs but have low movement. They have boost which doubles the movement for a turn.", color: "white" },
{ text: "Their big cannons are a disaster. But those cannons need to be refilled by Supply Mechs after using them for 3 times.", color: "white" },
{ text: "Together with Teleport and Supply Mechs, they are a nightmare for the opponents.", color: "white" },
{ text: "", color: "white" },
{ text: "ARTILLERY MECHS", color: "#ffbbbb" },
{ text: "Superb Attacking power from a distance! They can not attack close units but they have a smoke for safeguard.", color: "white" },
{ text: "They are too slow and their ammo also requires refilling after attacking for 3 times.", color: "white" },
{ text: "Artillery attacks also pushes the surrouding mechs away adding more to its destructive abilities.", color: "white" },
{ text: "", color: "white" },
{ text: "SUPPLY MECHS", color: "#ffbbbb" },
{ text: "Sturdy and fast mechs that carry supplies and repair units.", color: "white" },
{ text: "It is a must and a bunch of them is always required in any battle.", color: "white" },
{ text: "", color: "white" },
{ text: "TELEPORT MECHS", color: "#ffbbbb" },
{ text: "Hovering mech with the ability to teleport any mech. Beaware of its limited teleport ammo of 5.", color: "white" },
{ text: "Teleporting from one point to another uses 1 ammo but teleporting (or swapping) some other mech uses 2 ammo.", color: "white" },
{ text: "Teleportation range also decreases when ammo is less than 4. But this mech can turn the tables!", color: "white" },
{ text: "It can also self-destruct which pushes the surrounding mechs away, causing more chaos!", color: "white" },
];

function helpSetup() {
    var fontStr = (12 * pixelSize).toString() + "px " + uiContext.fontFamily;

    helpLabelGroup = [];
    for(var i = 0; i < (helpList.length / 2); i++) {
        helpLabelGroup.push(new Label(tr(), helpList[i].text, fontStr, helpList[i].color, -1));
    }

    help.push(new FlexGroup(tr(vec2(gameWidth/4, 20 * pixelSize), vec2(gameWidth/2, gameHeight - (80 * pixelSize))),
        new SubState(tr(), helpLabelGroup), false, vec2(), vec2(1, (helpList.length/2)), true));

    helpToStartButton = new TextButton(tr(vec2(gameWidth - (80 * pixelSize), gameHeight - (40 * pixelSize)), vec2(80 * pixelSize, 40 * pixelSize)),
        new Label(tr(), "BACK", fontStr, "lightblue"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    help.push(helpToStartButton);
    helpMoreButton = new TextButton(tr(vec2(gameWidth - (200 * pixelSize), gameHeight - (40 * pixelSize)), vec2(80 * pixelSize, 40 * pixelSize)),
        new Label(tr(), "1/2", fontStr, "lightblue"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    help.push(helpMoreButton);
}

function helpResize() {
    var fontStr = (12 * pixelSize).toString() + "px " + uiContext.fontFamily;

    for (let i = 0; i < helpLabelGroup.length; i++) {
        helpLabelGroup[i].font = fontStr;
    }
    helpToStartButton.label.font = fontStr;

    help[0].transform.position = vec2(0, 20 * pixelSize);
    help[0].transform.scale = vec2(gameWidth, gameHeight / 2);

    helpToStartButton.transform.position = vec2(gameWidth - (80 * pixelSize), gameHeight - (20 * pixelSize));
    helpToStartButton.transform.scale = vec2(80 * pixelSize, 20 * pixelSize);
}

function helpDraw(deltaTime) {
    drawWorldMapBG("#222222EE");
}

function helpUpdate(deltaTime) {
}

function helpEvent(deltaTime) {
    switch (helpMoreButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(helpMoreButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                helpMoreButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);

            helpMore++;
            if(helpMore > 1) helpMore = 0;
            var n = 0;
            for(var i = helpMore * (helpList.length / 2); i < (helpMore * (helpList.length / 2)) + (helpList.length / 2); i++) {
                helpLabelGroup[n].text = helpList[i].text;
                helpLabelGroup[n].textColor = helpList[i].color;
                n++;
            }
            helpMoreButton.label.text = (helpMore+1).toString() + "/2";

            helpMoreButton.button.resetOutput();
    }

    switch (helpToStartButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(helpToStartButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                helpToStartButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = helpFromGameplay ? GAMEPLAY : STARTSCREEN;
            helpFromGameplay = false;

            helpMore = 0;
            var n = 0;
            for(var i = helpMore * (helpList.length / 2); i < (helpMore * (helpList.length / 2)) + (helpList.length / 2); i++) {
                helpLabelGroup[n].text = helpList[i].text;
                helpLabelGroup[n].textColor = helpList[i].color;
                n++;
            }
            helpMoreButton.label.text = (helpMore+1).toString() + "/2";

            helpToStartButton.button.resetOutput();
    }
}