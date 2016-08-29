# swipebean
一个自制轮播插件
	
	本插件为纯js开发，兼容IE浏览器.IE下无过渡效果。
	1.可以控制过渡时间，轮播间隔时间
	2.控制是否悬停停止切换
	3.自定义轮播是否需要按钮，按钮的样式都是自定义，是否显示按钮数字
	4.而且可以控制轮播的方向（向左left,向右right,向上top,向下bottom）

简单的配置项
swipeOption ={<br>
		// 宽度<br>
		width:302,<br>
		// 高度<br>
		height:134,<br>
		// 包裹的父元素的query样式<br>
		list:'.swipe-list',<br>
		// 滑动方向<br>
		direction:'left',<br>
		// 间隔时间<br>
		iTime:2000,<br>
		// 滚动时间<br>
		duration:500,<br>
		// 悬停是否停止切换（false表示继续切换，true表示停止切换）<br>
		hoverStop:false,<br>
		// 是否需要按钮<br>
		hasBtn:false,<br>
		// 按钮类<br>
		btnClass:'bean_btn',<br>
		// 按钮父类class<br>
		btnListClass:'bean_btn_list',<br>
		// 选中类<br>
		activeClass:'active',<br>
		// 是否需要按钮数字<br>
		hasBtnFont: false<br>
	}<br>

demo：<br>
    swipe.init({<br>
  		list:'.swipe-list',<br>
  		direction:'left',//默认是向左，可以不设置<br>
  		hoverStop : true,<br>
  		width:800,<br>
  		height:500<br>
  	});<br>
