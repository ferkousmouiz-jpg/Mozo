const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const attackBtn = document.getElementById("attackBtn");
const restartBtn = document.getElementById("restartBtn");

const playerHpBar = document.getElementById("playerHp");
const enemyHpBar = document.getElementById("enemyHp");

const playerText = document.getElementById("playerText");
const enemyText = document.getElementById("enemyText");

const message = document.getElementById("message");

const player = {
    x: 60,
    y: 170,
    size: 35,
    hp: 100
};

const enemy = {
    x: 500,
    y: 170,
    size: 35,
    hp: 100,
    alive: true
};

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function update() {

    if (keys["ArrowUp"]) player.y -= 3;
    if (keys["ArrowDown"]) player.y += 3;
    if (keys["ArrowLeft"]) player.x -= 3;
    if (keys["ArrowRight"]) player.x += 3;

    player.x = Math.max(0, Math.min(canvas.width-player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height-player.size, player.y));

}

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#5fa84d";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#2563eb";
    ctx.fillRect(player.x,player.y,player.size,player.size);

    if(enemy.alive){

        ctx.fillStyle="#ef4444";
        ctx.fillRect(enemy.x,enemy.y,enemy.size,enemy.size);

    }

}

function loop(){

    update();

    draw();

    requestAnimationFrame(loop);

}

loop();

attackBtn.addEventListener("click",()=>{

    if(!enemy.alive) return;

    const dx=player.x-enemy.x;

    const dy=player.y-enemy.y;

    const distance=Math.sqrt(dx*dx+dy*dy);

    if(distance<80){

        const damage=Math.floor(Math.random()*15)+10;

        enemy.hp-=damage;

        if(enemy.hp<0) enemy.hp=0;

        enemyHpBar.style.width=enemy.hp+"%";

        enemyText.textContent=`${enemy.hp} / 100`;

        message.textContent=`⚔️ ألحقت ${damage} ضرراً`;

        if(enemy.hp===0){

            enemy.alive=false;

            message.textContent="🎉 لقد هزمت الوحش";

        }

    }else{

        message.textContent="اقترب من الوحش أولاً";

    }

});

restartBtn.addEventListener("click",()=>{

    player.x=60;
    player.y=170;
    player.hp=100;

    enemy.hp=100;
    enemy.alive=true;

    playerHpBar.style.width="100%";
    enemyHpBar.style.width="100%";

    playerText.textContent="100 / 100";
    enemyText.textContent="100 / 100";

    message.textContent="ابدأ اللعبة";

});
