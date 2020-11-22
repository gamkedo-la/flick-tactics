const BGM_MENU = 0;
var BGM = [
        {
            content: document.createElement('audio'),
            path: 'music/FT_MainMenu_Loop.wav'
        }
    ];

const SFX_BUTTON_CANCEL = 0;
const SFX_BUTTON_CLICK = 1;
const SFX_BUTTON_HOVER = 2;
var SFX = [
    {
        content: [document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio')],
        index: 0,
        path: 'audio/FT_Button_Cancel.wav'
    },  
    {
        content: [document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio')],
        index: 0,
        path: 'audio/FT_Button_Click.wav'
    },
    {
        content: [document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio'),
            document.createElement('audio')],
        index: 0,
        path: 'audio/FT_Button_Hover.wav'
    },
];

function audioSetup()
{
    for(let i = 0; i < BGM.length; i++)
    {
        BGM[i].content.setAttribute('src', BGM[i].path);
        BGM[i].content.loop = true;
    }

    for(let i = 0; i < SFX.length; i++)
    {
        for(let n = 0; n < SFX[i].content.length; n++)
            SFX[i].content[n].setAttribute('src', SFX[i].path);
    }
}

function playBGM(id)
{
    if(gameOptions.BGMEnabled) {
        BGM[id].content.play();
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
    playBGM(BGM_MENU);
}
