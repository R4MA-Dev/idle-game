import Player from "./player.js";
import Enemy from "./Enemy.js";

function setup() {
    noCanvas();
    const player = new Player(0, 0, 500);
    const enemy = new Enemy(player);

    const buyAutoDmgBtn = select("#buyAutoDMG");
    buyAutoDmgBtn.mousePressed((e) => {
        if (!player.hasAutoDmg) {
            player.hasAutoDmg = true;
            player.addAutoDmg();
            buyAutoDmgBtn.html(`Increase Auto-Damage`)
        }
        player.increaseAutoDmg()
    });
    /*setInterval(() => {
        enemy.takeDamage(1)
    }, 3000)*/
    //player.addMoney(20)
    //console.log(player.getMoney())
    //console.log(enemy)
}

window.setup = setup;
