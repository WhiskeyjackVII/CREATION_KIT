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

/////////////////SUPER_COMMAND//////////////////////////////////////////////

I_Command.constructor = I_Command;
function I_Command(adCommand){
    
    this.adCommand = adCommand;
    return this.I_Command;
}

I_Command.prototype.setup = function(){};
I_Command.prototype.execute = function(){};

//////////////////SUPER_COLLISION_COMMAND/////////////////////////////////////

I_CollisionCommand.prototype = new I_Command(null);
I_CollisionCommand.constructor = I_CollisionCommand;
function I_CollisionCommand(adCommand){
    this.adCommand = adCommand;
    var actorOne;
    var actorTwo;
    
    return this.I_CollisionCommand;
}

I_CollisionCommand.prototype.setup = function(actorOne,actorTwo){
        this.actorOne = actorOne;
        this.actorTwo = actorTwo;
    };

////////////////////A_COLLISION_BASED_COMMAND//////////////////////////////////   

KillCommand.prototype = new I_CollisionCommand(null);
KillCommand.constructor = KillCommand;
function KillCommand(adCommand){
    var actorOne;
    var actorTwo;
    
    this.adCommand = adCommand;
    
    
    
    return this.KillCommand;
}

KillCommand.prototype.execute = function(){
    console.log("HANDLING_KILL_COMMAND : "+ Date.now());
        this.actorTwo.setDead();
        if(this.adCommand !== null){
            console.log("HANDLING_ADDITIONAL_COMMAND : "+ Date.now());
            this.adCommand.setup(this.actorOne,this.actorTwo);
            this.adCommand.execute();
            console.log("ADDITIONAL_COMMAND_HANDLED : "+ Date.now());
        }
    console.log("KILL_COMMAND_HANDLED : "+ Date.now());
    };

//////////////A_COLLISION_BASED_COMMAND////////////////////////////////////////

ScoreCommand.prototype = new I_CollisionCommand(null);
ScoreCommand.constructor = ScoreCommand;
function ScoreCommand(adCommand){
    var actorOne;
    var actorTwo;
    
    this.adCommand = adCommand;
    
    return this.ScoreCommand;
}

ScoreCommand.prototype.execute = function(){
    console.log("HANDLING_SCORE_COMMAND : "+ Date.now());
    this.actorOne.addScore(this.actorTwo.getScore());
    if(this.adCommand !== null){
            console.log("HANDLING_ADDITIONAL_COMMAND : "+ Date.now());
            this.adCommand.setup(this.actorOne,this.actorTwo);
            this.adCommand.execute();
            console.log("ADDITIONAL_COMMAND_HANDLED : "+ Date.now());
        }
    console.log("SCORE_COMMAND_HANDLED : "+ Date.now());
    
};

////////A_COLLISION_BASED_COMMAND///////////////////////////////////////////

BounceOneActor.prototype = new I_CollisionCommand(null);
BounceOneActor.constructor = BounceOneActor;
function BounceOneActor(adCommand){
    var actorOne;
    var actorTwo;
    
    this.adCommand = adCommand;
    
    return this.BounceOneActor;
}

BounceOneActor.prototype.execute = function(){
    console.log("HANDLING_BOUNCE_ONE");
    this.actorOne.setDx(this.actorOne.getDx * -1);
    this.actorOne.setDy(this.actorOne.getDy * -1);
    console.log("BOUNCE_ONE_HANDLED");
};

////////A_COLLISION_BASED_COMMAND///////////////////////////////////////////

BounceTwoActors.prototype = new I_CollisionCommand(null);
BounceTwoActors.constructor = BounceTwoActors;
function BounceTwoActors(adCommand){
    var actorOne;
    var actorTwo;
    
    this.adCommand = adCommand;
    
    return this.BounceTwoActor;
}

BounceTwoActors.prototype.execute = function(){
    console.log("HANDLING_BOUNCE_TWO");
    this.actorOne.setDx(this.actorOne.getDx * -1);
    this.actorOne.setDy(this.actorOne.getDy * -1);
    
    this.actorTwo.setDx(this.actorTwo.getDx * -1);
    this.actorTwo.setDy(this.actorTwo.getDy * -1);
    console.log("BOUNCE_TWO_HANDLED");
};

//////////BASE_MOVEMENT_COMMAND///////////////////////////////////////////////

MoveCommand.prototype = new I_Command;
MoveCommand.constructor = MoveCommand;
function MoveCommand(adCommand){
    var actor;
    
    this.adCommand = adCommand;
}

MoveCommand.prototype.setup = function(actor){
    this.actor = actor;
};

/////////UP_COMMAND///////////////////////////////////////////////////////////

UpCommand.prototype = new MoveCommand;
UpCommand.constructor = UpCommand;
function UpCommand(adCommand){
    var actor;
    this.adCommand = adCommand;
}

UpCommand.prototype.execute = function(){
    this.actor.setDy(-1);
};

/////////DOWN_COMMAND///////////////////////////////////////////////////////////

DownCommand.prototype = new MoveCommand;
DownCommand.constructor = DownCommand;
function DownCommand(adCommand){
    var actor;
    this.adCommand = adCommand;
}

DownCommand.prototype.execute = function(){
    this.actor.setDy(1);
};

////////LEFT_COMMAND//////////////////////////////////////////////////////////

LeftCommand.prototype = new MoveCommand;
LeftCommand.constructor = LeftCommand;
function LeftCommand(adCommand){
    var actor;
    this.adCommand = adCommand;
}

LeftCommand.prototype.execute = function(){
    this.actor.setDx(-1);
};

////////RIGHT_COMMAND//////////////////////////////////////////////////////////

RightCommand.prototype = new MoveCommand;
RightCommand.constructor = RightCommand;
function RightCommand(adCommand){
    var actor;
    this.adCommand = adCommand;
}

RightCommand.prototype.execute = function(){
    this.actor.setDx(1);
};


