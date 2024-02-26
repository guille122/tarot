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
    constructor(x, y, radio, type, opacity){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.type = (type<0.25)? true : false;
        this.opacity = opacity;
    }

    drawStar = () => {
        ctx.fillStyle = `rgba(255,255,255, ${this.opacity})`;
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
    
        ctx.fill();
    }
    
    updateStar = () => {
        this.opacity = (this.type)? Math.random() : this.opacity;
    }
}




window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = 136;

    createStars();
});

window.addEventListener("load", () => {
    canvas.width = window.innerWidth
    canvas.height = 136;

    createStars();

    draw();
});

const createStars = () => {
    stars = [];
    for(let i=0; i<canvas.width >> 4 ; i++){
        stars.push(new Star(Math.random() * canvas.width, 
                            Math.random() * canvas.height,
                            Math.random() * 4,
                            Math.random(),
                            Math.random()));
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let star of stars){
        star.drawStar();
    }

    requestAnimationFrame(drawLoop);
}

const drawLoop = () => {

    for(let star of stars.filter((star) => {return star.type})){
        ctx.clearRect(star.x-star.radio, star.y, star.x+(star.radio*2), star.y+(star.radio*2));
        star.updateStar();
        star.drawStar();
    }

    requestAnimationFrame(drawLoop);
}