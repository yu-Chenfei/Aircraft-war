// 判断是否是pc端
let isPc = () => {
	let arr = ['iPhone','iPad','iOS','Android'];
	let type = navigator.userAgent;
	let _isPc = true;
	arr.forEach((item,index) => _isPc = (type.includes(item) ? false : _isPc));
	return _isPc;
}
isPc();

// 为元素重新设置left 和 top
let setPosition = (el,obj) => {
	// el: 需要设置left和top的元素
	// obj = {left: 1, top: t}
	el.style.left = obj.left + "px";
	el.style.top = obj.top + "px";
}

// 随机数
let rand = (min,max) => Math.floor(Math.random() * (max-min+1)+min);
