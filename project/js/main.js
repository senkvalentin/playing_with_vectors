


'use strict';
document.title = "vector.js";
let canvas = document.getElementById('myCanvas');
let output = document.getElementById('output');
let outputError = document.getElementById('outputError');
let btnGo = document.getElementById('btnGo');
let inputStrVector = document.getElementById('inputStrVector');
let ctx = canvas.getContext("2d");
let counter = 0;
let offsetCoordinateSystem = canvas.clientWidth*0.01; 
let arrVectors = [];

btnGo.onclick = function () {
    if (!validateInput(inputStrVector.value)) {
        outputError.innerHTML = `${inputStrVector.value} could not be converted to X- and Y-Coordinates!<br>` + output.innerHTML;
    } else {
        counter++;
        output.innerHTML = `${counter} Input: ${inputStrVector.value} <br>` + output.innerHTML;
        let createdVector = new Vector(ctx, canvas.clientWidth, canvas.clientHeight, offsetCoordinateSystem, translateXY(canvas.clientWidth, canvas.clientHeight,offsetCoordinateSystem,convertStrToCoordinates(inputStrVector.value)));
        createdVector.drawVector();
        arrVectors.push(createdVector);
        console.log(arrVectors);
    }
}

inputStrVector.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btnGo").click();
    }
  });

function convertStrToCoordinates (str) { //parameter = inputfield (id: inputStrVector)
    //returns an array with [0] being x and [1] being y
    str = str.split(',');
    // str.forEach(element => {//convert array of strings to array of numbers
    //     element = Number(element);
    // });
    str = [Number(str[0]),Number(str[1])];
    return str;
}

function validateInput (inputStr) {
    //finish logic later;)
    return true;
}

function drawCoordinateSystem (ctx, canvasW, canvasH, offsetGraph) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(offsetGraph, canvasH-offsetGraph);
    ctx.lineTo(canvasW-offsetGraph, canvasH-offsetGraph);
    ctx.moveTo(offsetGraph, canvasH-offsetGraph);
    ctx.lineTo(offsetGraph, offsetGraph);
    ctx.stroke();
}

function translateXY (canvasW, canvasH, offsetGraph, arrXYCoordinates) {   //in this coordinate-system x = 0 and y = 0 should be in the left bottom corner
    console.log(arrXYCoordinates);
    arrXYCoordinates[0] = arrXYCoordinates[0]+offsetGraph;
    arrXYCoordinates[1] = canvasH-offsetGraph-arrXYCoordinates[1];
    console.log(arrXYCoordinates);
    return arrXYCoordinates;
}

class Vector {
  ctx;
  canvasWidth;
  canvasHeight;
  offsetGraph;
  x;
  y;

  constructor (ctx, canvasWidth, canvasHeight, offsetGraph, arrCoordinates) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.offsetGraph = offsetGraph;
    this.x = arrCoordinates[0];
    this.y = arrCoordinates[1];
  }

  drawVector () {
    ctx.moveTo(this.offsetGraph, this.canvasHeight-this.offsetGraph);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

//main
drawCoordinateSystem(ctx, canvas.clientWidth, canvas.clientHeight, offsetCoordinateSystem);