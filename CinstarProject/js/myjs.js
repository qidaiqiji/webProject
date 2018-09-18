// 获取DOM元素
function byId(id)
{
   return typeof(id) === "string"?document.getElementById(id):id;
}
function byTagName(obj,tag)
{
  return obj.getElementsByTagName(tag);
}

// 获取样式

function getStyle(obj,attr)
{
   return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,0)[attr];
}

// ------------------------------------------------------------


// 添加事件处理函数
var eventUntil = {
// 添加事件
  addEvent:function(obj,event,fn)
  {
      if(obj.addEventListener)
      {
        obj.addEventListener(event,fn,false)
      }
      else if(obj.attachEvent)
      {
        obj.attachEvent('on'+event,fn)

      }
      else{
        obj['on'+event] = fn();
      }
  },
  // 删除事件
  removeEvent:function(obj,event,fn)
  {
      if(obj.removeEventListener)
      {
        obj.removeEventListener(event,fn,false)
      }
      else if(obj.detachEvent)
      {
        obj.detachEvent('on'+event,fn)

      }
        else{
          obj['on'+event] = null;
        }
     },

   // 获取事件执行的目标元素
   getTarget:function(event)
   {
      return event.target||event.srcElement;
   },
   // 阻止冒泡
   stopPropagation:function(event)
   {
      if(event.stopPropagation)
      {
        event.stopPropagation();
      }
      else{
        event.cancelBubble = true;
      }
   },
   // 阻止默认事件
   preventDefault:function(event)
   {
      if(event.preventDefault)
      {
        event.preventDefault();
      }
      else{
        event.returnValue = false;
      }
   }
};

// ---------------------------------------------------------------

// 匀速运动函数封装

// 各个参数代表的意思
/*Obj  -- 运动的主体元素
json:--存放要改变的属性和值
dir -- 每一步的步长
endFn -- 在运动结束时执行的回调函数
*/

function doMove(obj,json,dir,endFn)
{
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    for(var attr in json)
    {
      dir = parseInt(getStyle(obj,attr))<json[attr]?dir:-dir;
      var speed = parseInt(getStyle(obj,attr)) + dir;

      if(speed >= json[attr] && dir>0 || speed <= json[attr] && dir<0)  //往前 或 往后
      {
        speed = json[attr];   
      }

      obj.style[attr] = speed +"px";
      if(speed == json[attr])
      {
        clearInterval(obj.timer);
  // 有的运动没有回调函数，所以在运动结束时判断，有的话就执行，没有就忽略
        endFn&&endFn();
        /*
        等价于：
        if(endFn)
        {
          endFn();
        }*/
        
      }
    }
  },30)
};

// ----------完美运动框架--------------
function startMove(obj,json,step,fn){
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
//定义一个停止条件
  var bStop = true
  for(attr in json)
  {
    //1.设置初值 
    var iSpeed = 0;
    var iCur = 0;

    if(attr == "opacity")
        {

          iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
        }
    else
        {
          iCur = parseInt(getStyle(obj,attr));
        }

    //2.算速度

    iSpeed = (json[attr] - iCur)/step;

    iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

    // 3.检测停止

//如果某个值还没到目标值，就把bStop的值设为false
    if(iCur != json[attr])
    {
      bStop = false;
    }

    if(attr == "opacity")
    {
      
      obj.style[attr] = (iCur + iSpeed)/100;
    }
    else
    {
      obj.style[attr] = iCur + iSpeed + 'px';
    } 
  }

//如果说bStop = true，即表示所有的值都到了目标值，此时再关闭定时器
//这里这个条件写在最外面，即在执行完所有之后做判断
  
      if(bStop)
    {
        clearInterval(obj.timer);

          if(fn)
          {
             fn();
          }
    }
    
  },30)
}

// 运动效果
var Tween = {
  linear: function (t, b, c, d){
    return c*t/d + b;
  },
  easeIn: function(t, b, c, d){
    return c*(t/=d)*t + b;
  },
  easeOut: function(t, b, c, d){
    return -c *(t/=d)*(t-2) + b;
  },
  easeBoth: function(t, b, c, d){
    if ((t/=d/2) < 1) {
      return c/2*t*t + b;
    }
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInStrong: function(t, b, c, d){
    return c*(t/=d)*t*t*t + b;
  },
  easeOutStrong: function(t, b, c, d){
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeBothStrong: function(t, b, c, d){
    if ((t/=d/2) < 1) {
      return c/2*t*t*t*t + b;
    }
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  elasticIn: function(t, b, c, d, a, p){
    if (t === 0) { 
      return b; 
    }
    if ( (t /= d) == 1 ) {
      return b+c; 
    }
    if (!p) {
      p=d*0.3; 
    }
    if (!a || a < Math.abs(c)) {
      a = c; 
      var s = p/4;
    } else {
      var s = p/(2*Math.PI) * Math.asin (c/a);
    }
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  elasticOut: function(t, b, c, d, a, p){
    if (t === 0) {
      return b;
    }
    if ( (t /= d) == 1 ) {
      return b+c;
    }
    if (!p) {
      p=d*0.3;
    }
    if (!a || a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else {
      var s = p/(2*Math.PI) * Math.asin (c/a);
    }
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },    
  elasticBoth: function(t, b, c, d, a, p){
    if (t === 0) {
      return b;
    }
    if ( (t /= d/2) == 2 ) {
      return b+c;
    }
    if (!p) {
      p = d*(0.3*1.5);
    }
    if ( !a || a < Math.abs(c) ) {
      a = c; 
      var s = p/4;
    }
    else {
      var s = p/(2*Math.PI) * Math.asin (c/a);
    }
    if (t < 1) {
      return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
          Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    }
    return a*Math.pow(2,-10*(t-=1)) * 
        Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
  },
  backIn: function(t, b, c, d, s){
    if (typeof s == 'undefined') {
       s = 1.70158;
    }
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  backOut: function(t, b, c, d, s){
    if (typeof s == 'undefined') {
      s = 2.70158;  //回缩的距离
    }
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  }, 
  backBoth: function(t, b, c, d, s){
    if (typeof s == 'undefined') {
      s = 1.70158; 
    }
    if ((t /= d/2 ) < 1) {
      return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    }
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  bounceIn: function(t, b, c, d){
    return c - Tween['bounceOut'](d-t, 0, c, d) + b;
  },       
  bounceOut: function(t, b, c, d){
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
    }
    return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
  },      
  bounceBoth: function(t, b, c, d){
    if (t < d/2) {
      return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
    }
    return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
  }
};

// 获取/设置css样式
function css(element, attr , val){
  if(attr == "scale"||attr == "scaleX"
  ||attr == "scaleY"||attr == "scaleZ"
  ||attr == "rotateX"||attr == "rotateY"
  ||attr == "rotateZ"||attr == "rotate"
  ||attr == "skewX"||attr == "skewY"
  ||attr == "translateX"||attr == "translateY"
  ||attr == "translateZ") {
    return cssTransform(element, attr, val);
  }
  if(arguments.length == 2){
    var val = getComputedStyle(element)[attr];
    if(attr=='opacity'){
      val = Math.round(val*100);
    }
    return parseFloat(val);
  } 
  if(attr == "opacity") {
    element.style.opacity= val/100;
  } else {
    element.style[attr]= val + "px";  
  }
}

// 获取/设置transform样式
function cssTransform(element, attr, val){
  if(!element.transform){
    element.transform = {};
  } 
  if(typeof val === "undefined"){ 
    if(typeof element.transform[attr] === "undefined"){
      switch(attr){
        case "scale":
        case "scaleX":
        case "scaleY":
        case "scaleZ":
          element.transform[attr] = 100;
          break;
        default:
          element.transform[attr] = 0;  
      }
    } 
    return element.transform[attr];
  } else {
    element.transform[attr] = val;
    var transformVal  = "";
    for(var s in element.transform){
      switch(s){
        case "scale":
        case "scaleX":
        case "scaleY":
        case "scaleZ":
          transformVal += " " + s + "("+(element.transform[s]/100)+")";
          break;
        case "rotate":
        case "rotateX":
        case "rotateY":
        case "rotateZ":
        case "skewX":
        case "skewY":
          transformVal += " " + s + "("+element.transform[s]+"deg)";
          break;
        default:
          transformVal += " " + s + "("+element.transform[s]+"px)";       
      }
    }
    element.style.WebkitTransform = element.style.transform = transformVal;
  }
}

// 时间版运动
function MTween(init){
  var t = 0;
  var b = {};
  var c = {};
  var d = init.time / 20;
  for(var s in init.target){ 
    b[s] = css(init.el, s); 
    c[s] = init.target[s] - b[s];
  }
  clearInterval(init.el.timer); 
  init.el.timer = setInterval(
    function(){
      t++;
      if(t>d){
        clearInterval(init.el.timer);
        init.callBack&&init.callBack.call(init.el);
      } else {
        init.callIn&&init.callIn.call(init.el);
        for(var s in b){
          var val = Number((Tween[init.type](t,b[s],c[s],d)).toFixed(2));
          css(init.el, s, val);
        }
      }
    },
    20
  );
}

// 手机滑屏效果
function mScroll(init){
    if(!init.el)
    {
      return;
    }
    else{
      var wrap = init.el;
      var inner = init.el.children[0];
      var startPoint = 0;
      var nowPoint = 0;
      var startTrans = 0;
      var lastY = 0;
      var lastDis = 0;
      var lastTime = 0;
      var lastTimeGap = 0;
      var maxTranslate = wrap.clientHeight - inner.offsetHeight;
      if(!init.offBar)
      {
        var scrollBar = document.createElement("div");
        scrollBar.style.cssText = "width:5px;background:rgba(0,0,0,.5);position:absolute;right:0;top:40px;border-radius:2px;opacity:0;transition:.3s opacity;";
        wrap.appendChild(scrollBar);
        var scale = wrap.clientHeight/inner.offsetHeight;
      }
      inner.style.minHeight = "100%";
      inner.addEventListener("touchstart",function(ev){
        maxTranslate = wrap.clientHeight - inner.offsetHeight;
        if(!init.offBar)
        {
          if(maxTranslate>=0){
          scrollBar.style.display = "none";
          }
          else{
            scrollBar.style.display = "block";
            scrollBar.style.opacity = 1;
            scrollBar.style.height = scale*wrap.clientHeight+'px';
          }
        }
        clearInterval(inner.timer);
        startPoint = ev.changedTouches[0].pageY;
        startTrans = css(inner,"translateY");
        lastY = startTrans;
        lastTime = new Date().getTime();
        lastDis = lastTimeGap = 0;
      });
      inner.addEventListener("touchmove",function(ev){
        var nowTime = new Date().getTime();
        nowPoint = ev.changedTouches[0].pageY;
        var dis = nowPoint - startPoint;
        var translateY = dis + startTrans;

        css(inner,"translateY",translateY);
        (init.offBar)||css(scrollBar,"translateY",-translateY*scale);

        lastDis = translateY - lastY;
        lastTimeGap = nowTime - lastTime;
        lastY = translateY;
        lastTime = nowTime;
      });

      inner.addEventListener("touchend",function(){
        var type = "easeOut";
        var speed =Math.round(lastDis/lastTimeGap*10);
        speed = lastTimeGap<=0?0:speed;
        var target = Math.round(speed*40 + css(inner,"translateY"));
        if(target > 0){
          target = 0;
          type = "backOut";
        } else if(target < maxTranslate){
            target = maxTranslate;
            type = "backOut";
        };

        MTween({
          el:inner,
          target: {translateY:target},
          time: Math.round(Math.abs(target - css(inner,"translateY"))*1.5),
          type: type,
          callBack: function(){
            (init.offBar)||(scrollBar.style.opacity = 0);
          },
          callIn:function(){
            var translateY = css(inner,"translateY");
            (init.offBar)||css(scrollBar,"translateY",-translateY*scale);
          }
        })
      });

      }
  }



