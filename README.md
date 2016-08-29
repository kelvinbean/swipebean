# swipebean
一个自制轮播插件
	
	本插件为纯js开发，兼容IE浏览器.IE下无过渡效果。
	1.可以控制过渡时间，轮播间隔时间
	2.控制是否悬停停止切换
	3.自定义轮播是否需要按钮，按钮的样式都是自定义，是否显示按钮数字
	4.而且可以控制轮播的方向（向左left,向右right,向上top,向下bottom）

简单的配置项
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
		hasBtnFont: false
	}

demo：
    swipe.init({
  		list:'.swipe-list',
  		direction:'left',//默认是向左，可以不设置
  		hoverStop : true,
  		width:800,
  		height:500
  	});
