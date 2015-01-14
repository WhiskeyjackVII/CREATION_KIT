
var imported = document.createElement('Actor');
imported.src = 'Actor.js';
document.head.appendChild(imported);

	function ActorHandler(){
            console.log("MAKING ACTOR_HANDLER");    
            var actors = [];
            
            
            this.registerActor = function(actor){
                console.log("REGISTING ACTOR");
		actors.push(actor);
                console.log("ACTOR REGISTERED");
                
                
            };

            this.drawActors = function(){
                
		//game_context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	
		actors.forEach(function(actor){
                    
			actor.drawActor();
		});
                
            };

            this.update = function(){
		actors.forEach(function(actorOne){
                    if(actorOne.checkAlive() === false){
                        var index = actors.indexOf(actorOne);
                        if (index > -1) {
                           actors.splice(index, 1);
                        }
                    }else{
                        actorOne.update();
                        if(actorOne.getName() === "act1"){
                            actors.forEach(function(actorTwo){
                                if(actorTwo.getName() === "act2" && actorTwo.checkAlive() === true){
                                    if(detectCollision(actorOne,actorTwo) === true){
                                       actorTwo.setDead();
                                   }
                                } 
                            });
                        }
                    }
		});
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
        
        
        

	
