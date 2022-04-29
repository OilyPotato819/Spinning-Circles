let cnv = document.getElementById('my_canvas');
let ctx = cnv.getContext('2d');

cnv.width = window.innerWidth - 25;
cnv.height = window.innerHeight - 25;

let relativeNum = getRelativeNum();

function getRelativeNum() {
   return Math.sqrt(cnv.width * cnv.height);
}

let dots = [];

let mainDot = {
   speed: 0.003,
   x: cnv.width / 2,
   y: cnv.height / 2,
   directionX: 1,
   directionY: 1,
   radius: 0.02,
   wallsHit: 0,
   cornerHit: false,
   cornerCount: 0,
   currentColor: 0,
   colorCount: 0,
   draw: function () {
      this.relativeRadius = this.radius * relativeNum;
      this.relativeSpeed = this.speed * relativeNum;

      function randNum() {
         return Math.floor(Math.random() * 255);
      }

      if (this.wallsHit > 0) {
         this.r = randNum();
         this.g = randNum();
         this.b = randNum();

         this.color = `rgb(${this.r}, ${this.g}, ${this.b})`;
      }

      ctx.fillStyle = this.color || 'black';
      ctx.strokeStyle = this.color || 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.relativeRadius, 0, 2 * Math.PI);

      if (this.cornerHit) {
         ctx.stroke();
         this.cornerCount++;
      } else {
         ctx.fill();
         ctx.strokeStyle = `rgb(${this.r - 50}, ${this.g - 50}, ${
            this.b - 50
         })`;
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.relativeRadius, 0, 2 * Math.PI);
         ctx.stroke();
      }

      this.wallsHit = 0;

      if (this.x + this.relativeRadius >= cnv.width) {
         this.directionX = -1;
         this.wallsHit++;
      } else if (this.x - this.relativeRadius <= 0) {
         this.directionX = 1;
         this.wallsHit++;
      }

      if (this.y + this.relativeRadius >= cnv.height) {
         this.directionY = -1;
         this.wallsHit++;
      } else if (this.y - this.relativeRadius <= 0) {
         this.directionY = 1;
         this.wallsHit++;
      }

      if (this.wallsHit === 2) {
         this.cornerHit = true;
      }

      if (this.cornerCount >= 50) {
         this.cornerCount = 0;
         this.cornerHit = false;
      }

      this.x += this.directionX * this.relativeSpeed;
      this.y += this.directionY * this.relativeSpeed;
   },
};

class orbiter {
   constructor(centralDot, distance, color, size) {
      this.centralDot = centralDot;
      this.distance = distance;
      this.color = color;
      this.size = size;
      this.angle = 0;
      dots.push(this);
   }

   draw() {
      this.relativeSize = (this.size || 0.01) * relativeNum;
      this.relativeDistance = this.distance * relativeNum;

      this.degreesNum = this.distance * 1200;

      this.x =
         this.centralDot.x +
         this.relativeDistance *
            Math.cos((this.angle * Math.PI) / this.degreesNum);
      this.y =
         this.centralDot.y +
         this.relativeDistance *
            Math.sin((this.angle * Math.PI) / this.degreesNum);

      this.angle++;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.relativeSize, 0, 2 * Math.PI);
      ctx.fill();
   }
}

outsideDot1 = new orbiter(mainDot, 0.045, 'blue');
outsideDot2 = new orbiter(mainDot, 0.07, 'green');
outsideDot3 = new orbiter(mainDot, 0.1, 'red');
outsideDot4 = new orbiter(outsideDot3, 0.02, 'yellow', 0.006);
outsideDot5 = new orbiter(mainDot, 0.12, 'orange');

dots.push(mainDot);

requestAnimationFrame(loop);

function loop() {
   cnv.width = window.innerWidth - 25;
   cnv.height = window.innerHeight - 25;
   relativeNum = getRelativeNum();

   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, cnv.width, cnv.height);

   for (let i = 0; i < dots.length; i++) {
      dots[i].draw();
   }

   requestAnimationFrame(loop);
}
