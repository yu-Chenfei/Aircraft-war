// 奖励的创建与运动

let propDiv = document.getElementById("prop");

let propNum = 1000; // 奖励的概率参数

let freshProp = () => {
	propDiv.innerHTML = "";
	propNum = 1000;
}

// 奖励的运动
let propMove = () => {
	// 1.创建
	let n = rand(0,propNum);
	if(n == 1 || n == 11){ // 炸弹
		createProp(0);
	}else if(n == 2 || n == 22){ // 双排
		createProp(1);
	}else if(n == 3 || n == 33){ // 密集
		createProp(2);
	}
	// 2.运动
	let ps = propDiv.children;
	for(let i = 0;i < ps.length;i++){
		if(ps[i].isDel){
			propDiv.removeChild(ps[i]);
			i--;
			continue;
		}
		let top = ps[i].offsetTop + ps[i].speedY;
		if(top > sh - ps[i].offsetHeight){
			ps[i].isDel = true;
		}
		setPosition(ps[i],{
			top
		});
	}
}

// 奖励的创建
let createProp = type => { // type即是图片的下标 又是图片的类型
	let div = document.createElement("div");
	div.className = "prop";
	div.type = type;
	div.style.backgroundPosition = `${-39*type}px 0`;
	div.isDel = false;
	div.speedY = rand(3,10);
	setPosition(div,{
		left: rand(0,sw-39)
	});
	propDiv.appendChild(div);
}