// @author betts.euan@yahoo.com

function ActorHandler(){
    console.log("MAKING ACTOR_HANDLER : "+ Date.now());
    
    //PRIVATE VARIABLES
    
    var actors = [];
    var players = [];
    var collisionPairs = [];
    var keySets = [];
    
    //DEFAULT KEYSETS
    
    keySets[0] = [["37",new LeftCommand(null)],["38",new UpCommand(null)],["39",new RightCommand(null)],["40",new DownCommand(null)]];
    keySets[1] = [["65",new LeftCommand(null)],["87",new UpCommand(null)],["68",new RightCommand(null)],["83",new DownCommand(null)]];
    keySets[2] = [["73",new LeftCommand(null)],["74",new UpCommand(null)],["75",new RightCommand(null)],["76",new DownCommand(null)]];
    keySets[3] = [["100",new LeftCommand(null)],["104",new UpCommand(null)],["102",new RightCommand(null)],["98",new DownCommand(null)]];
    
    //ACTOR MANAGMENT METHODS

    this.registerActor = function(actor){
        console.log("REGISTING ACTOR : "+ Date.now());
        actors.push(actor);
        console.log("ACTOR REGISTERED : "+ Date.now());


    };
    this.registerPlayer = function(player,playerNumber){
        console.log("REGISTERING_PLAYER : " + Date.now());
        
        actors.push(player);
        players.push(player);
        
        keySets[playerNumber-1].forEach(function(keySet){
            keySet[1].setup(player);
            
        });
        
        console.log("PLAYER REGISTERED : " + Date.now());
    };
    var deleteActor = function(actor){
        var index = actors.indexOf(actor);
        if (index > -1) {
            actors.splice(index, 1);
        }  
    };

    //COLLISION HANDLING METHODS

    var handleCollisionPairs = function(actorOne){
        collisionPairs.forEach(function(pair){


            if(actorOne.getName() === pair[0]){
                    actors.forEach(function(actorTwo){

                        if(actorTwo.getName() === pair[1] && actorTwo.checkAlive() === true && actorOne.getGUID()!== actorTwo.getGUID()){
                            if(detectCollision(actorOne,actorTwo) === true){
                               console.log("HANDLING COLLISION : "+ Date.now());
                               pair[2].setup(actorOne,actorTwo);
                               pair[2].execute();
                               console.log("COLLISION HANDLED : "+ Date.now());
                           }
                        }

                    });
            }
        });
    };
    this.registerCollisionCheck = function(actorOne, actorTwo, command){
        var temp = [actorOne, actorTwo, command];
        collisionPairs.push(temp);

    };
    var detectCollision = function(actorOne, actorTwo){
        if (actorOne.getPosX() < actorTwo.getPosX() + actorTwo.getWidth() &&
            actorOne.getPosX() + actorOne.getWidth() > actorTwo.getPosX() &&
            actorOne.getPosY() < actorTwo.getPosY() + actorTwo.getHeight() &&
            actorOne.getHeight() + actorOne.getPosY() > actorTwo.getPosY()) {
               return true;
        }
        return false;
    };
    
    
    //RUNNING METHODS
    
    this.drawActors = function(){

        actors.forEach(function(actor){

                actor.drawActor();
        });

    };
    this.update = function(){
        actors.forEach(function(actor){
            if(actor.checkAlive() === false){
                deleteActor(actor);

            }else{
                actor.update();
                handleCollisionPairs(actor);


            }
        });
    };

    console.log("ACTOR_HANDLER MADE : "+ Date.now());
    return this.ActionHandler;
    }





