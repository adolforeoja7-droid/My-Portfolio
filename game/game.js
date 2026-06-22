const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// ================= ASSETS =================

const bgImg = new Image();
bgImg.src = "./assets/background.jpg";

const playerImg = new Image();
playerImg.src = "./assets/player.png";


// ================= SOUNDS =================

const menuMusic = new Audio("./assets/menu.mp3");
menuMusic.loop = true;
menuMusic.volume = 0.5;

const shootSound = new Audio("./assets/shoot.wav");
const explosionSound = new Audio("./assets/explosion.wav");
const gameoverSound = new Audio("./assets/gameover.wav");


// ================= LOAD CHECK =================

let imagesLoaded = false;

let bgLoaded = false;
let playerLoaded = false;


bgImg.onload = () => {
    bgLoaded = true;
};


playerImg.onload = () => {
    playerLoaded = true;
};


bgImg.onerror = () => {
    console.log("Background image missing");
};


playerImg.onerror = () => {
    console.log("Player image missing");
};



// ================= PLAYER =================

let player = {

    x: 375,
    y: 520,

    w: 50,
    h: 50,

    speed: 6
};



// ================= GAME STATE =================

let gameStarted = false;
let gameOver = false;



// ================= DATA =================

let bullets = [];
let enemies = [];

let enemyTimer = 0;

let score = 0;
let lives = 3;



// ================= INPUT =================

let keys = {};



// ================= CLICK START =================

canvas.addEventListener("click", () => {

    if(!gameStarted){

        gameStarted = true;

        menuMusic.pause();

    }

});



// ================= TOUCH START =================

canvas.addEventListener("touchstart", () => {

    if(!gameStarted){

        gameStarted = true;

        menuMusic.pause();

    }

});



// ================= KEYBOARD =================


document.addEventListener("keydown",(e)=>{


    keys[e.key] = true;



    // SHOOT

    if(
        e.key === " " &&
        gameStarted &&
        !gameOver
    ){

        bullets.push({

            x:player.x + 22,
            y:player.y

        });


        shootSound.currentTime = 0;
        shootSound.play();

    }



    // RESTART

    if(
        e.key.toLowerCase() === "r" &&
        gameOver
    ){

        restartGame();

    }


});



document.addEventListener("keyup",(e)=>{

    keys[e.key] = false;

});





// ================= RESTART =================


function restartGame(){


    player.x = 375;


    bullets = [];

    enemies = [];


    score = 0;

    lives = 3;


    gameOver = false;

    gameStarted = true;


}





// ================= UPDATE =================


function update(){


    if(!gameStarted || gameOver)
        return;



    // PLAYER MOVE


    if(
        keys["ArrowLeft"] &&
        player.x > 0
    ){

        player.x -= player.speed;

    }



    if(
        keys["ArrowRight"] &&
        player.x < canvas.width-player.w
    ){

        player.x += player.speed;

    }




    // BULLETS


    for(let b of bullets){

        b.y -= 8;

    }


    bullets =
    bullets.filter(
        b => b.y > -20
    );




    // SPAWN ENEMY


    enemyTimer++;


    if(enemyTimer > 60){


        enemies.push({

            x:Math.random()*(canvas.width-50),

            y:-50,

            w:50,

            h:50,

            speed:3

        });


        enemyTimer = 0;

    }




    // ENEMY MOVE


    for(let i=enemies.length-1;i>=0;i--){


        let e = enemies[i];


        e.y += e.speed;



        if(e.y > canvas.height){


            enemies.splice(i,1);


            lives--;



            if(lives <=0){


                gameOver = true;


                gameoverSound.currentTime=0;

                gameoverSound.play();


            }


        }

    }





    // COLLISION


    for(let i=bullets.length-1;i>=0;i--){


        for(let j=enemies.length-1;j>=0;j--){


            let b = bullets[i];

            let e = enemies[j];



            if(

                b.x < e.x+e.w &&

                b.x+5 > e.x &&

                b.y < e.y+e.h &&

                b.y+15 > e.y

            ){


                bullets.splice(i,1);


                enemies.splice(j,1);



                score++;



                explosionSound.currentTime=0;

                explosionSound.play();



                break;

            }


        }

    }


}






// ================= DRAW =================


function draw(){



    // BACKGROUND


    if(bgLoaded){


        ctx.drawImage(

            bgImg,

            0,

            0,

            canvas.width,

            canvas.height

        );


    }

    else{


        ctx.fillStyle="black";

        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

    }





    // START SCREEN


    if(!gameStarted){


        ctx.fillStyle="rgba(0,0,0,.6)";

        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );



        ctx.fillStyle="white";

        ctx.font="40px Arial";


        ctx.fillText(

            "SPACE SHOOTER",

            230,

            200

        );



        ctx.font="20px Arial";


        ctx.fillText(

            "CLICK TO PLAY",

            280,

            300

        );


        return;


    }




    // PLAYER


    if(playerLoaded && !gameOver){


        ctx.drawImage(

            playerImg,

            player.x,

            player.y,

            player.w,

            player.h

        );


    }





    // BULLETS


    ctx.fillStyle="yellow";


    for(let b of bullets){


        ctx.fillRect(

            b.x,

            b.y,

            5,

            15

        );

    }





    // ENEMIES


    ctx.fillStyle="red";


    for(let e of enemies){


        ctx.fillRect(

            e.x,

            e.y,

            e.w,

            e.h

        );

    }




    // UI


    ctx.fillStyle="white";

    ctx.font="20px Arial";


    ctx.fillText(

        "Score: "+score,

        10,

        30

    );


    ctx.fillText(

        "Lives: "+lives,

        650,

        30

    );





    // GAME OVER


    if(gameOver){


        ctx.fillStyle="rgba(0,0,0,.7)";

        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );



        ctx.fillStyle="red";

        ctx.font="50px Arial";


        ctx.fillText(

            "GAME OVER",

            250,

            250

        );



        ctx.fillStyle="white";

        ctx.font="20px Arial";


        ctx.fillText(

            "Press R to Restart",

            290,

            320

        );

    }


}





// ================= LOOP =================


function loop(){


    update();

    draw();


    requestAnimationFrame(loop);


}



loop();



// ================= MUSIC =================


menuMusic.play().catch(()=>{

    console.log("Music waiting for user click");

});
