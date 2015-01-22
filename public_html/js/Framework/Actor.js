// @author betts.euan@yahoo.com
Actor.constructor = Actor;
function Actor(posX, posY, score, speed, image, name){
	
    console.log("MAKING ACTOR : " + Date.now());
        
    //PRIVALLEGED VARIABLES
    this.score = score;
    this.GUID = guid();
        
    //PRIVATE VARIABLES
    var alive = true;
    var dx = 1;
    var dy = 1;
    var width;
    var height;
    var posX = posX;
    var posY = posY;
    var speed = speed;
    var name = name;
    
    //IMAGE METHODS
    
    var imageObj = new Image();
    imageObj.onload = function() {
           width = this.width;
           height = this.height;
    };
    imageObj.src = image;
    
    //IDENTIFYING METHOD
    
    this.getGUID = function(){
        return this.GUID;
    };
    this.getName = function(){
        return name;
    };
    
    //DX_DY_METHODS
    
    this.setDx = function(dx){
        this.dx = dx;
    };
    this.setDy = function(dy){
        this.dy = dy;
    };
    this.getDx = function(){
        return this.dx;
    };
    this.getDy = function(){
        return this.dx;
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
            game_context.drawImage(imageObj, posX, posY);
        }
    };

    this.update = function(){
	posX = Number(posX) + Number(dx*speed);
	posY = Number(posY) + Number(dy*speed);
	bounds();
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

