import Player from "./player.js";
import Enemy from "./Enemy.js";

function setup() {
    noCanvas();
    const player = new Player(0, 0, 3000);
    const enemy = new Enemy(player);

    select("#money").html(`Money: $ ${player.getMoney()}`)
    select("#dmg").html(`Damage: ${player.getDmg()} points`)
    select("#level").html(`Level: ${player.getLevel()}`)

    const buyAutoDmgBtn = select("#buyAutoDMG");
    buyAutoDmgBtn.mousePressed((e) => {
        if (!player.hasAutoDmg) {
            player.hasAutoDmg = true;
            player.addAutoDmg();
            buyAutoDmgBtn.html(`Increase Auto-Damage`)
            select("#auto-damage").html(`Auto-Damage: ${player.getAutoDmg()} points`)
            select("#auto-damage-dps").html(`Auto-Damage DPS (Miliseconds): ${player.getAutoDmgDps()}`)
        }
        player.increaseAutoDmg()
        select("#auto-damage").html(`Auto-Damage: ${player.getAutoDmg()}`)
    });

    const buyAutoDpsBtn = select("#buyAutoDPS");
    buyAutoDpsBtn.mousePressed((e) => {
        player.increaseDps(150)
        select("#auto-damage-dps").html(`Auto-Damage DPS (Miliseconds): ${player.getAutoDmgDps()}`)
    });
    /*setInterval(() => {
        enemy.takeDamage(1)
    }, 3000)*/
    //player.addMoney(20)
    //console.log(player.getMoney())
    //console.log(enemy)
}

window.setup = setup;
