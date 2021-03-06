// @author betts.euan@yahoo.com
Actor.constructor = Actor;
function Actor(name, posX, posY, score, speed, constantMovement, animations, width, height){
	
    console.log("MAKING ACTOR : " + Date.now());
        
    //PRIVALLEGED VARIABLES
    
    this.score = score;
    this.GUID = guid();
    this.constantMovement = constantMovement;
        
    //PRIVATE VARIABLES
    var alive = true;
    var dx = 1;
    var dy = 1;
    var width = width;
    var height = height;
    var posX = posX;
    var posY = posY;
    var speed = speed;
    var name = name;
    var animations = animations;
    
 
    
    //IDENTIFYING METHOD
    
    this.getGUID = function(){
        return this.GUID;
    };
    this.getName = function(){
        return name;
    };
    
    //MOVEMENT_METHODS
    this.setConstantMovement = function(move){
        constantMovement = move;
    };
    this.setDx = function(newDx){
        dx = Number(newDx);
    };
    this.setDy = function(newDy){
        dy = Number(newDy);
    };
    this.getDx = function(){
        return dx;
    };
    this.getDy = function(){
        return dx;
    };
    this.stop = function(){
        dx = 0;
        dy = 0;
    };
    
    this.moveUp = function(){
        dy = -1;
    };
    this.moveDown = function(){
        dy = 1;
    };
    this.moveLeft = function(){
        dx = -1;
    };
    this.moveRight = function(){
        dx = 1;
    };
    
    //SCORE METHODS
    
    this.getScore = function(){
        return this.score;
    };
    this.setScore = function(score){
        this.score = score;
    };
    this.addScore = function(score){
        this.score = Number(this.score) + Number(score);
    };
        
    //LIFE BASED METHODS
        
    this.setDead = function(){
        alive = false;
    };
    this.checkAlive = function(){
	return alive;
    };   
        
    //POSITION METHODS
        
    this.getPosX = function(){
        return posX;
    };
    this.getPosY = function(){
        return posY;
    };
        
    //SIZE METHODS
        
    this.getWidth = function(){
        return width;
    };
    this.getHeight = function(){
        return height;
    };
        
    //RUNNING METHODS   
        
    this.drawActor = function(){
        if(alive === true){
            //game_context.drawImage(imageObj, posX, posY);
            
            if(dx === 0 || speed === 0){
                if(dy === 0 || speed === 0){
                    animations[0].update();
                    animations[0].draw(this.getPosX(),this.getPosY());
                    }else{
                        if( dy < 0){
                            animations[0].update();
                            animations[0].draw(this.getPosX(),this.getPosY());
                        }else{
                            animations[3].update();
                            animations[3].draw(this.getPosX(),this.getPosY());
                        }
                    }
            }else{
                if(dx < 0){
                    if(dy === 0){
                        animations[2].update();
                        animations[2].draw(this.getPosX(),this.getPosY());
                    }else{
                        if( dy < 0){
                            animations[0].update();
                            animations[0].draw(this.getPosX(),this.getPosY());
                        }else{
                            animations[3].update();
                            animations[3].draw(this.getPosX(),this.getPosY());
                        }
                    }
                }else{
                    if(dy === 0){
                        animations[1].update();
                        animations[1].draw(this.getPosX(),this.getPosY());
                    }else{
                        if( dy < 0){
                            animations[0].update();
                            animations[0].draw(this.getPosX(),this.getPosY());
                        }else{
                            animations[3].update();
                            animations[3].draw(this.getPosX(),this.getPosY());
                        }
                    }
                }
            }
            
            if(constantMovement !== true){
                dx = 0;
                dy = 0;
            }
        }
    };

    this.update = function(){
	
        bounds();
        
        posX = Number(posX) + Number(dx*speed);
	posY = Number(posY) + Number(dy*speed);
        
        
        
        
        
    };
	
    var bounds = function(){
	if(Number(posX)+Number(width) >= Number(CANVAS_WIDTH)){
            dx = dx * -1;
	}
	if(Number(posY)+Number(height) >= Number(CANVAS_HEIGHT)){
            dy = dy * -1;
	}
	if(Number(posX) <= 0){
            dx = dx * -1;
	}
        if(Number(posY) <= 0){
            dy = dy * -1;
	}
                
    };
        
    console.log("ACTOR MADE : "+ Date.now());
    return this.Actor;
}

