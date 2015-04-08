// @author betts.euan@yahoo.com

function ActorHandler(){
    console.log("MAKING ACTOR_HANDLER : "+ Date.now());
    
    //PRIVATE VARIABLES
    
    var actors = [];
    var players = [];
    var collisionPairs = [];
    var keySets = [];
    var scoreReached;

    
    //DEFAULT KEYSETS
    
    var keyCommands = [];
    
    keyCommands[37] = new LeftCommand(null);
    keyCommands[65] = new LeftCommand(null);
    keyCommands[73] = new LeftCommand(null);
    keyCommands[100] = new LeftCommand(null);
    
    keyCommands[38] = new UpCommand(null);
    keyCommands[87] = new UpCommand(null);
    keyCommands[74] = new UpCommand(null);
    keyCommands[104] = new UpCommand(null);
    
    keyCommands[39] = new RightCommand(null);
    keyCommands[68] = new RightCommand(null);
    keyCommands[76] = new RightCommand(null);
    keyCommands[102] = new RightCommand(null);
    
    keyCommands[40] = new DownCommand(null);
    keyCommands[83] = new DownCommand(null);
    keyCommands[75] = new DownCommand(null);
    keyCommands[98] = new DownCommand(null);
    
    keySets[0] = [keyCommands[37],keyCommands[38],keyCommands[39],keyCommands[40]];
    keySets[1] = [keyCommands[65],keyCommands[87],keyCommands[68],keyCommands[83]];
    keySets[2] = [keyCommands[73],keyCommands[74],keyCommands[76],keyCommands[75]];
    keySets[3] = [keyCommands[100],keyCommands[104],keyCommands[102],keyCommands[98]];
    
    var Key = {
        _pressed: {},

        
        isDown: function(keyCode) {
            return this._pressed[keyCode];
        },
  
        onKeydown: function(event) {
            this._pressed[event.keyCode] = true;
        },
  
        onKeyup: function(event) {
            delete this._pressed[event.keyCode];
        }
    };
    
    window.addEventListener('keyup',function(event){ Key.onKeyup(event);}, false);
    window.addEventListener('keydown',function(event){ Key.onKeydown(event);}, false);
    
    this.setKeyCommand = function(index, command){
        keyCommands[index] = command;
    };
    
    //ACTOR MANAGMENT METHODS
    
    
    this.getScoreReached = function(){
        return scoreReached;
    };
    
    this.registerActor = function(actor){
        console.log("REGISTING ACTOR : "+ Date.now());
        actors.push(actor);
        console.log("ACTOR REGISTERED : "+ Date.now());


    };
    this.registerPlayer = function(player,playerNumber){
        console.log("REGISTERING_PLAYER : " + Date.now());
        playersAlive++;
        actors.push(player);
        players.push(player);
        
        keySets[playerNumber-1].forEach(function(keySet){
            keySet.setup(player);
            
        });
        
        console.log("PLAYER REGISTERED : " + Date.now());
    };
    var deleteActor = function(actor){
        if(actor.getName() === "PLAYER"){
            scoreReached = actor.getScore();
            playersAlive--;
        }
        var index = actors.indexOf(actor);
        if (index > -1) {
            actors.splice(index, 1);
        }  
    };
    
    this.clearActors = function(){
        actors = [];
    };

    //COLLISION HANDLING METHODS

    var handleCollisionPairs = function(actorOne){
        collisionPairs.forEach(function(pair){
        

            if(actorOne.getName() === pair[0]){
                actors.forEach(function(actorTwo){

                    if (actorTwo.getName() === pair[1] && 
                            actorTwo.checkAlive() === true && 
                            actorOne.getGUID()!== actorTwo.getGUID()){
                        
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
        if(actorOne.getPosX() < actorTwo.getPosX() + actorTwo.getWidth() &&
            actorOne.getPosX() + actorOne.getWidth() > actorTwo.getPosX() &&
            actorOne.getPosY() < actorTwo.getPosY() + actorTwo.getHeight() &&
            actorOne.getHeight() + actorOne.getPosY() > actorTwo.getPosY()) {
               return true;
        }
        return false;
    };
    

    
    
    //RUNNING METHODS
    
    this.gameOverCondition = function(){
        var result = false;
        if(playersAlive <= 0){
            result = true;
        }
        
        return result;
    };
    
    this.drawActors = function(){

        actors.forEach(function(actor){

                actor.drawActor();
        });

    };
    this.update = function(){
        
        for(var i = 8; i < 123; i++){
            if(Key.isDown(i))
                keyCommands[i].execute();
        }
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





