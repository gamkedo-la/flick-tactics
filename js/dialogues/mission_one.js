
/*
speaker => GURU, ZAREEM, TAHA, HULU, JONAH
face => FACE_NEUTRAL, FACE_HAPPY, FACE_SAD, FACE_UPSET, FACE_ANGRY, FACE_SHOCK
-- events will be added soon --
*/

const mission_one = [
    {
        speaker: GURU,
        text: "Welcome to Flick Tactics Zareem!  Here, we'll train you to be the most powerful strategest the world has ever created!",
        face: FACE_HAPPY
        //event: ??? (coming soon)
    },
    {
        speaker: ZAREEM,
        text: "Uh... Hello sir!",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "It's GURU SIR!",
        face: FACE_UPSET
    },
    {
        speaker: ZAREEM,
        text: "YES! GURU SIR!",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "That's right young'n. When I was your age, I'd already fought a bear with my bear hands and it couldn't bear it at all!",
        face: FACE_HAPPY
    },
    {
        speaker: ZAREEM,
        text: "(Rolls Eyes) Right... sir....?",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "That's GURU SIR!",
        face: FACE_UPSET
    },
    {
        speaker: ZAREEM,
        text: "YES! GURU SIR!",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "Let's learn Movement, click a unit and select \"Move\" then select a square to move to!",
        face: FACE_NEUTRAL
    },
    {
        speaker: ZAREEM,
        text: "On it's GURU SIR!",
        face: FACE_NEUTRAL

        //event: centered on unit, player needs to move the unit to another position. Text should still display Guru's instructions so player knows what to do.
    },
    {
        speaker: GURU,
        text: "Good job, now select where you want to move to",
        face: FACE_NEUTRAL
    },
    {
        speaker: ZAREEM,
        text: "Here?",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "That's a good spot!",
        face: FACE_HAPPY
    },
    {
        speaker: ZAREEM,
        text: "Err.... thank you sir... I guess?",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "Nonsense - I said it's good, so it's good, Got it!?",
        face: FACE_UPSET    
    },
    {
        speaker: ZAREEM,
        text: "?? Whispers, This old geezer....",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "What did you say!",
        face: FACE_UPSET    
    },
    {
        speaker: ZAREEM,
        text: "Nothing, nothing.  Are you going to teach me anything?",
        face: FACE_NEUTRAL
    },
        //Event, Terrain Tutorial Begins
    {
        speaker: GURU,
        text: "This kid...., Look at where you placed the units",
        face: FACE_NEUTRAL   
    },
    {
        speaker: ZAREEM,
        text: "Where?",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        //units now on a mountain
        text: "They're on a Mountain! Look!",
        face: FACE_SHOCK   
    },
    {
        speaker: ZAREEM,
        text: "Oh... oh oh, yea, so what?",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "Select them",
        face: FACE_NEUTRAL  
    },
    {
        speaker: ZAREEM,
        text: "Okayyyyy",
        face: FACE_NEUTRAL
    },
    {
        speaker: GURU,
        text: "Look at their defense now",
        face: FACE_NEUTRAL  
    },
    {
        speaker: ZAREEM,
        text: "Oh it's higher!",
        face: FACE_SHOCK
    },
    {
        speaker: GURU,
        text: "Exactly!  Units on mountains get more defense points.  Remember that!",
        face: FACE_HAPPY 
    },
    {
        speaker: ZAREEM,
        text: "YES! GURU SIR!",
        face: FACE_HAPPY
    },
];