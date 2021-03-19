const VOLUME_TRANSITION_FACTOR = 0.025;

const BGM_MENU = 0;
const BGM_WORLDMAP = 1;
const BGM_GAMEPLAY = 2;
const BGM_GOODPOWER = 3;
const BGM_BADPOWER = 4;
var BGM = [
        {
            content: document.createElement('audio'),
            state: false,
            path: 'music/FT_MainMenu_Loop.webm'
        },
        {
            content: document.createElement('audio'),
            state: false,
            path: 'music/FT_WorldMap_Loop.webm'
        },
        {
            content: document.createElement('audio'),
            state: false,
            path: 'music/FT_Gameplay_Loop.webm'
        },
        {
            content: document.createElement('audio'),
            state: false,
            path: 'music/FT_PlayerCO_Loop.webm'
        },
        {
            content: document.createElement('audio'),
            state: false,
            path: 'music/FT_EnemyCO_Loop.webm'
        },
    ];

const SFX_BUTTON_CANCEL = 0;
const SFX_BUTTON_CLICK = 1;
const SFX_BUTTON_HOVER = 2;
const SFX_ENDTURN = 3;
const SFX_MECHDAMAGE = 4;
const SFX_MECHDESTROY = 5;
const SFX_BUILDINGDAMAGE = 6;
const SFX_BUILDINGDESTROY = 7;
var SFX = [
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_Button_Cancel.wav'
    },  
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_Button_Click.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_Button_Hover.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_EndTurn.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_EndTurn.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_UnitDamage.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_UnitDestroy.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_BuildingDamage.wav'
    },
    {
        content: [document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio'),document.createElement('audio')],
        index: 0,
        path: 'audio/FT_BuildingDestroy.wav'
    },
];

function audioSetup()
{
    for(let i = 0; i < BGM.length; i++)
    {
        BGM[i].content.setAttribute('src', BGM[i].path);
        BGM[i].content.loop = true;
        BGM[i].content.volume = 0.0;
    }

    for(let i = 0; i < SFX.length; i++)
    {
        for(let n = 0; n < SFX[i].content.length; n++)
            SFX[i].content[n].setAttribute('src', SFX[i].path);
    }
}

function playBGM(id)
{
    if(id <= -1) {
        for(let i = 0; i < BGM.length; i++) {
            BGM[i].content.pause();
            BGM[i].state = false;
        }
    } else if(gameOptions.BGMEnabled) {
        BGM[id].content.play();
        BGM[id].state = true;
        for(let i = 0; i < BGM.length; i++) {
            if(i == id) continue;
            BGM[i].state = false;
        }
    }
}

function audioUpdate()
{
    if(gameOptions.BGMEnabled) {
        for(let i = 0; i < BGM.length; i++) {
            if(BGM[i].state)
                BGM[i].content.volume = lerp(BGM[i].content.volume, 1.0, VOLUME_TRANSITION_FACTOR);
            else
            {
                BGM[i].content.volume = lerp(BGM[i].content.volume, 0.0, VOLUME_TRANSITION_FACTOR);
                if(BGM[i].content.volume <= 0.05)
                {
                    BGM[i].content.pause();
                    BGM[i].content.currentTime = 0;
                }
            }
        }
    }
}

function playSFX(id)
{
    if(gameOptions.SFXEnabled) {
        SFX[id].content[SFX[id].index++].play();
        if(SFX[id].index >= SFX[id].content.length) SFX[id].index = 0;
    }
}

function audioPlayOnInput()
{
    startscreen[0].enabled = false;
    startscreen[1].enabled = true;
}
