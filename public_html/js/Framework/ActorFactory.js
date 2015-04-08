/* 
 * Copyright (C) 2015 euan.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301  USA
 */


ActorFactory.constructor = ActorFactory;

function ActorFactory(){
    
    var actorLists = [];
    
    this.registerActor = function(name, score, speed, constantMovement, spritesheet, width, height){
        var temp = [name,score,speed,constantMovement,spritesheet, width, height];
        
        actorLists.push(temp);
    };
    
    this.createActor = function(name, posX, posY){
        var temp;
        actorLists.forEach(function(actor){
            if(name === actor[0]){
                temp = new Actor(name, posX, posY, actor[1], actor[2],actor[3], actor[4], actor[5], actor[6]);
        
                
            }
        });
        return temp;
    };
    
    this.createActorRandom = function(name){
        var temp;
        actorLists.forEach(function(actor){
            if(name === actor[0]){
                temp = new Actor(name, getRandomPosX(), getRandomPosY(), actor[1], actor[2],actor[3], actor[4], actor[5], actor[6]);
            
                
            }
        });
        return temp;
    };
    
    var getRandomPosX = function(){
        return Math.floor(Math.random() * (CANVAS_WIDTH-100));
    };
    
    var getRandomPosY = function(){
        return Math.floor(Math.random() * (CANVAS_HEIGHT-100));
    };
    
};

