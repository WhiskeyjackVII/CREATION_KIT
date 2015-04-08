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
var GAME_STATE;
var playersAlive = 0;


var spritesLoading = 0;
var preloadedSprites = 0;

function Main(){
    
    var buttons = [];
    
    var backgrounds = [];
                    
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
        
        this.setupMainMenu();
        
        this.setupHelpMenu();
        
        this.setupGameOverMenu();
    };
    
    this.runGameLoop = function(){
        
        GAME_STATE = 0;
        clearInterval(gameLoop);
        gameLoop = setInterval(function() {
            
            ACTOR_HANDLER.update();
            
            game_context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            ACTOR_HANDLER.drawActors();
            if(ACTOR_HANDLER.gameOverCondition()){
                GAME_STATE = 3;
                main.runGameOverMenu();
            }
        }, 1000/FPS);
        
    };
    
    this.setupMainMenu = function(){
        
        backgrounds[0] = new Image();
        backgrounds[0].src = "images/defaults/mainMenu.png";
        
        
        buttons[0] = new Button("images/defaults/play.png");
        buttons[0].setY(((CANVAS_HEIGHT/2) - (CANVAS_HEIGHT/3)) + (60 * buttons.length)+10);
        buttons[0].onClick = this.loadActors;
        
        buttons[1] = new Button("images/defaults/help.png");
        buttons[1].setY(((CANVAS_HEIGHT/2) - (CANVAS_HEIGHT/3)) + (60 * buttons.length)+10);
        buttons[1].onClick = this.helpMenu;
        
        
    };
    
    this.setupHelpMenu = function(){
        
        
        backgrounds[1] = new Image();
        backgrounds[1].src = "images/defaults/MENU_help.png";
        
        buttons[2] = new Button("images/defaults/back.png");
        buttons[2].setY(CANVAS_HEIGHT - 100);
        buttons[2].onClick = this.runMainMenu;
        
    };
    
    this.setupGameOverMenu = function(){

        backgrounds[3] = new Image();
        backgrounds[3].src = "images/defaults/gameOver.png";
        
        buttons[3] = new Button("images/defaults/restart.png");
        buttons[3].setY(((CANVAS_WIDTH / 2) - 150));
        buttons[3].setX(((CANVAS_WIDTH / 2) - 100) + 20);
        buttons[3].onClick = this.loadActors;
        
        buttons[4] = new Button("images/defaults/menu.png");
        buttons[4].setY(((CANVAS_WIDTH / 2) - 150));
        buttons[4].setX(((CANVAS_WIDTH / 2) - 100) + 100);
        buttons[4].onClick = this.runMainMenu;
        
    };
    
    this.runGameOverMenu = function(){
        clearInterval(gameLoop);
        game_canvas.addEventListener("mousedown",mouseClicked,false);
        
        game_context.drawImage(backgrounds[3],((CANVAS_WIDTH/2)-100),((CANVAS_HEIGHT/2)-150));
        
        game_context.fillText("Score: " + ACTOR_HANDLER.getScoreReached(),(CANVAS_WIDTH/2)-25,(CANVAS_HEIGHT/2)-75);
        
        buttons[3].draw();
        buttons[4].draw();
        
        ACTOR_HANDLER.clearActors();
    };
    
    this.runMainMenu = function(){
        GAME_STATE = 1;
        clearInterval(gameLoop);
        ACTOR_HANDLER.clearActors();
        gameLoop = setInterval(function() {   
            game_context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            
            game_context.drawImage(backgrounds[0],0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            
            game_canvas.addEventListener("mousedown",mouseClicked,false);
            
            buttons[0].draw();
            buttons[1].draw();
               
        });
    };
    
    var mouseClicked = function(event){
            
        if(GAME_STATE > 0){

            switch(GAME_STATE){
                case 1:
                    if(buttons[0].getX() < event.pageX && buttons[0].getX() + buttons[0].getWidth() > event.pageX){
                        if(buttons[0].getY() < event.pageY && buttons[0].getY() + buttons[0].getHeight() > event.pageY){
                            buttons[0].onClick();
                        }
                    }
                    if(buttons[1].getX() < event.pageX && buttons[1].getX() + buttons[1].getWidth() > event.pageX){
                        if(buttons[1].getY() < event.pageY && buttons[1].getY() + buttons[1].getHeight() > event.pageY){
                            buttons[1].onClick();
                        }
                    };
                    break;

                case 2:
                    if(buttons[2].getX() < event.pageX && buttons[2].getX() + buttons[2].getWidth() > event.pageX){
                        if(buttons[2].getY() < event.pageY && buttons[2].getY() + buttons[2].getHeight() > event.pageY){
                            buttons[2].onClick();
                        }
                    };
                    break;
                    
                case 3:
                    if(buttons[3].getX() < event.pageX && buttons[3].getX() + buttons[3].getWidth() > event.pageX){
                        if(buttons[3].getY() < event.pageY && buttons[3].getY() + buttons[3].getHeight() > event.pageY){
                            buttons[3].onClick();
                        }
                    };
                    if(buttons[4].getX() < event.pageX && buttons[4].getX() + buttons[4].getWidth() > event.pageX){
                        if(buttons[4].getY() < event.pageY && buttons[4].getY() + buttons[4].getHeight() > event.pageY){
                            buttons[4].onClick();
                        }
                    };
                    break;

                default:
                    buttons.forEach(function(button){
                        if(button.getX() < event.pageX && button.getX() + button.getWidth() > event.pageX){
                            if(button.getY() < event.pageY && button.getY() + button.getHeight() > event.pageY){
                                button.onClick();
                            }
                        }
                    });
                    break; 
                }
            }
            
        };
        
        this.registerButton = function(button){
            buttons.push(button);
        };
    
    this.loadSprites = function(){};
    
    this.loadCollision = function(){};
    
    this.registerActors = function(){};
    
    this.loadActors = function(){};
    
    this.helpMenu = function(){
        GAME_STATE = 2;
        
        clearInterval(gameLoop);
        
        gameLoop = setInterval(function() {   
            game_context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            
            game_context.drawImage(backgrounds[1],0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            
            game_canvas.addEventListener("mousedown",mouseClicked,false);
            buttons[2].draw();
            
               
        });
    };
    
    
    return this;
}