function Actor(posX, posY, width, height, speed, image, name){
	
	console.log("MAKING ACTOR");
	var width = width;
	var height = height;
	var posX = posX;
	var posY = posY;
	var speed = speed;
	var name = name;
        
	var alive = true;
	var dx = 1;
	var dy = 1;
	
	var imageObj = new Image();
        
        

    imageObj.onload = function() {
      
    };
    imageObj.src = image;
    
        this.getName = function(){
            return name;
        };
        this.setDead = function(){
            alive = false;
        };
        this.getPosX = function(){
            return posX;
        };
        this.getPosY = function(){
            return posY;
        };
        this.getWidth = function(){
            return width;
        };
        this.getHeight = function(){
            return height;
        };
	
	this.drawActor = function(){
            if(alive === true){
                game_context.drawImage(imageObj, posX, posY);
            }
	};
	
	this.checkAlive = function(){
		return alive;
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
        
        console.log("ACTOR MADE");
        return this.Actor;
}