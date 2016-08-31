
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
		// 是否需要下一个按钮
		hasNext:false,
		// 是否需要上一个按钮
		hasPrev:false,
		// 下一个按钮样式
		nextClass:'bean_next',
		// 上一个按钮样式
		prevClass:'bean_prev',
		// 以下几项无需自定义设置
		// 延迟执行方法对象
		timeobj:null,
		// 切换对象的父对象
		swipeList: null,
		// 总宽度
		widthAll : 0,
		// 总高度
		heightAll : 0,
		// 切换个数
		childNum : 0,
		// 当前页码
		pageNum:1,
		// 是否为移动端
		isPhone:false
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

		if(typeof(page)!="undefined" && page <= option.childNum+1 && page >= 0){
			if(page == option.childNum+1){
				page = 1;
			}else if(page == 0){
				page = option.childNum;
			}
			// option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = Number(-option.width*page)+'px';
			option.pageNum = page;
			if(option.hasBtn){
				changeBtn(option,page);
			}
		}

		option.timeobj = setTimeout(function(){
			_left = option.swipeList.offsetLeft;

			var move2Left = Number(_left-option.width);
			option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = move2Left+'px';
			option.pageNum++;

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}

			if(move2Left <= -option.widthAll-option.width){
				option.pageNum = 1;
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.left = '-'+option.width+'px';
				},option.duration);
			}
			moveLeft(option);
		},option.iTime);

	},

	// 往右边滑动
	moveRight = function(option,page){

		var _left;

		clearTimeout(option.timeobj);

		if(typeof(page)!="undefined" && page <= option.childNum+1 && page >= 0){
			if(page == option.childNum+1){
				page = 1;
			}else if(page == 0){
				page = option.childNum;
			}
			option.swipeList.style.left = Number(-(option.widthAll-option.width*(page-1)))+'px';
			option.pageNum = page;
			if(option.hasBtn){
				changeBtn(option,page);
			}
		}
		
		option.timeobj = setTimeout(function(){

			_left = option.swipeList.offsetLeft;

			var move2Right = Number(_left+option.width);
			option.swipeList.style.transition = (option.duration/1000) + 's left ease';
			option.swipeList.style.left = move2Right+'px';
			option.pageNum++;

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}

			if(move2Right >= 0){
				option.pageNum = 1;
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.left = -(option.widthAll)+'px';
				},option.duration);
			}

			moveRight(option);
		},option.iTime);

	},

	// 向上滑动
	moveTop = function(option,page){

		var _top;

		clearTimeout(option.timeobj);

		if(typeof(page)!="undefined" && page <= option.childNum+1 && page >= 0){
			if(page == option.childNum+1){
				page = 1;
			}else if(page == 0){
				page = option.childNum;
			}
			// option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = Number(-option.height*page)+'px';
			option.pageNum = page;
			if(option.hasBtn){
				changeBtn(option,page);
			}
		}
		
		option.timeobj = setTimeout(function(){

			_top = option.swipeList.offsetTop;

			var move2top = Number(_top-option.height);
			option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = move2top+'px';
			option.pageNum++;

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}
			

			if(move2top <= -option.heightAll-option.height){
				option.pageNum = 1;
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.top = '-'+option.height+'px';
				},option.duration);
			}
			moveTop(option);
		},option.iTime);

	},

	// 向下滑动
	moveBottom = function(option,page){

		var _top;

		clearTimeout(option.timeobj);

		if(typeof(page)!="undefined" && page <= option.childNum+1 && page >= 0){
			if(page == option.childNum+1){
				page = 1;
			}else if(page == 0){
				page = option.childNum;
			}
			// option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = Number(-(option.heightAll-option.height*(page-1)))+'px';
			option.pageNum = page;
			if(option.hasBtn){
				changeBtn(option,page);
			}
		}
		
		option.timeobj = setTimeout(function(){

			_top = option.swipeList.offsetTop;

			var move2bottom = Number(_top+option.height);
			option.swipeList.style.transition = (option.duration/1000) + 's top ease';
			option.swipeList.style.top = move2bottom+'px';
			option.pageNum++;

			// 自动切换按钮
			if(option.hasBtn){
				autoChange(option);
			}
			

			if(move2bottom >= 0){
				option.pageNum = 1;
				setTimeout(function(){
					option.swipeList.style.transition = 'none';
					option.swipeList.style.top = -option.heightAll+'px';
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
		}
	},

	// 切换按钮
	changeBtn = function(option,target){
		if(typeof(target) == 'object'){
			//删除当前选中类
			var activeDom = option.swipeList.parentNode.querySelector('.'+option.activeClass);
			if(activeDom){
				activeDom.className = activeDom.className.replace(new RegExp('(^|\\b)' +option.activeClass.split(' ').join('|') + '(\\b|$)', 'gi'), '');
			}
			// 加上点击后的选中类
			target.className += (' '+option.activeClass);

		}else{
			var btn_list = option.swipeList.parentNode.querySelectorAll('.'+option.btnClass);
			for(var i in btn_list){
				if(i < option.childNum){
					if(btn_list[i].getAttribute('page') == target){
						btn_list[i].className += (' '+option.activeClass);
					}else{
						btn_list[i].className = btn_list[i].className.replace(new RegExp('(^|\\b)'+option.activeClass.split(' ').join('|') + '(\\b|$)', 'gi'), '');
					}
				}
			}
		}
	},
	
	// 设置容器元素样式
	styleList = function(option){
		// 设置容器元素样式
		option.swipeList.style.position = 'absolute';
		switch (option.direction){
			case 'left':
				option.swipeList.style.top = '0px';
				option.swipeList.style.left = '-'+option.width+'px';
				option.swipeList.style.width = option.widthAll+(option.width*2)+'px';
				break;
			case 'right':
				option.swipeList.style.top = '0px';
				option.swipeList.style.left = -option.widthAll+'px';
				option.swipeList.style.width = option.widthAll+(option.width*2)+'px';
				break;
			case 'top':
				option.swipeList.style.top = '-'+option.height+'px';
				option.swipeList.style.left = '0px';
				option.swipeList.style.width = option.width+'px';
				break;
			case 'bottom':
				option.swipeList.style.top = -option.heightAll+'px';
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
		var lastChild = null;
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
				lastChild = children[i];
			}
			htmlArr.push(children[i].outerHTML);
		}

		// 复制第一个属性到最后
		option.swipeList.appendChild(firstChild.cloneNode(true));console.log(children[childNum-1])
		// 复制最后一个属性到前面
		option.swipeList.insertBefore(lastChild.cloneNode(true),firstChild);

		// 计算总高度和总宽度
		option.childNum = childNum;
		option.widthAll = option.width * childNum;
		option.heightAll = option.height * childNum;

		// 加入处理向下滑时，倒序输出
		if(option.direction == 'bottom'){
			htmlArr.push(firstChild.outerHTML);
			option.swipeList.innerHTML = htmlArr.reverse().join('');
		}
	},

	// 绑定鼠标悬停停止滑动
	pauseSwipe = function(option){
		option.swipeList.onmousceenter = function(){
			clearTimeout(option.timeobj);
		};
		option.swipeList.onmouseleave = function(){
			doMove(option);
		};
	},

	// 绑定移动端滑动翻页事件
	touchSwipe = function(option){
		var startX,startY,nowX,nowY,x,y,initX,initY;
		option.swipeList.ontouchstart = function(e){
			clearTimeout(option.timeobj);
			startX = e.targetTouches[0].pageX;
			startY = e.targetTouches[0].pageY;
			initX = option.swipeList.offsetLeft;
			initY = option.swipeList.offsetTop;
		};
		option.swipeList.ontouchmove = function(e){
			nowX = e.targetTouches[0].pageX;
			nowY = e.targetTouches[0].pageY;
			x = nowX-startX;
			y = nowY-startY;

			if((option.direction == 'left' || option.direction == 'right') && Math.abs(x) < option.width){
				e.preventDefault();
				option.swipeList.style.transform = 'translateX('+x+'px)';
			}

			if((option.direction == 'top' || option.direction == 'bottom') && Math.abs(y) < option.height){
				e.preventDefault();
				option.swipeList.style.transform = 'translateY('+y+'px)';
			}

		};
		option.swipeList.ontouchend = function(e){
			if((option.direction == 'left' || option.direction == 'right')){
				if(Math.abs(x) > 20){
					if(x < 0){
						option.swipeList.style.transition = (option.duration/2000) + 's all ease';
						option.swipeList.style.transform = 'translateX(-'+option.width+'px)';
						setTimeout(function(){
							option.swipeList.style.transition ='none';
							option.swipeList.style.transform = 'translateX(0)';
							if(option.direction == 'left'){
								doMove(option,option.pageNum+1);
							}
							if(option.direction == 'right'){
								doMove(option,option.pageNum-1);
							}

						},200);
					}else{
						option.swipeList.style.transition = (option.duration/2000) + 's all ease';
						option.swipeList.style.transform = 'translateX('+option.width+'px)';
						setTimeout(function(){
							option.swipeList.style.transition ='none';
							option.swipeList.style.transform = 'translateX(0)';
							if(option.direction == 'left'){
								doMove(option,option.pageNum-1);
							}
							if(option.direction == 'right'){
								doMove(option,option.pageNum+1);
							}
						},200);
					}
				}else{
					e.preventDefault();
					option.swipeList.style.transform = 'translateX(0)';
					option.swipeList.style.left = initX+'px';
					doMove(option);
				}
			}else{
				if(Math.abs(y) > 10){
					if(y < 0){
						option.swipeList.style.transition = (option.duration/2000) + 's all ease';
						option.swipeList.style.transform = 'translateY(-'+option.height+'px)';
						setTimeout(function(){
							option.swipeList.style.transition ='none';
							option.swipeList.style.transform = 'translateY(0)';
							if(option.direction == 'top'){
								doMove(option,option.pageNum+1);
							}
							if(option.direction == 'bottom'){
								doMove(option,option.pageNum-1);
							}

						},200);
					}else{
						option.swipeList.style.transition = (option.duration/2000) + 's all ease';
						option.swipeList.style.transform = 'translateY('+option.height+'px)';
						setTimeout(function(){
							option.swipeList.style.transition ='none';
							option.swipeList.style.transform = 'translateY(0)';
							if(option.direction == 'top'){
								doMove(option,option.pageNum-1);
							}
							if(option.direction == 'bottom'){
								doMove(option,option.pageNum+1);
							}
						},200);
					}
				}else{
					e.preventDefault();
					option.swipeList.style.transform = 'translateY(0)';
					option.swipeList.style.top = initY+'px';
					doMove(option);
				}				
			}
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
				option.swipeList.style.transition = (option.duration/1000) + 's all ease';
				changeBtn(option,e.target);
				doMove(option,page);
			}
			e.stopPropagation();
		};
	},

	// 上下页按钮
	nextPrev = function(option,type){
		var node = document.createElement('a');
		if(type == 'prev'){
			node.className = option.prevClass;
			node.onclick = function(){
				doMove(option,option.pageNum-1);
			};
		}else{
			node.className = option.nextClass;
			node.onclick = function(){
				doMove(option,option.pageNum+1);
			};
		}
		option.swipeList.parentNode.appendChild(node);
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

		// 判断是否要下一页切换按钮
		if(option.hasNext){
			nextPrev(option,'next');
		}

		// 判断是否需要上一页切换按钮
		if(option.hasPrev){
			nextPrev(option,'prev');
		}

		// 判断是否需要touch事件
		if(option.isPhone){
			touchSwipe(option);
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

		// 判断是否为移动端
		var userAgent = navigator.userAgent;
		if ( /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|micromessenger|ucbrowser/i.test( userAgent.toLowerCase())){
			_option.isPhone = true;
		}

		// 处理函数
		deal(_option);
		
	};
	// 下一页
	swipe.next = function(option){
		doMove(option,option.page+1);
	};
	// 上一页
	swipe.prev = function(option){
		doMove(option,option.page-1);
	};

	return swipe;
});