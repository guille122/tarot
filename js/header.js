'use strict'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
 
let stars = [];

const STAR = new Path2D("M8 4 \
                        C8 4, 8 8, 12 8 \
                        C12 8, 8 8, 8 12 \
                        C8 12, 8 8, 4 8 \
                        C4 8, 8 8, 8 4 \
                        Z")

class Star{
    constructor(x, y, radio, opacity){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.opacity = opacity;
    }

    drawStar = () => {
        ctx.fillStyle = `rgba(255,255,255, ${this.opacity})`;
        ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
        const x = this.x;
        const y = this.y;
        const radio = this.radio;

        ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x, y, x, y+radio, x+radio, y+radio);
            ctx.bezierCurveTo(x+radio, y+radio, x, y+radio, x, y+radio*2);
            ctx.bezierCurveTo(x, y+radio*2, x, y+radio, x-radio, y+radio);
            ctx.bezierCurveTo(x-radio, y+radio, x, y+radio, x, y);
        ctx.closePath();

        ctx.filter = "blur(1px)";
        ctx.stroke();
        ctx.filter = "none";
        ctx.fill();
    }
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = 136;

    createStars();

    draw();
});

window.addEventListener("load", () => {
    canvas.width = window.innerWidth
    canvas.height = 136;

    document.getElementById('up').hidden = true;

    createStars();

    draw();
});

window.addEventListener("scroll", () => {

   if(window.scrollY > 144){
        document.getElementById('up').hidden = false;
        return;
    }else{
        document.getElementById('up').hidden = true;
    }

    for(const star of stars){
        star.x += (star.x <= canvas.width)? Math.cos(0.05) * star.radio : -canvas.width;
        star.y += (star.y <= canvas.height)? Math.sin(0.05) * star.radio : -canvas.height;
    }

    draw();
});

const createStars = () => {
    stars = [];
    
    for(let i=0; i<100; i++){
        stars.push(new Star(Math.random() * canvas.width, 
                            Math.random() * canvas.height,
                            Math.random() * 5,
                            Math.random()));
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let star of stars){
        star.drawStar();
    }
}