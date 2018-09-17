window.onload = function()
{
var crumbData = [
{
	"title":"品牌",
	"data":["苹果","小米","锤子","魅族","华为","三星","OPPO","vivo","乐视"]

},
{
	"title":"尺寸",
	"data":["4.0-4.5尺寸","4.6-4.9尺寸","5.0-5.5尺寸","6.0英寸以上"]
},
{
	"title":"系统",
	"data":["android","ios","window phone","无","其他"]
},
{
	"title":"网络",
	"data":["联通3G","双卡单4G","双卡双4G","联通4G"]
}
];

var type = document.getElementById("type");
var choice = document.getElementById("choice");
var lis = type.getElementsByTagName("li");
var tagDiv = choice.getElementsByTagName("div")[0];

var choiceObj = {};
	
// 初始化生成页面的选项内容
init();
function init()
{
	for(var i=0;i<crumbData.length;i++)
	{
		var newLi = document.createElement("li");
		var newSpan = document.createElement("span");
		
		newSpan.innerHTML = crumbData[i].title;
		newLi.appendChild(newSpan);
		
	    for(var j=0;j<crumbData[i].data.length;j++)
	    {
	    	var newA = document.createElement("a");
	    	newA.href = "javascript:;";
	    	newA.innerHTML = crumbData[i].data[j];
	    	newLi.appendChild(newA);
	    }
	    type.appendChild(newLi);
	}
};

// 点击的时候让对应的颜色变红，同一类只能有一个被选中，后面的条件选中时不能影响前面的
highLight();

function highLight()
{
	for(var i=0;i<lis.length;i++)
	{
	// 因为每一行的点击事件都不能影响其他行，只能在当前行起作用，所以要给每一个li加一个prev
        lis[i].index = i;
		lis[i].prev = null;
		var targetA = lis[i].getElementsByTagName("a");
		for(var j = 0;j<targetA.length;j++)
		{
			targetA[j].onclick = function()
			{
				var parent = this.parentNode;
				if(parent.prev)
				{
					parent.prev.style.color = "";
				}
				this.style.color = "red";
			// lis[i].prev里面存的是当前点击的a元素
				parent.prev = this;
				createTag(this);
			}
		}
	}

};

// 点击时创建标签让当前点击的元素出现在最上面的筛选条件中
   // 用一个对象存储当前点击的元素
   // 对象的key值就是当前点击元素的父级（li）的索引值，以便后面进行排序
   // 对象的value值就是当前点击元素的innerHTML


function createTag(targetA)
{
	var html = "";
//创建一个对象来存放每次点击的数值
   var parent = targetA.parentNode;
   choiceObj[parent.index] = targetA.innerHTML;
   // console.log(choiceObj);

// 第一行的品牌信息必须在前面，后面就按照列表顺序排序，
//  chooseObj是没有顺序的，for循环时按照顺序的，所以用for循环来生成元素
	  for(var i=0;i<lis.length;i++)
	  {
	  	if(choiceObj[i])
	  	{
	  		html += "<span>"+choiceObj[i]+"<a data-index = "+i+" href='javascript:;'>X</a></span>";
	  	}
	  }
	  tagDiv.innerHTML = html;

	  var closeA = choice.getElementsByTagName("a");
	  for(var j=0;j<closeA.length;j++)
	  {
	  	closeA[j].onclick = function()
	    {
		  	deleteTag(this);
		}
      }
};

// 点击删除标签时，不仅要删除当前标签，
// 还要把对象中的相应数据也删除点，字体高亮也要还原回原来的颜色

function deleteTag(tagA)
{
	tagA.parentNode.remove();
// 要删除储存数据的对象上的相应的值，首先要知道这个值对应的Key值，
// 而这里的key值就是li的索引值，所以在createTag()这个函数中创建a标签时就把a标签对应的
// 父元素li的索引值作为属性添加到a标签中，这里再来调用
	// console.log(tagA.dataset)

// 删除对象中的当前的点击删除的内容
	delete choiceObj[tagA.dataset.index];
	// console.log(choiceObj);
// 清除高亮,lis[i].prev存储的是当时点击时添加了颜色的值
    lis[tagA.dataset.index].prev.style.color = "";


}

	
	
	
};


