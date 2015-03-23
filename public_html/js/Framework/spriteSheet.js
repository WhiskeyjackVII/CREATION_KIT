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

function spriteSheet(path, frameHeight, frameWidth, frameSpeed, endFrame){
   
    var image = new Image();
    var framesPerRow;
 
    // calculate the number of frames in a row after the image loads
    var self = this;
    image.onload = function() {
        framesPerRow = Math.floor(image.width / frameWidth);
    };
 
    image.src = path;
   
    var currentFrame = 0;  // the current frame to draw
    var counter = 0;       // keep track of frame rate
 
    // Update the animation
    this.update = function() {
 
    // update to the next frame if it is time
    if (counter === (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % endFrame;
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
    };
    
    // Draw the current frame
    this.draw = function(x, y) {
        // get the row and col of the frame
        var row = Math.floor(currentFrame / framesPerRow);
        var col = Math.floor(currentFrame % framesPerRow);
 
        game_context.drawImage(
            image,
            col * frameWidth, row * frameHeight,
            frameWidth, frameHeight,
            x, y,
            frameWidth, frameHeight);
  };
  
}
