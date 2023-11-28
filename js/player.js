class Player {
    constructor(money, autodmg, autodps) {
        this.money = money
        this.dmg = 1
        this.autodmg = autodmg
        this.autodps = autodps
        this.enemies_killed = 0
        this.level = 1
        this.hasAutoDmg = false
        this.hitTargetInterval = setInterval(() => {
            this.enemy.takeDamage(this.getAutoDmg());
        }, this.getAutoDmgDps());
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
        this.dmg *= 2
        select("#dmg").html(`Damage: ${this.getDmg()} points`)
        if (this.level === 2) {
            select("#buyAutoDMG").elt.disabled = false;
            select("figure > figcaption").remove();
            
            select("#buyAutoDPS").elt.disabled = false;
            select("figure > figcaption").remove();
        }
    }

    addMoney(amount) {
        this.money += amount;
    }

    addAutoDmg() {
        this.hitTargetInterval
    }

    increaseAutoDmg() {
        this.autodmg++
    }

    increaseDps(amount){
        this.autodps -= amount
        clearInterval(this.hitTargetInterval)
        this.hitTargetInterval = setInterval(() => {
            this.enemy.takeDamage(this.getAutoDmg());
        }, this.getAutoDmgDps());
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

    getAutoDmgDps(){
        return this.autodps
    }

    getLevel() {
        return this.level;
    }
}

export default Player;