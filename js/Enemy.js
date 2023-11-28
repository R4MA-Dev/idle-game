
function mapPercentageToHue(p) {
	/**
	 * Mapea el porcentaje p (0 <= p <= 1) al rango
	 * [120, 0], que corresponde al rango de verde a rojo.
	 */
	return 120 * (1 - p);
}

class Enemy {
	constructor(player, maxHP = 10) {
		this.player = player;
		this.player.setEnemy(this);
		this.maxHP = int(maxHP);
		this.createButton(this.maxHP);
	}

	takeDamage(dmg) {
		this.currentHP -= dmg;

		if (this.currentHP <= 0) {
			//console.log("HP: " + this.currentHP);
			this.btn.remove();
			this.player.addKill();
			console.log(this.player.enemies_killed)
			this.player.addMoney(int(this.maxHP * 0.3));
			// console.log("Level:" + player.getLevel())
			// console.log("DMG: " + player.getDmg())
			select("#money").html(`Money: $ ${this.player.getMoney()}`)
			this.createButton(this.maxHP * 1.2);
		}

		this.btn.html(this.currentHP);
	}

	createButton(maxHP) {
		this.btn = createButton("");
		this.btn.parent(select("main"));
		this.btn.size(300, 300);
		this.btn.addClass("enemy");

		this.maxHP = int(maxHP)
		this.currentHP = this.maxHP;
		this.btn.html(this.currentHP);

		this.h = 120;
		this.btn.style("background", `hsl(${this.h}deg, 100%, 50%)`);

		this.btn.mousePressed(() => {
			this.takeDamage(this.player.getDmg());

			let percentage = 1 - (this.currentHP / this.maxHP);
			this.h = mapPercentageToHue(percentage);
			this.btn.style("background", `hsl(${this.h}deg, 100%, 50%)`);
		});
	}
}

export default Enemy;