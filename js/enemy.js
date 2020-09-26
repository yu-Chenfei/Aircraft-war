// 敌机的创建与运动
// 获取敌机的管理父级
let enemyDiv = document.getElementById("enemy");
// 游戏难度参考值
let diff = 200;

// 刷新数据
let freshEnemy = () => {
	enemyDiv.innerHTML = "";
	diff = 200;
}

// 敌机的运动 在外调用 30ms调用一次
let enemyMove = () => {
	// 1.完成敌机的创建
	createEnemy();
	// 2.完成所有敌机的移动
	// 获取所有的敌机
	let es = enemyDiv.children;
	for(let i = 0;i < es.length;i++){
		if(es[i].isDel){
			// 删掉对应的敌机
			enemyDiv.removeChild(es[i]);
			i--;
			continue;
		}
		let top = es[i].offsetTop + es[i].speedY;
		if(top > sh - 164){
			// 飞出屏幕
			es[i].isDel = true;
		}
		es[i].style.top = top + "px";
	}
}

// el:元素
// 大敌机
let setBigEnemy = el => {
	el.score = 6;
	el.style.width = "110px";
	el.style.height = "164px";
	el.style.backgroundImage = "url(./img/enemy3.png)";
	el.speedY = rand(3,5); // 敌机移动的速度
	setPosition(el,{
		left: rand(0,sw-110),
		top: -164
	});
	el.hp = 600; // 敌机的血量
	// 想看爆炸的动画需要这两个参数
	el.index = 1;
	el.count = 10;
}

// 中敌机
let setEnemy = el => {
	el.score = 3;
	el.style.width = "46px";
	el.style.height = "64px";
	el.style.backgroundImage = "url(./img/enemy2.png)";
	el.speedY = rand(3,7); // 敌机移动的速度
	setPosition(el,{
		left: rand(0,sw-46),
		top: -64
	});
	el.hp = 350; // 敌机的血量
	// 想看爆炸的动画需要这两个参数
	el.index = 1;
	el.count = 10;
}

// 小敌机
let setSmallEnemy = el => {
	el.score = 1;
	el.style.width = "38px";
	el.style.height = "34px";
	el.style.backgroundImage = "url(./img/enemy1.png)";
	el.speedY = rand(3,8); // 敌机移动的速度
	setPosition(el,{
		left: rand(0,sw-38),
		top: -34
	});
	el.hp = 100; // 敌机的血量
	// 想看爆炸的动画需要这两个参数
	el.index = 1;
	el.count = 10;
}

// 敌机的创建
let createEnemy = () => {
	// 控制敌机的数量
	let n = rand(0,diff);
	if(n <= 10){
		// 创建敌机
		let e = document.createElement("div");
		e.className = "enemy";
		e.isBol = false; // 是否爆炸
		e.isDel = false; // 是否可以删掉
		enemyDiv.appendChild(e); // 添加到父级中
		// 创建敌机
		if(n > 9){
			// 创建大敌机
			setBigEnemy(e);
		}else if(n > 5){
			// 创建中敌机
			setEnemy(e);
		}else{
			// 创建小敌机
			setSmallEnemy(e);
		}
	}
}