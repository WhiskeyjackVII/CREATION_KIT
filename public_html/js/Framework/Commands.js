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
        this.actorTwo.setDead();
        if(this.adCommand !== null){
            this.adCommand.setup(this.actorOne,this.actorTwo);
            this.adCommand.execute();
        }
    };

//////////////////////////////////////////////////////////////////////////////