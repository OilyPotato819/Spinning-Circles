let cnv = document.getElementById('my_canvas');
let ctx = cnv.getContext('2d');

cnv.width = window.innerWidth - 25;
cnv.height = window.innerHeight - 25;

let dots = [];

let mainDot = {
   speed: 2,
   x: cnv.width / 2,
   y: cnv.height / 2,
   directionX: 1,
   directionY: 1,
   radius: 10,
   wallsHit: 0,
   cornerHit: false,
   cornerCount: 0,
   currentColor: 0,
   colorCount: 0,
   draw: function () {
      if (this.wallsHit > 0) {
         function randNum() {
            return Math.floor(Math.random() * 255);
         }

         let r = randNum();
         let g = randNum();
         let b = randNum();

         if (r >= 220 && g >= 220 && b >= 220) {
            g = 0;
         }

         this.color = `rgb(${r}, ${g}, ${b})`;
      }

      ctx.fillStyle = this.color || 'black';
      ctx.strokeStyle = this.color || 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

      if (this.cornerHit) {
         ctx.stroke();
         this.cornerCount++;
      } else {
         ctx.fill();
      }

      this.wallsHit = 0;

      function changeDirection(direction) {
         if (direction === 'x') {
            mainDot.directionX *= -1;
         } else {
            mainDot.directionY *= -1;
         }
         mainDot.wallsHit++;
      }

      if (this.x + this.radius >= cnv.width) {
         changeDirection('x');
      } else if (this.x - this.radius <= 0) {
         changeDirection('x');
      }

      if (this.y + this.radius >= cnv.height) {
         changeDirection('y');
      } else if (this.y - this.radius <= 0) {
         changeDirection('y');
      }

      if (this.wallsHit === 2) {
         this.cornerHit = true;
      }

      if (this.cornerCount >= 50) {
         this.cornerCount = 0;
         this.cornerHit = false;
      }

      this.x += this.directionX * this.speed;
      this.y += this.directionY * this.speed;
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
