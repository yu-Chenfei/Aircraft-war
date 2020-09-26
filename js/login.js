// 游戏的开始与结束
// 信息的存储

// 获取元素
let loginDiv = document.getElementById("login");
let endDiv = document.getElementById("end");
let pResult = document.querySelector(".result");
let startBtn = document.querySelector("#loginBtn");
let againBtn =document.querySelector("#again");
let ul = document.querySelector("ul"); // 排行榜
let inp = document.getElementById("loginInp");

// 开始按钮
startBtn.onclick = function(){
	// 判断昵称是否为空
	if(inp.value == ""){
		alert("请输入昵称");
		return;
	}

	// 数据重置
	freshData();

	// 隐藏loginDiv
	loginDiv.style.display = "none"; 

	// 开始游戏
	start();
}

// 游戏结束 hero碰撞时调用
let gameOver = () => {
	// 1.停止timer
	clearInterval(timer);
	// 2.显示endDiv
	endDiv.style.display = "block";
	// 3.显示分数
	pResult.innerHTML = inp.value + "：" + score;
	// 4.存储更新
	// 值是否存在
	if(!localStorage.getItem("phb")){
		// 第一次打开游戏 数据不存在
		localStorage.setItem("phb","[]");
	}
	// 更新存储数据
	updataPhb();
	// 修改ul中的li数据
	setLi();
}

let setLi = () => {
	let lis = ul.children;
	// 数据
	let list = JSON.parse(localStorage.getItem("phb"));
	for(let i = 0;i < list.length;i++){
		if(i >= 3){
			break;
		}
		lis[i].innerHTML = `${i+1}.${list[i].nick} : ${list[i].score}`;
	}
}

let company = (v1,v2) => v1 - v2;

let updataPhb = () => {
	// 将数据倒成所需要的数组
	let list = JSON.parse(localStorage.getItem("phb"));
	let is = false; // 昵称是否存在
	for(let i = 0;i < list.length;i++){
		let obj = list[i];
		if(obj.nick == loginInp.value){
			is = true;
			// 这个昵称在存储空间中存在 更新分数
			if(score > obj.score){
				obj.score = score;
			}
			break;
		}
	}
	if(!is){
		// 新用户数据需要插入
		let obj = {
			nick: loginInp.value,
			score
		}
		list.push(obj);
	}
	// 数据数组已经更新 需要在返回存储空间
	localStorage.setItem("phb",JSON.stringify(list));

}

// 游戏重新开始
againBtn.onclick = function(){
	// 1.隐藏endDiv 显示loginDiv
	endDiv.style.display = "none";
	loginDiv.style.display = "block";
}

// 数据重置
let freshData = () => {
	// bullet.js
	freshBullet();
	// check.js
	freshCheck();
	// enemy.js
	freshEnemy();
	// hero.js
	setHeroPosition();
	// prop.js
	freshProp();
	// 重置得分
	scoreDiv.innerHTML = `得分：0`;
}