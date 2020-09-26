// 飞机的操作
// 获取hero
let hero = document.getElementById("hero");

// 设置hero的位置
let setHeroPosition = () => {
	setPosition(hero,{
		left: (sw - hero.offsetWidth)/2,
		top: sh - hero.offsetHeight
	});
}
setHeroPosition();


// 直接添加事件 键盘和触屏

// 定义四个方向的状态
let isTop = false;
let isLeft = false;
let isBottom = false;
let isRight = false;

// 键盘
window.onkeydown = function(event){ // 按下
	// 兼容event
	var event = event || window.event;

	let c = event.keyCode;

	// isLeft = (c == 37 ? true : false);
	// isTop = (c == 38 ? true : false);
	// isRight = (c == 39 ? true : false);
	// isBottom = (c == 40 ? true : false);

	switch (c){
		case 37:
			isLeft = true;
			break;
		case 38:
			isTop = true;
			break;
		case 39:
			isRight = true;
			break;
		case 40:
			isBottom = true;
			break;
		default:
			break;
	}
}

window.onkeyup = function(event){ // 抬起
	// 兼容event
	var event = event || window.event;

	let c = event.keyCode;

	// isLeft = (c == 37 ? true : false);
	// isTop = (c == 38 ? true : false);
	// isRight = (c == 39 ? true : false);
	// isBottom = (c == 40 ? true : false);

	switch (c){
		case 37:
			isLeft = false;
			break;
		case 38:
			isTop = false;
			break;
		case 39:
			isRight = false;
			break;
		case 40:
			isBottom = false;
			break;
		case 32:
			// 空格 发起炸弹
			clearAllEnemy();
			break;
		default:
			break;
	}
}

// 炸弹技能
let clearAllEnemy = () => {
	// 先判断是否有炸弹
	if(bombDiv.children.length == 0){
		return;
	}

	// 1.底部删除一枚炸弹
	document.getElementById("bomb").removeChild(bombDiv.children[0]);
	bombNum--;
	// 2.清除屏幕的enemy
	// enemyDiv.innerHTML = "";
	let es = enemyDiv.children;
	for(let i = 0;i < es.length;i++){
		es[i].isDel = true;
		// 计算得分
		score += es[i].score;
		document.getElementById("score").innerHTML = `得分：${score}`;
	}
}


// 飞机移动的函数
let heroMove = () => {
	let left = hero.offsetLeft;
	let top = hero.offsetTop;
	if(isLeft){left -= 9;}
	if(isRight){left += 9;}
	if(isTop){top -= 9;}
	if(isBottom){top += 9;}

	// 左侧
	left = (left < 0 ? 0 : left);
	// 顶部
	top = (top < 0 ? 0 : top);
	// 右侧
	left = (left > sw - hero.offsetWidth ? sw - hero.offsetWidth : left);
	// 底部
	top = (top > sh - hero.offsetHeight ? sh - hero.offsetHeight : top);

	setPosition(hero,{
		left,
		top
	});
}


// 触屏
let starX = 0;
let starY = 0;
// 手指按下
hero.ontouchstart = function(event){
	// 兼容event
	var event = event || window.event;
	// 阻止浏览器默认
	event.preventDefault();

	starX = hero.offsetLeft;
	starY = hero.offsetTop;
	// 手指按下的位置 先获取手指 再获取坐标
	if(event.touches.length == 1){
		// 一根手指
		var touch = event.touches[0];
		let tx = touch.clientX;
		let ty = touch.clientY;
		window.ontouchmove = function(event){
			// 兼容event
			var event = event || window.event;
			var touch2 = event.touches[0];
			setPosition(hero,{
				left: starX + touch2.clientX - tx,
				top: starY + touch2.clientY - ty
			});
		}
	}else if(event.touches.length == 2){
		clearAllEnemy();
	}
}

// 手指抬起
hero.ontouchend = function(){
	window.ontouchmove = null;
}