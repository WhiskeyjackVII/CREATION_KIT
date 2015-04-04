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


function SpriteManager(){
    var sprites = [];
    /*
     * @params type - 0 = moving animated object
     *                1 = static object no animations
     * 
     */
    this.registerSpriteSheet = function(name,spriteSheet,width,height,rowLength,type){
        spritesLoading++;
        var animations = [];
        var sheet = new SpriteSheet(spriteSheet,width,height,rowLength);
//        while(images > preloadedImages){
//            
//                sheet.framesPerRow = Math.floor(sheet.image.width / sheet.frameWidth);
//                preloadedImages++;
//            };
//        }

        //sheet.image.onload = function() {
            switch(type){
            
                case 0: animations.push(new animationRow(sheet, 5, 0));
                    animations.push(new animationRow(sheet, 5, 1));
                    animations.push(new animationRow(sheet, 5, 2));
                    animations.push(new animationRow(sheet, 5, 3));
                    break;
        
                case 1: animations.push(new animationRow(sheet, 5, 0));
                    break;
                
                default: animations.push(new animationRow(sheet, 5, 0));
                    break;
        
            }   
        
            var temp = [name, sheet, animations];
            sprites.push(temp);
            preloadedSprites++;
       // };
    };
    
    this.getAnimationsFor = function(name){
        var temp;
        sprites.forEach(function(sprite){
            if(sprite[0] === name){
                temp = sprite[2];
                
            }
        });
        return temp;
    };
    
    return this.SprtieManager;
}

