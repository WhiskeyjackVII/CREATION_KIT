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



var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var FPS = 30;
var gameLoop;
var ACTOR_HANDLER;
var game_canvas;
var game_context;
var ACTOR_FACTORY;
var SPRITE_MANAGER;


var spritesLoading = 0;
var preloadedSprites = 0;

function Main(){
    
    var buttons = [];
                    
    this.setup = function(canvas){
        game_canvas = canvas;
        
        
        
        game_context = game_canvas.getContext("2d");
        ACTOR_HANDLER = new ActorHandler();
        ACTOR_FACTORY = new ActorFactory();
        SPRITE_MANAGER = new SpriteManager();
        
        CANVAS_WIDTH = game_canvas.width;
        CANVAS_HEIGHT = game_canvas.height;
        
        
    };
    
    this.init = function(){
        
        this.loadSprites();
        
        this.loadCollision();
        
        this.registerActors();
        
        this.mainMenu();
        
    };
    
    this.runGameLoop = function(){
        
        
        
        gameLoop = setInterval(function() {
            
            ACTOR_HANDLER.update();
            
            game_context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            ACTOR_HANDLER.drawActors();
       
        }, 1000/FPS);
    };
    
    this.mainMenu = function(){
        
        
        
        
        buttons[0] = new Button("images/defaults/play.png");
        buttons[0].setY(100 + (75 * buttons.length));
        buttons[0].onClick = this.loadActors;
        buttons[1] = new Button("images/defaults/play.png");
        buttons[1].setY(100 + (75 * buttons.length));
        
        
        
    };
    
    this.runMainMenu = function(){
       
            
            //game_context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            
            game_canvas.addEventListener("mousedown",mouseClicked,false);
            
            buttons.forEach(function(button){
                button.draw();
            });
               
     
    };
    
    var mouseClicked = function(event){
            
            
            buttons.forEach(function(button){
                if(button.getX() < event.pageX && button.getX() + button.getWidth() > event.pageX){
                    if(button.getY() < event.pageY && button.getY() + button.getHeight() > event.pageY){
                        button.onClick();
                    }
                }
            });
        };
        
        this.registerButton = function(button){
            buttons.push(button);
        };
    
    this.loadSprites = function(){};
    
    this.loadCollision = function(){};
    
    this.registerActors = function(){};
    
    this.loadActors = function(){};
    
    
    return this;
}