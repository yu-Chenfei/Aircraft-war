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
}