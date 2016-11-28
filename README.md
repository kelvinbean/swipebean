# swipebean
一个自制轮播插件<br/>
	
本插件为纯js开发，兼容IE浏览器。IE8及以下无过渡效果。<br/>
1.可以控制过渡时间，轮播间隔时间<br/>
2.控制是否悬停停止切换<br/>
3.自定义轮播是否需要按钮，按钮的样式都是自定义，是否显示按钮数字<br/>
4.而且可以控制轮播的方向（向左left,向右right,向上top,向下bottom）<br/>

## 实现功能<br/>
1.可以实现一般的轮播图的所有功能<br/>
2.可以实现数字滚动展示功能<br/>
3.可以实现图册，相册效果
4.只要是需要用的滚动的，都可以使用这个插件


## 简单的配置项<br/>
```javascript
	swipeOption ={
		// 宽度
		width:302,
		// 高度
		height:134,
		// 包裹的父元素的query样式
		list:'.swipe-list',
		// 子元素Class
		itemClass:'swipe-item',
		// 是否自动播放
		auto:true,
		// 滑动方向
		direction:'left',
		// 是否超出隐藏
		overflow:true,
		// 间隔时间
		iTime:2000,
		// 滚动时间
		duration:500,
		// 自定义过渡效果
		transition:'',
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
		// 当在移动端时，是否需要touch事件
		isTouch:true,
		// 回调函数（在图片切换的同时进行）
		callback:null,
		// 复制数量（一对为单位、一前一后）
		copyNum:1
	}
```

## demo：
```javascript
    swipe.init(
  		list:'.swipe-list',
  		itemClass:'swipe-item',
  		direction:'left',//默认是向左，可以不设置
  		hoverStop : true,
  		width:800,
  		height:500
  	});
```
