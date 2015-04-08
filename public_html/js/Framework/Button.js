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

function Button(image){
    
    this.image = new Image();
    var x;
    var y;
    var width;
    var height;
    this.image.src = image;
    
    this.image.onload = function(){
        setWidth(this.width);
        setHeight(this.height);
        setX((CANVAS_WIDTH/2) - (width/2));
    };
    
    this.setY = function(newY){
        y = newY;
    };
    var setX = function(newX){
        x = newX;
    };
    
    this.getX = function(){
        return x;
    };
    this.getY = function(){
        return y;
    };
    
    var setWidth = function(newWidth){
        width = newWidth;
    };
    var setHeight = function(newHeight){
        height = newHeight;
    };
    
    this.getWidth = function(){
        return width;
    };
    this.getHeight = function(){
        return height;
    };
    
    this.onClick = function(){};
    
    this.draw = function(){
        game_context.drawImage(this.image,x,y);
    };
    
    return this.Button;
    
}
