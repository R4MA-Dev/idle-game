import Player from "./player.js";
import Enemy from "./Enemy.js";

function setup() {
    noCanvas();
    const player = new Player(0, 1, 3000);
    const enemy = new Enemy(player);

    select("#money").html(`Money: $ ${player.getMoney()}`)
    select("#dmg").html(`Damage: ${player.getDmg()} points`)
    select("#level").html(`Level: ${player.getLevel()}`)

    const buyAutoDmgBtn = select("#buyAutoDMG");
    buyAutoDmgBtn.mousePressed(e => {

        if (!player.hasAutoDmg) {
            player.addAutoDmg();
        } else if (player.hasAutoDmg) {
            player.increaseAutoDmg();
            buyAutoDmgBtn.html(`Increase Auto-Damage - <span>\$ ${player.autoDmgCost}</span>`)
            select("#auto-damage").html(`Auto-Damage: ${player.getAutoDmg()} points`)
        }
    });

    const buyAutoDpsBtn = select("#buyAutoDPS");
    buyAutoDpsBtn.mousePressed(e => {
        player.increaseDps(150)
        buyAutoDpsBtn.html(`Increase Auto-Damage DPS - <span>\$ ${player.autoDpsCost}</span>`)
        select("#auto-damage-dps").html(`Auto-Damage DPS (Miliseconds): ${player.getAutoDmgDps()}`)
    });
}

window.setup = setup;
