const p5 = require('node-p5');
const Canvas = require("canvas");
const Discord = require("discord.js");
// const p5 = require("p5");
const fs = require("fs");
//---------------------------------
let fnn;
async function sketch(p) {
    let grid;
    let cols, rows;
    let path = [];
    let spot;
    let width=1000;
    let height=1000;
    let options;
        class Step {
            constructor(x,y) {
            this.x=x;
            this.y=y;
            this.tried = false;
            }  
        }

        class Spot {
            constructor(i, j) {
            this.i = i;
            this.j = j;
            this.x = i * 200;
            this.y = j * 200;
            this.visited = false;
            }
            
            clear() {
            this.visited = false;
            }
        
            nextSpot() {
            let validOptions = [];
            for (let opt of options) {
                let newX = this.i + opt.x;
                let newY = this.j + opt.y;
                let booll=false;
                if (newX< 0 || newX >= cols || newY < 0 || newY >= rows) {
                    booll=false;
                }
                else{
                     booll=!grid[newX][newY].visited;
                }
                if (booll && !opt.tried) {
                    validOptions.push(opt);
                }
            }
        
            if (validOptions.length > 0) {
                let step = validOptions[Math.floor(Math.random()*validOptions.length)];
                step.tried = true;
                return grid[this.i+step.x][this.j+step.y];
            }
            }
        }
    p.setup = () => {
        options=[
            new Step( 1,  0),
            new Step(-1,  0),
            new Step( 0,  1),
            new Step( 0, -1),
            new Step( 1,  1),
            new Step( -1, -1),
            new Step( 1,  -1),
            new Step( -1, 1),
          ];

          let canvas = p.createCanvas(1000, 1000);
          cols = Math.floor(width / 200);
          rows = Math.floor(height / 200);
          p.background(0);
          let arr = new Array(cols);
          for (var k = 0; k < arr.length; k++) {
            arr[k] = new Array(rows);
          }
          grid=arr;


        for (let ii = 0; ii < cols; ii++) {
          for (let jj = 0; jj < rows;jj++) {
            grid[ii][jj] = new Spot(ii, jj);
          }
        }
        let i = Math.floor(Math.random()*cols);
        let j = Math.floor(Math.random()*rows);
        spot = grid[i][j];

        path.push(spot);
        spot.visited = true;
        for (let i = 0; i < 10000000; i++) {
            if (!spot){
               // console.log('nospot');
            }else{
            spot = spot.nextSpot();
            if (!spot) {
              path[path.length - 1].clear;
              if (path.length>1){
              spot=path[path.length-2];
              }
            } else {
              path.push(spot);
              spot.visited = true;
            }
            if (path.length === cols * rows) {
                break;
            }
            }
          }
          p.translate(200 * 0.5, 200 * 0.5);
          p.strokeWeight(200 * 0.25);
          p.noFill();
          p.beginShape();
          console.log(path[0]);
          p.curveVertex(path[0].x,path[0].y);

          p.stroke(255);
          
          for (let ip = 0; ip < path.length; ip++) {
            let spott = path[ip];
            p.curveVertex(spott.x, spott.y);
          }
          p.curveVertex(path[path.length-1].x,path[path.length-1].y);
          p.endShape();
        setTimeout(() => {
            p.saveCanvas(canvas, 'myCanvas', 'png').then(filename => {
                console.log('saved');
            });
        }, 100);
    }
}




module.exports = async function (msg, args) {
  const buffer = await generateImage();
  const attachment = new Discord.MessageAttachment(buffer, "glyphoftheday.png");
  await msg.channel.send(attachment);
};

async function generateImage() {
    let p5Instance = await p5.createSketch(sketch);
    const canvas = Canvas.createCanvas(1000, 1000);
	const background = await Canvas.loadImage('./myCanvas.png');

    const context = canvas.getContext('2d');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const buffer = canvas.toBuffer("image/png");
  return buffer;
}

//
