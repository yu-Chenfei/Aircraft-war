// 碰撞检测
let doubleTimer = null;
let dt = 8; // 时间
let cowedTimer = null;
let ct = 8; // 时间

let scoreDiv = document.getElementById("score");

// 积分
let score = 0;

// bomb 炸弹
let bombDiv = document.getElementById("bomb");
let bombMax = 3; // 最多拥有炸弹数量
let bombNum = 0; // 现有炸弹数量

// 在外调用
let check = () => {
	let es = enemyDiv.children;
	let bs = buttleDiv.children;
	let ps = propDiv.children;

	// 检测英雄与奖励
	checkHeroWidthProp(ps);

	// 敌机与子弹 敌机与英雄
	for(let i = 0;i < es.length;i++){
		let e = es[i];
		if(e.isDel){
			continue;
		}
		// 先判断hero的碰撞
		if(isCheck(e,hero)){
			// 敌机与hero碰撞 -> game over!
			// 停止timer、提示分数是否重新开始、重新开始游戏
			gameOver();
		}
		// 在判断与子弹的碰撞
		for(let j = 0;j < bs.length;j++){
			let b = bs[j]; // 获取当前子弹
			if(b.isDel){
				// 这个子弹已经击中过敌机了 不应该继续存在
				continue;
			}
			if(isCheck(e,b)){
				// 子弹消失
				b.isDel = true;
				// 敌机被击中 子弹消失 敌机减少hp
				e.hp -= 100;
				if(e.hp <= 0){
					// 敌机爆炸消失
					e.isDel = true;
					// 计算得分
					score += e.score;
					scoreDiv.innerHTML = `得分：${score}`;
					// break跳出的是内层循环
					break; // 如果爆炸了 没必要进行剩下的循环
				}
			}
		}
	}
}

// 检测英雄与奖励
let checkHeroWidthProp = ps => {
	for(let i = 0;i < ps.length;i++){
		let p = ps[i];
		if(isCheck(p,hero)){
			// 碰了
			p.isDel = true;
			if(p.type == 0){ // 炸弹
				getBomb();
			}else if(p.type == 1){ // 双排子弹
				getDouble();
			}else{ // 密集子弹
				getCowed();
			}
		}
	}
}

// 炸弹
let getBomb = () => {
	if(bombNum >= bombMax){
		return;
	}
	let img = document.createElement("img");
	img.src = "./img/bomb.png";
	bombDiv.appendChild(img);
	bombNum++;
}

// 双排
let getDouble = () => {
	clearInterval(doubleTimer);
	dt = 8; // 重置双排子弹的时间
	isDouble = true;
	doubleTimer = setInterval(() => {
		dt--;
		if(dt <= 0){
			isDouble = false;
			clearInterval(doubleTimer);
		}
	},1000);
}
// 密集
let getCowed = () => {
	clearInterval(cowedTimer);
	ct = 8;
	space = 3;
	cowedTimer = setInterval(() => {
		ct--;
		if(ct <= 0){
			space = 7;
			clearInterval(cowedTimer);
		}
	},1000);
}

// 碰撞检测函数
let isCheck = (a, b) => {
	let l1 = a.offsetLeft;
	let t1 = a.offsetTop;
	let r1 = l1 + a.offsetWidth;
	let b1 = t1 + a.offsetHeight;

	let l2 = b.offsetLeft;
	let t2 = b.offsetTop;
	let r2 = l2 + b.offsetWidth;
	let b2 = t2 + b.offsetHeight;

	if(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2){
		// 不碰撞
		return false;
	}
	return true;
}