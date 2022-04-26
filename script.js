let cnv = document.getElementById('my_canvas');
let ctx = cnv.getContext('2d');

cnv.width = window.innerWidth - 25;
cnv.height = window.innerHeight - 25;

let dots = [];

let mainDot = {
   x: 10,
   y: 10,
   directionX: 1,
   directionY: 1,
   color: 'black',
   greenCount: 0,
   draw: function () {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      ctx.fill();

      if (this.x >= cnv.width) {
         this.directionX = -1;
         this.changingXDirection = true;
      } else if (this.x <= 0) {
         this.directionX = 1;
         this.changingXDirection = true;
      }

      if (this.y >= cnv.height) {
         this.directionY = -1;
         this.changingYDirection = true;
      } else if (this.y <= 0) {
         this.directionY = 1;
         this.changingYDirection = true;
      }

      if (this.changingXDirection && this.changingYDirection) {
         this.color = 'green';
         this.greenCount++;
      } else if (this.color != 'green') {
         this.changingXDirection = false;
         this.changingYDirection = false;
      }

      if (this.greenCount >= 50) {
         this.color = 'black';
         this.changingXDirection = false;
         this.changingYDirection = false;
         this.greenCount = 0;
      }

      this.x += this.directionX * 2;
      this.y += this.directionY * 2;
   },
};
dots.push(mainDot);

class orbiter {
   constructor(centralDot, distance, color, size) {
      this.centralDot = centralDot;
      this.distance = distance;
      this.degreesNum = distance * 1.5;
      this.color = color;
      this.size = size;
      this.angle = 0;
      dots.push(this);
   }

   draw() {
      this.x =
         this.centralDot.x +
         this.distance * Math.cos((this.angle * Math.PI) / this.degreesNum);
      this.y =
         this.centralDot.y +
         this.distance * Math.sin((this.angle * Math.PI) / this.degreesNum);

      this.angle++;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size || 5, 0, 2 * Math.PI);
      ctx.fill();
   }
}

outsideDot1 = new orbiter(mainDot, 50, 'blue');
outsideDot2 = new orbiter(mainDot, 30, 'green');
outsideDot3 = new orbiter(mainDot, 70, 'red');
outsideDot4 = new orbiter(outsideDot3, 15, 'yellow', 3);
outsideDot5 = new orbiter(mainDot, 100, 'orange');

requestAnimationFrame(loop);

function loop() {
   cnv.width = window.innerWidth - 25;
   cnv.height = window.innerHeight - 25;

   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, cnv.width, cnv.height);

   for (let i = 0; i < dots.length; i++) {
      dots[i].draw();
   }

   requestAnimationFrame(loop);
}
