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

function SpriteSheet(path, frameWidth, frameHeight, rowLength) {
  this.image = new Image();
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
  this.framesPerRow = rowLength;
  
  // calculate the number of frames in a row after the image loads
 
  
 
  this.image.src = path;
  
  return this;
  
}

function animation(spritesheet, frameSpeed, startFrame, endFrame) {
 
  var animationSequence = [];  // array holding the order of the animation
  var currentFrame = 0;        // the current frame to draw
  var counter = 0;             // keep track of frame rate
 
 
  spritesheet.image.onload = function()
  {
    spritesheet.framesPerRow = Math.floor(spritesheet.image.width / spritesheet.frameWidth);
      
    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
        animationSequence.push(frameNumber);
  };
  // Update the animation
  this.update = function() {
 
    // update to the next frame if it is time
    if (counter === (frameSpeed - 1))
      currentFrame = parseInt((currentFrame + 1) % animationSequence.length);
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
  };
 
  // draw the current frame
  this.draw = function(x, y) {
    // get the row and col of the frame
    var row = parseInt(Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow));
    var col = parseInt(Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow));
 
    game_context.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
  
  return this;
}

function animationRow(spritesheet, frameSpeed, row) {
 
  var animationSequence = [];  // array holding the order of the animation
  var currentFrame = 0;        // the current frame to draw
  var counter = 0;  // keep track of frame rate
  
  
  
    //spritesheet.framesPerRow = Math.floor(spritesheet.image.width / spritesheet.frameWidth);
    
    var startFrame = parseInt(row * spritesheet.framesPerRow);
    var endFrame = parseInt(startFrame + (spritesheet.framesPerRow - 1));
 
    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
        animationSequence.push(frameNumber);
  //};
  // Update the animation
  this.update = function() {
 
    // update to the next frame if it is time
    if (counter === (frameSpeed - 1))
      currentFrame = parseInt((currentFrame + 1) % animationSequence.length);
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
  };
 
  // draw the current frame
  this.draw = function(x, y) {
    // get the row and col of the frame
    var row = parseInt(Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow));
    var col = parseInt(Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow));
 
    game_context.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
  
  return this;
}

function animationRowToFrame(spritesheet, frameSpeed, row, endFrame) {
 
  var animationSequence = [];  // array holding the order of the animation
  var currentFrame = 0;        // the current frame to draw
  var counter = 0;  // keep track of frame rate
  
  spritesheet.image.onload = function()
  {
    spritesheet.framesPerRow = Math.floor(spritesheet.image.width / spritesheet.frameWidth);
    
    var startFrame = parseInt(row * spritesheet.framesPerRow);
  
    // create the sequence of frame numbers for the animation
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
        animationSequence.push(frameNumber);
  };
  // Update the animation
  this.update = function() {
 
    // update to the next frame if it is time
    if (counter === (frameSpeed - 1))
      currentFrame = parseInt((currentFrame + 1) % animationSequence.length);
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
  };
 
  // draw the current frame
  this.draw = function(x, y) {
    // get the row and col of the frame
    var row = parseInt(Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow));
    var col = parseInt(Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow));
 
    game_context.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
  
  return this;
}
 
