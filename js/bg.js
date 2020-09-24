// 背景滚动
// el为具体的某一个标签
let dis = 0; // 移动距离
let bgRoll = (el,h) => {
	dis += 5;
	if(dis >= h){
		dis = 0;
	}
	el.style.backgroundPosition = `0 ${dis}px`;
}