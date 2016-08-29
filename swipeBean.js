
/*
	v 1.0.5

	kelvinbean自制轮播插件

*/

;(function(root,factory){

	if(typeof define === 'function' && define.amd){
		define([],factory);
	}else if(typeof exports === 'object'){
		modules.exports = factory();
	}else{
		root.swipe = factory();
	}
})(this,function(){

	var swipe = {},

	swipeOption ={
		// 宽度
		width:302,
		// 高度
		height:134,
		// 包裹的父元素的query样式
		list:'.swipe-list',
		// 滑动方向
		direction:'left',
		// 间隔时间
		iTime:2000,
		// 滚动时间
		duration:500,
		// 悬停是否停止切换（false表示继续切换，true表示停止切换）
		hoverStop:false,
		// 是否需要按钮
		hasBtn:false,
		// 按钮类
		btnClass:'bean_btn',
		// 按钮父类class
		btnListClass:'bean_btn_list',
		// 选中类
		activeClass:'active',
		// 是否需要按钮数字
		hasBtnFont: false,
		// 以下几项无需自定义设置
		timeobj:null,
		swipeList: null,
		widthAll : 0,
		heightAll : 0,
		childNum : 0
	},

	// 执行滑动
	doMove = function(option,page){
		switch (option.direction){
			case 'left':
				moveLeft(option,page);
				break;
			case 'right':
				moveRight(option,page);
				break;
			case 'top':
				moveTop(option,page);
				break;
			case 'bottom':
				moveBottom(option,page);
				break;
		}
	},


	// 往左边滑动
	moveLeft = function(option,page){

		var _left;

		clearTimeout(option.timeobj);

		if(page!="undefined"){
			option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = Number(-option.width*(page-1))+'px';
		}

		option.timeobj = setTimeout(function(){
			_left = option.swipeList.offsetLeft;

			var move2Left = Number(_left-option.width);
			option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = move2Left+'px';

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}

			if(move2Left <= -(option.widthAll-option.width)){
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.left = 0;
				},option.duration);
			}
			moveLeft(option);
		},option.iTime);

	},

	// 往右边滑动
	moveRight = function(option,page){

		var _left;

		clearTimeout(option.timeobj);

		if(page!="undefined"){
			option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = Number(-(option.widthAll-option.width*page))+'px';
		}
		
		option.timeobj = setTimeout(function(){

			_left = option.swipeList.offsetLeft;

			var move2Right = Number(_left+option.width);
			option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = move2Right+'px';

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}

			if(move2Right >= 0){
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.left = -(option.widthAll-option.width)+'px';
				},option.duration);
			}

			moveRight(option);
		},option.iTime);

	},

	// 向上滑动
	moveTop = function(option,page){

		var _top;

		clearTimeout(option.timeobj);

		if(page!="undefined"){
			option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = Number(-option.height*(page-1))+'px';
		}
		
		option.timeobj = setTimeout(function(){

			_top = option.swipeList.offsetTop;

			var move2top = Number(_top-option.height);
			option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = move2top+'px';

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}
			

			if(move2top <= -(option.heightAll-option.height)){
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.top = 0;
				},option.duration);
			}
			moveTop(option);
		},option.iTime);

	},

	// 向下滑动
	moveBottom = function(option,page){

		var _top;

		clearTimeout(option.timeobj);

		if(page!="undefined"){
			option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = Number(-(option.heightAll-option.height*page))+'px';
		}
		
		option.timeobj = setTimeout(function(){

			_top = option.swipeList.offsetTop;

			var move2bottom = Number(_top+option.height);
			option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = move2bottom+'px';

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}
			

			if(move2bottom >= 0){
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.top = -(option.heightAll-option.height)+'px';
				},option.duration);
			}
			moveBottom(option);
		},option.iTime);


	},

	// 自动切换按钮
	autoChange = function(option){
		var btn;
		var queryStr = '.'+option.btnClass+'.'+option.activeClass;
		var activeObj = option.swipeList.parentNode.querySelector(queryStr);
		if(activeObj && activeObj.nextSibling){
			// 切换按钮
			changeBtn(option,activeObj.nextSibling);
		}else{
			// 切换按钮
			changeBtn(option, option.swipeList.parentNode.querySelectorAll('.'+option.btnClass)[0]);
		};
	},

	// 切换按钮
	changeBtn = function(option,target){
		//删除当前选中类
		var activeDom = option.swipeList.parentNode.querySelector('.'+option.activeClass);
		if(activeDom){
			activeDom.className = activeDom.className.replace(new RegExp('(^|\\b)' + option.activeClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
		// 加上点击后的选中类
		target.className += (' '+option.activeClass);
	},
	
	// 设置容器元素样式
	styleList = function(option){
		// 设置容器元素样式
		option.swipeList.style.position = 'absolute';
		switch (option.direction){
			case 'left':
				option.swipeList.style.top = '0px';
				option.swipeList.style.left = '0px';
				option.swipeList.style.width = option.widthAll+'px';
				break;
			case 'right':
				option.swipeList.style.top = '0px';
				option.swipeList.style.left = -(option.widthAll-option.width)+'px';
				option.swipeList.style.width = option.widthAll+'px';
				break;
			case 'top':
				option.swipeList.style.top = '0px';
				option.swipeList.style.left = '0px';
				option.swipeList.style.width = option.width+'px';
				break;
			case 'bottom':
				option.swipeList.style.top = -(option.heightAll-option.height)+'px';
				option.swipeList.style.left = '0px';
				option.swipeList.style.width = option.width+'px';
				break;
		}
	},

	// 创建一个包裹父节点
	swipeWrap = function(option){
		// 创建一个父元素包裹列表容器
		var container =	document.createElement('div');
		container.innerHTML = option.swipeList.outerHTML;

		// 设置父元素样式
		container.style.width = option.width+'px';
		container.style.height = option.height+'px';
		container.style.overflow = 'hidden';
		container.style.position = 'relative';

		option.swipeList.outerHTML = container.outerHTML;

		// 关键的一步,重新获取swipeList对象。因为上一步的outerHTML已经让swipeList对象变成container了。
		option.swipeList = document.querySelector(option.list);

		option.swipeList.parentNode.className = option.swipeList.className;
		option.swipeList.className = '';

	},
	// 计算宽高并设置子元素样式
	caculate = function(option){
		// 计算宽度
		var children = option.swipeList.childNodes;
		var childNum = 0;
		var firstChild = null;
		var htmlArr = [];
		for(var i=0;i<children.length;i++){
			if(children[i].nodeType == 1){
				childNum++;
				if(firstChild === null){
					firstChild = children[i];
				}
				// 设置子元素样式
				children[i].style.float = option.direction=='right'?'right':'left';
				children[i].style.width = option.width+'px';
				children[i].style.height = option.height+'px';
			}
			htmlArr.push(children[i].outerHTML);
		}

		// 复制第一个属性到最后
		option.swipeList.appendChild(firstChild.cloneNode(true));

		// 计算总高度和总宽度
		option.childNum = childNum;
		option.widthAll = option.width * (childNum+1);
		option.heightAll = option.height * (childNum+1);

		// 加入处理向下滑时，倒序输出
		if(option.direction == 'bottom'){
			htmlArr.push(firstChild.outerHTML);
			option.swipeList.innerHTML = htmlArr.reverse().join('');
		}
	},
	// 绑定鼠标悬停停止滑动
	pauseSwipe = function(option){
		option.swipeList.onmouseenter = function(){
			clearTimeout(option.timeobj);
		};
		option.swipeList.onmouseleave = function(){
			doMove(option);
		};
	},

	// 按钮拼接与绑定
	btnPrint = function(option){
		var frag = document.createDocumentFragment();
		for(var i=0;i<option.childNum;i++){
			var node = document.createElement('a');
			var text = document.createTextNode(i+1);
			node.setAttribute('page',i+1);
			// 是否需要文字
			if(option.hasBtnFont){
				node.appendChild(text);
			}
			if(i == 0){
				node.className = option.btnClass +' '+option.activeClass;
			}else{
				node.className = option.btnClass;
			}
			frag.appendChild(node);
		}
		var nodeList = document.createElement('div');
		nodeList.className = option.btnListClass;
		nodeList.appendChild(frag);
		option.swipeList.parentNode.appendChild(nodeList);
		// 绑定点击事件
		nodeList.onclick = function(e){
			var page;
			if(e.target.nodeName.toLowerCase() == 'a'){
				page = e.target.getAttribute('page');
				changeBtn(option,e.target);
				doMove(option,page);
			}
			e.stopPropagation();
		};
	},

	// 处理函数
	deal = function(option){
		// 获取列表容器对象
		option.swipeList = document.querySelector(option.list);

		// 计算宽高并设置子元素样式
		caculate(option);

		// 设置容器样式
		styleList(option);

		// 创建一个父元素包裹列表容器
		swipeWrap(option);

		// 鼠标悬停是否停止轮播
		if(option.hoverStop){
			pauseSwipe(option);
		}

		// 判断是否需要切换按钮
		if(option.hasBtn){
			btnPrint(option);
		}

		// 开始执行
		doMove(option);
	};


	// 初始化
	swipe.init = function(options){
		var _option = {};

		// 复制配置变量（不能使用_option = swipeOption）
		for(var name in swipeOption){
			_option[name] = swipeOption[name];
		}

		// 覆盖配置
		for(var name in options){
			_option[name] = options[name];
		}

		// 处理函数
		deal(_option);
		
	};

	return swipe;
});