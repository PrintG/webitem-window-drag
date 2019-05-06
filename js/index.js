/*==============================*/
//     * author -> Print        //
//     * QQ -> 2662256509       //
/*=============================*/
(function(win,doc){
	var oWindow = doc.getElementById("window"),
		oAppList = oWindow.querySelector(".w-container .w-c-list");

	//加载图片
	function loadImg(urlI){
		var img = new Image();
		img.src = "img/bg/"+urlI+".jpg";
		img.onload = function(){
			console.log("背景 <"+urlI+"> 加载完毕");
		};
	}
	for(var i = 1; i <= 5; i++){
		loadImg(i)
	}

	//更换壁纸部分
	~function(oWindow){
		var i = 1,	//当前壁纸
		mI = 5,	 //最大壁纸数
		bgT = 1000;  //壁纸过渡时间

		//设置壁纸过渡时间
		oWindow.style.webkitTransition = "background "+bgT+"ms";
		oWindow.style.transition = "background "+bgT+"ms";

		//初始化壁纸
		oWindow.style.backgroundImage = "url('img/bg/"+i+".jpg')";

		//按键N随机更换壁纸
		var prevT = true;
		doc.onkeyup = function(e){
			e = e || win.event;
			//按的是N键
			if(e.keyCode === 78 && (prevT === true || new Date() - prevT > bgT+100)){
				i = ++i>mI?1:i;
				oWindow.style.backgroundImage = "url('img/bg/"+i+".jpg')";
				prevT = new Date();
			}

		};
	}(oWindow);

	//添加应用并可拖动
	~function(oAppList){
		var allPos = 160;

		//填入桌面
		for(var i = 0; i <= allPos; i++){
			/*
			var htmlstr = "";
			if(i < _appListDataL){
				htmlstr = '<li class="l-item app">' +
								'<img src="img/icon/'+_appListData[i].appid+'.png" width="48px" height="48px" alt="icon" draggable="false">' +
								'<span>'+_appListData[i].appname+'</span>' +
						  '</li>';
			}else{
				htmlstr = '<li class="l-item">' +
						  '</li>';
			}*/
			var isApp = i < _appListDataL;
			oAppList.innerHTML += '<li class="l-item'+(isApp?" app":(i==allPos?" dragEle":""))+'">' + ( isApp ?('<img src="img/icon/'+_appListData[i].appid+'.png" width="48px" height="48px" alt="icon" draggable="false"><span>'+_appListData[i].appname+'</span>'):'' );
		}

		var oApps = oAppList.querySelectorAll("li.app"),
			oLis = oAppList.querySelectorAll("li:not(.dragEle)");
			oDrag = oAppList.querySelector("li.dragEle");

		oApps[0].className = oApps[0].className + " active";

		var _prev = 0;
		addE();
		function addE(){
			for(var i = 0; i < _appListDataL; i++){
				(function(i){
					//点击选中当前应用
					oApps[i].onclick = function(e){
						e = e || window.event;

						oApps[_prev].className = "l-item app";
						this.className = "l-item app active click";
						_prev = i;

						e.cancelBubble = true;
					}
					//拖拽
					oApps[i].onmousedown = function(e){
						e = e || window.event;

						var _Tapp = this;	//被拖动的元素

						//按下
						oDrag.className = "dragEle show";
						oDrag.innerHTML = this.innerHTML;

						var dw2 = oDrag.clientWidth/2,
							dh2 = oDrag.clientHeight/2;

						oDrag.style.top = e.pageY - dh2 + "px";
						oDrag.style.left = e.pageX - dw2 + "px";

						doc.onmousemove = function(e){
							e = e || window.event;
							//移动
							oDrag.style.top = e.pageY - dh2 + "px";
							oDrag.style.left = e.pageX - dw2 + "px";
						}
						doc.onmouseup = function(e){
							e = e || window.event;
							//松开
							oDrag.className = "dragEle";
							doc.onmousemove = null;
							doc.onmouseup = null;

							//获取每个元素的x y偏移量
							var oLisPos = [];
							for(var i= 0; i < oLis.length; i++){
								oLisPos.push([oLis[i].offsetLeft + 3,oLis[i].offsetTop]);
							}

							//匹配拖拽的位置与元素最近的
							var _left = e.pageX - dw2,
								_top = e.pageY - dh2;

							var _Jx = 0, _Jy = 0;
							for(var i = 0; i < oLisPos.length; i++){
								if( Math.abs( _left - oLisPos[i][0] ) < Math.abs( _left - oLisPos[_Jx][0] )){
									_Jx = i;
								}
								if( Math.abs( _top - oLisPos[i][1] ) < Math.abs( _top - oLisPos[_Jy][1] )){
									_Jy = i;
								}
							}

							//排列元素
							var _mL = [];
							var _row = 16;	//一行16个

							for(var i = 0; i < 10; i++){
								_mL.push([]);
							}

							for(var i = 0; i < 10; i++){
								for(var j = i*16; j < (i+1)*16; j++){
									_mL[i].push(j);
								}
							}
							var InLi = oLis[_mL[_Jy/16][_Jx]];

							if(!/app/.test(InLi.className)){
								InLi.innerHTML = oDrag.innerHTML;
								InLi.className = _Tapp.className;
								_Tapp.innerHTML = "";
								_Tapp.className = "l-item";

								_Tapp.onmousedown = null;
								_Tapp.onclick = null;

								console.log(oApps, oLis);

								oApps = oAppList.querySelectorAll("li.app"),
								oLis = oAppList.querySelectorAll("li:not(.dragEle)");

								addE();
							}

						}	


					}

				})(i);
			}
		}
		//点击文档任意地方取消选中
		oAppList.onclick = function(){
			oApps[_prev].className = "l-item app";
		};





	}(oAppList)

	//  160个格子

})(window, document);