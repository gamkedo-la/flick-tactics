
var aiTaskTimer = 0;
var aiDelayPerTask = 500;

var aiMechSelected = false;
var aiMechMove = false;

function aiUpdate(deltaTime)
{
    if(getPlayer().control == 1) {
        if(aiTaskTimer <= 0)
        {
            if(getPlayer().actionPoints > 0) {

                //Selecting unmoved Mech
                if(!aiMechSelected) {
                    if (getPlayer().getTotalNumberOfMechs() > 0) {
                        var unmovedIndex = getPlayer().setSelectedIndexToAnyUnmovedMech();
                        aiMechSelected = true;

                        if(unmovedIndex == -1) {
                            manager.endTurn();
                            aiMechSelected = false;
                        }
                    }

                //Selecting Mech's Move command
                } else if (getPlayer().getSelectedMapUnit().up != -1
                    && getPlayer().getSelectedMapUnit().up != 0) {
                    getPlayer().getSelectedMapUnit().up = 0;

                //Selecting a tile to move to
                } else {
                    map.eventAIUnitMovement(getPlayer().getSelectedMapUnit());
                    getPlayer().actionPoints--;
                    aiMechSelected = false;
                }
            } else {
                manager.endTurn();
                aiMechSelected = false;
            }

            aiTaskTimer = aiDelayPerTask;
        } else {
            aiTaskTimer -= deltaTime;
        }
    } else {
        aiTaskTimer = aiDelayPerTask;
    }
}