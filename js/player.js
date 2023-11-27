class Player {
    constructor(money, autodmg, autodps) {
        this.money = money
        this.dmg = 1
        this.autodmg = autodmg
        this.autodps = autodps
        this.enemies_killed = 0
        this.level = 1
        this.hasAutoDmg = false
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
        this.dmg *= 2
        if (this.level == 2) {
            const buyButton = select("#buyAutoDMG").elt.disabled = false;
            select("figure > figcaption").remove();
        }
    }

    addMoney(amount) {
        this.money += amount;
    }

    addAutoDmg() {
        setInterval(() => {
            this.enemy.takeDamage(this.autodmg);
        }, this.autodps);
    }

    increaseAutoDmg() {
        this.autodmg++
    }

    increaseDps(){
        this.autodps -= 500
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

    getLevel() {
        return this.level;
    }
}

export default Player;