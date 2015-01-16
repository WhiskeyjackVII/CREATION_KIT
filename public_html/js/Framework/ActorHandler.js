// @author betts.euan@yahoo.com

function ActorHandler(){
    console.log("MAKING ACTOR_HANDLER");    
    var actors = [];
    var collisionPairs = [];

    

    this.registerActor = function(actor){
        console.log("REGISTING ACTOR");
        actors.push(actor);
        console.log("ACTOR REGISTERED");


    };

    this.drawActors = function(){

        actors.forEach(function(actor){

                actor.drawActor();
        });

    };

    var deleteActor = function(actor){
        var index = actors.indexOf(actor);
        if (index > -1) {
            actors.splice(index, 1);
        }  
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

    var handleCollisionPairs = function(actorOne){
        collisionPairs.forEach(function(pair){


            if(actorOne.getName() === pair[0]){
                    actors.forEach(function(actorTwo){

                        if(actorTwo.getName() === pair[1] && actorTwo.checkAlive() === true){
                            if(detectCollision(actorOne,actorTwo) === true){
                               pair[2].setup(actorOne,actorTwo);
                               pair[2].execute();
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

    console.log("ACTOR_HANDLER MADE");
    return this.ActionHandler;
    }





