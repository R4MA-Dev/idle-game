import BigNum from "./BigNum.js"

class Player {
    constructor(money, autodmg, autodps, debug = false) {
        this.autoDmgCost = new BigNum(50)
        this.autoDpsCost = new BigNum(50)
        if (!debug) {
            this.money = new BigNum(money)
            this.dmg = new BigNum(1)
            this.autodmg = new BigNum(autodmg)
            this.autodps = new BigNum(autodps)
            this.enemies_killed = 0
            this.level = 1
            this.hasAutoDmg = false
            this.hitTargetInterval = null
        }
        else {
            this.money = new BigNum(1.5e16)
            this.dmg = new BigNum(1.2e10)
            this.autodmg = new BigNum(1e4)
            this.autodps = new BigNum(3000)
            this.enemies_killed = 0
            this.level = 1
            this.hasAutoDmg = false
            this.hitTargetInterval = null
        }
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

    addKill() {
        this.enemies_killed++;
        if (this.enemies_killed % 5 == 0) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++
        select("#level").html(`Level: ${this.getLevel()}`)
        this.dmg.multEqual(2)
        select("#dmg").html(`Damage: ${this.getDmg()} points`)
        if (this.level === 2) {
            select("#buyAutoDMG").elt.disabled = false;
            select("div > span#warning").remove();
        }
    }

    addMoney(amount) {
        this.money.addEqual(amount);
    }

    addAutoDmg() {
        if (this.money.value >= this.autoDmgCost.value) {
            this.hasAutoDmg = true;
            this.hitTargetInterval = setInterval(() => {
                this.enemy.takeDamage(this.getAutoDmg());
            }, this.getAutoDmgDps());
            this.addMoney(-this.autoDmgCost)

            select("#buyAutoDMG").html(`Increase Auto-Damage - <span>\$ ${this.autoDmgCost}</span>`)
            select("#auto-damage").html(`Auto-Damage: ${this.getAutoDmg()} points`)
            select("#auto-damage-dps").html(`Auto-Damage DPS (Miliseconds): ${this.getAutoDmgDps()}`)
            select("#money").html(`Money: $ ${this.getMoney()}`)

            select("#buyAutoDPS").elt.disabled = false;
            select("div > span#warning").remove();
        }
    }

    increaseAutoDmg() {
        if (this.money.value >= this.autoDmgCost.value) {
            this.autodmg.addEqual(1)
            this.money.addEqual(-this.autoDmgCost.value)
            this.autoDmgCost.multEqual(1.5)
            select("#money").html(`Money: $ ${this.getMoney()}`)
        }
    }

    increaseDps(amount) {
        if (this.money.value >= this.autoDpsCost.value) {
            this.money.addEqual(-this.autoDpsCost.value)
            select("#money").html(`Money: $ ${this.getMoney()}`)

            this.autoDpsCost.multEqual(1.5)
            this.autodps.addEqual(-amount)
            clearInterval(this.hitTargetInterval)
            this.hitTargetInterval = setInterval(() => {
                this.enemy.takeDamage(this.getAutoDmg());
            }, this.getAutoDmgDps());
        }
    }

    getMoney() {
        return this.money;
    }

    getDmg() {
        return this.dmg;
    }

    getAutoDmg() {
        return this.autodmg;
    }

    getAutoDmgDps() {
        return this.autodps.value
    }

    getLevel() {
        return this.level;
    }
}

export default Player;