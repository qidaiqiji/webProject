window.onload = function(){
// ---------------------轮播图---------------------
	let slideImgsBox = document.querySelector("#slider");
	let slideImgs = slideImgsBox.querySelectorAll("img");
	let slideLeft = slideImgsBox.querySelector(".left");
	let slideRight = slideImgsBox.querySelector(".right");
	let num = 0;
	let num2 = 0;
	var timer = null;
	
	slideInit();
	autoSlide();

	slideLeft.onclick = function(){
		num--;
		if(num < 0){
			num = slideImgs.length - 1;
		}
		slideInit();
	}
	slideRight.onclick = function(){
		num++;
		if(num == slideImgs.length){
			num = 0;
		}
		slideInit();
	}
	function slideInit(){
		for(var i=0;i<slideImgs.length;i++){
			slideImgs[i].style.opacity = 0;
		}
		slideImgs[num].style.opacity = 1;
	}
	function autoSlide(){
		timer = setInterval(function(){
			num++;
			if(num == slideImgs.length){
				num = 0;
			}
			slideInit();
		},4000)
	}

	slideImgsBox.onmouseover = function(){
		clearInterval(timer);
	}
	slideImgsBox.onmouseout = function(){
		autoSlide();
	}
/*-------------------------产品信息选项卡-----------------------------*/

let productsBox = document.querySelector("#products-box");
let productsList = productsBox.querySelectorAll("li");

let detailContent = document.querySelectorAll("#product-details .detail-content");


productInit();
function productInit(){
	for(let i=0;i<productsList.length;i++){
		productsList[i].querySelector(".imgBox").style.borderColor = "";
		productsList[i].querySelector(".desc").style.color = "";
		productsList[i].querySelector(".cover").style.background = "";
		productsList[i].querySelector(".triangle").style.display = "none";
		detailContent[i].style.display = "none";
	}
	productsList[num2].querySelector(".imgBox").style.borderColor = "rgb(255,144,0)";
	productsList[num2].querySelector(".desc").style.color = "rgb(255,144,0)";
	productsList[num2].querySelector(".cover").style.background = "rgba(255,255,255,0)";
	productsList[num2].querySelector(".triangle").style.display = "block";
	detailContent[num2].style.display = "block";
	
	}
	productsList.forEach((item,index)=>{
		item.onmouseover = function(){
			num2 = index;
			productInit();
		}

	})







}
