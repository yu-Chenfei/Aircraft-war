// 子弹的运动与创建

let buttleDiv = document.getElementById("buttle");

let isDouble = false; // 是否双排
let isCowed = false; // 是否密集
let space = 7; // 子弹间隔
let spaceCount = 0; // 子弹间隔计时参数

// 子弹的运动 外部调用
let buttleMove = () => {
	// 1.完成子弹的创建
	spaceCount++;
	if(spaceCount >= space){
		spaceCount = 0;
		createButtle();
		// doubleButtle();
		// singleButtle();
	}
	// 2.完成子弹的运动
	// 获取所有的子弹
	let bs = buttleDiv.children;
	for(let i = 0;i < bs.length;i++){
		if(bs[i].isDel){
			// 需要被删掉
			buttleDiv.removeChild(bs[i]);
			i--;
			continue;
		}
		let top = bs[i].offsetTop - bs[i].speedY;
		if(top <= -14){
			bs[i].isDel = true;
		}
		setPosition(bs[i],{
			top
		})
	}
}

// 子弹的创建
let createButtle = () => {
	if(isDouble){
		doubleButtle();
	}else{
		singleButtle();
	}
}

let singleButtle = () => {
	let div = document.createElement("div");
	div.className = "buttle";
	div.speedY = 9;
	div.isDel = false;
	setPosition(div,{
		left: hero.offsetLeft + (hero.offsetWidth/2) - 3,
		top: hero.offsetTop 
	});
	buttleDiv.appendChild(div);
}

let doubleButtle = () => { // 双排子弹
	let div = document.createElement("div");
	div.className = "buttle";
	div.speedY = 9;
	div.isDel = false;
	setPosition(div,{
		left: hero.offsetLeft + (hero.offsetWidth/2) - 3 - 21,
		top: hero.offsetTop + 22
	});
	buttleDiv.appendChild(div);
	let div2 = document.createElement("div");
	div2.className = "buttle";
	div2.speedY = 9;
	div2.isDel = false;
	setPosition(div2,{
		left: hero.offsetLeft + (hero.offsetWidth/2) - 3 + 21,
		top: hero.offsetTop + 22
	});
	buttleDiv.appendChild(div2);
}