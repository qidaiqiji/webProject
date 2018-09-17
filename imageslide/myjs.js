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



