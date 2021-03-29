const HELP = 9;
var help = [];
var helpPageIndex = 0;
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

var helpPages = [];

var helpButtons = [];

function helpSetup() {
    var fontStr = ((isMobile() ? 14 : 12) * pixelSize).toString() + "px " + uiContext.fontFamily;

    var helpOffset = vec2(10 * pixelSize, 20 * pixelSize);
    var helpSize = vec2(gameWidth - (20 * pixelSize), gameHeight - (80 * pixelSize));

    helpMain1 =         new SubState(tr(helpOffset, helpSize), []);
    helpMain2 =         new SubState(tr(helpOffset, helpSize), []);
    helpBuildings =     new SubState(tr(helpOffset, helpSize), []);
    helpRifleMech =     new SubState(tr(helpOffset, helpSize), []);
    helpCannonMech =    new SubState(tr(helpOffset, helpSize), []);
    helpArtilleryMech = new SubState(tr(helpOffset, helpSize), []);
    helpSupportMech =   new SubState(tr(helpOffset, helpSize), []);
    helpTeleportMech =  new SubState(tr(helpOffset, helpSize), []);
    helpZareemCO =      new SubState(tr(helpOffset, helpSize), []);
    helpTajaCO =        new SubState(tr(helpOffset, helpSize), []);
    helpGuruCO =        new SubState(tr(helpOffset, helpSize), []);
    helpHuluCO =        new SubState(tr(helpOffset, helpSize), []);
    helpJonahCO =       new SubState(tr(helpOffset, helpSize), []);

    var yOffset = 20 * pixelSize;
    helpMain1.uiObjects.push(new Label(tr(helpOffset.add(vec2(0, yOffset*0)), vec2(helpSize.x, yOffset)), "Flick Tactics is a Turn Based Strategy Game where you need to strategically battle against your opponent using your units.", undefined, undefined, -1));
    helpMain1.uiObjects.push(new Label(tr(helpOffset.add(vec2(0, yOffset*1)), vec2(helpSize.x, yOffset)), "There are 2 types of units: Buildings and Mechs. When you use a Mech, action points or APs are consumed.", undefined, undefined, -1));
    helpMain1.uiObjects.push(new Label(tr(helpOffset.add(vec2(0, yOffset*2)), vec2(helpSize.x, yOffset)), "In other words, player can only do a limited number of actions per turn and once AP gets to zero, you have to end your turn.", undefined, undefined, -1));
    helpMain1.uiObjects.push(new Label(tr(helpOffset.add(vec2(0, yOffset*3)), vec2(helpSize.x, yOffset)), "Upon ending the turn, the opponent team gets the turn and fights against you using their units.", undefined, undefined, -1));
    helpMain1.uiObjects.push(new Label(tr(helpOffset.add(vec2(0, yOffset*4)), vec2(helpSize.x, yOffset)), "This keeps going until a team destroys the other team's Head Quarter or HQ Building.", undefined, undefined, -1));
    helpMain1.uiObjects.push(new Label(tr(helpOffset.add(vec2(0, yOffset*5)), vec2(helpSize.x, yOffset)), "Once a team loses its HQ Building, they loses the battle and all their remaining units gets destroyed or vanished from the map.", undefined, undefined, -1));

    helpBuildings.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2(0+0, 48+3).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));
    helpBuildings.uiObjects.push(new ImageUI(tr(vec2(100,300), vec2(124,124)), gameSheet.imageObject.image, vec2(64+4, 48+3).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));

    helpRifleMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2(0+0, 80+5).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));
    helpCannonMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2(64+4, 80+5).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));
    helpArtilleryMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2((64+4)*2, 80+5).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));
    helpSupportMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2((64+4)*3, 80+5).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));
    helpTeleportMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2((64+4)*4, 80+5).multiply(toVec2(4)), vec2(16, 16).multiply(toVec2(4))));

    helpZareemCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*1, 0).multiply(toVec2(4)), vec2(256, 256).multiply(toVec2(4))));
    helpTajaCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*2, 0).multiply(toVec2(4)), vec2(256, 256).multiply(toVec2(4))));
    helpGuruCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*0, 0).multiply(toVec2(4)), vec2(256, 256).multiply(toVec2(4))));
    helpHuluCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*3, 0).multiply(toVec2(4)), vec2(256, 256).multiply(toVec2(4))));
    helpJonahCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*4, 0).multiply(toVec2(4)), vec2(256, 256).multiply(toVec2(4))));

    helpPages.push(helpMain1);
    helpPages.push(helpMain2);
    helpPages.push(helpBuildings);
    helpPages.push(helpRifleMech);
    helpPages.push(helpCannonMech);
    helpPages.push(helpArtilleryMech);
    helpPages.push(helpSupportMech);
    helpPages.push(helpTeleportMech);
    helpPages.push(helpZareemCO);
    helpPages.push(helpTajaCO);
    helpPages.push(helpGuruCO);
    helpPages.push(helpHuluCO);
    helpPages.push(helpJonahCO);
    
    var fontStr = ((isMobile() ? 26 : 14) * pixelSize).toString() + "px " + uiContext.fontFamily;
    helpPrevButton = new TextButton(tr(), new Label(tr(), "PREV.", fontStr, "white"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    helpButtons.push(helpPrevButton);
    helpPageLabel = new Label( tr(), (helpPageIndex + 1).toString() + "/" + helpPages.length.toString(), fontStr, "white");
    helpButtons.push(helpPageLabel);
    helpToStartButton = new TextButton(tr(), new Label(tr(), "BACK", fontStr, "white"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    helpButtons.push(helpToStartButton);
    helpNextButton = new TextButton(tr(), new Label(tr(), "NEXT", fontStr, "white"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    helpButtons.push(helpNextButton);
    help.push(new FlexGroup(isMobile() ?
        tr(vec2(8 * pixelSize, gameHeight - (100 * pixelSize)), vec2(gameWidth, 66 * pixelSize))
        : tr(vec2((gameWidth / 4) - (8 * pixelSize), gameHeight - (40 * pixelSize)), vec2(gameWidth / 2, 32 * pixelSize)),
        new SubState(tr(), helpButtons), false, vec2(8 * pixelSize, 0), vec2(4, 1), true))

    for(let i = 0; i < helpPages.length; i++)
        help.push(helpPages[i]);

    for(let i = 0; i < helpPages.length; i++)
        helpPages[i].enabled = false;
    helpPages[helpPageIndex].enabled = true;
}

function helpResize() {
}

function helpDraw(deltaTime) {
    drawWorldMapBG("#222222EE");
}

function helpUpdate(deltaTime) {
}

function helpEvent(deltaTime) {
    switch (helpPrevButton.button.output) {
        case UIOUTPUT_HOVER:
            if(helpPrevButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                helpPrevButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            helpPageIndex--;
            if(helpPageIndex < 0) helpPageIndex = helpPages.length - 1;
            helpPageLabel.text = (helpPageIndex + 1).toString() + "/" + helpPages.length.toString();
            for(let i = 0; i < helpPages.length; i++)
                helpPages[i].enabled = false;
            helpPages[helpPageIndex].enabled = true;
            helpPrevButton.button.resetOutput();
    }

    switch (helpNextButton.button.output) {
        case UIOUTPUT_HOVER:
            if(helpNextButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                helpNextButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            helpPageIndex++;
            if(helpPageIndex >= helpPages.length) helpPageIndex = 0;
            helpPageLabel.text = (helpPageIndex + 1).toString() + "/" + helpPages.length.toString();
            for(let i = 0; i < helpPages.length; i++)
                helpPages[i].enabled = false;
            helpPages[helpPageIndex].enabled = true;
            helpNextButton.button.resetOutput();
    }

    switch (helpToStartButton.button.output) {
        case UIOUTPUT_HOVER:
            if(helpToStartButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                helpToStartButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = helpFromGameplay ? GAMEPLAY : STARTSCREEN;
            helpFromGameplay = false;

            helpPageIndex = 0;
            helpPageLabel.text = (helpPageIndex + 1).toString() + "/" + helpPages.length.toString();
            for(let i = 0; i < helpPages.length; i++)
                helpPages[i].enabled = false;
            helpPages[helpPageIndex].enabled = true;
            helpToStartButton.button.resetOutput();
    }
}