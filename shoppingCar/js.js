window.onload = function(){
	var blueCheckboxes = document.querySelectorAll('.items-choose .blue-checkbox-new');
	var ups = document.querySelectorAll(".select .up");
	var downs = document.querySelectorAll(".select .down");
	var inputNum = document.querySelectorAll(".num input");
	var subTotal = document.querySelectorAll(".cart-top-items .subtotal");
	var price = document.querySelectorAll(".cart-top-items .price");
	var chooseAll = document.querySelector('.choose-all .blue-checkbox-new');
	var alltrue = false;

	var totalNum = document.querySelector(".shipping-num i");
	var totalPrice = document.querySelector(".shipping-price i");
	var calcBtn = document.querySelector(".big-main-btn");

	// 点击单选选中
	blueCheckboxes.forEach(item=>{
		item.isChecked = false;
		item.onclick = function(){

			// this.classList.toggle("checkbox-on");
			// 或者
			this.classList[this.isChecked?"remove":"add"]("checkbox-on");
			this.isChecked = !this.isChecked;
			isChoose();
			getTotalNum();
			getTotalMoney();
			setClass()
		}
	});

	for(let i =0;i<ups.length;i++)
	{
		// 初始化
		downs[i].classList[inputNum[i].value == 1?"add":"remove"]("down-disabled");
		ups[i].classList[inputNum[i].value == 10?"add":"remove"]("up-disabled");
		subTotal[i].innerHTML = "￥"+inputNum[i].value*price[i].innerHTML.slice(1);	

		// 数量++
		ups[i].onclick = function(){
			var value = inputNum[i].value;
			var num = Math.min(10,Number(value)+1);
			num == 10&&this.classList.add("up-disabled");
			downs[i].classList.remove("down-disabled");
			inputNum[i].value = num;
			subTotal[i].innerHTML = "￥"+inputNum[i].value*price[i].innerHTML.slice(1);
			getTotalNum();
			getTotalMoney();
		}
		// 数量--
		downs[i].onclick = function(){
			var value = inputNum[i].value;
			var num = Math.max(1,Number(value)-1);
			num == 1&&this.classList.add("down-disabled");
			ups[i].classList.remove("up-disabled");
			inputNum[i].value = num;
			subTotal[i].innerHTML = "￥"+inputNum[i].value*price[i].innerHTML.slice(1);
			getTotalNum();
			getTotalMoney();
		}
	}
	// 单选全选切换

	function isChoose(){
		var isCheck = [...blueCheckboxes].every(item=>item.isChecked);
		alltrue = isCheck;
		chooseAll.classList[isCheck?"add":"remove"]("checkbox-on");
	}

	// 点击全选
	chooseAll.onclick = function(){
		this.classList[alltrue?'remove':'add']('checkbox-on');
        blueCheckboxes.forEach(item =>{
            item.classList[!alltrue?'add':'remove']('checkbox-on')
            item.isChecked = !alltrue;
		})
		alltrue = !alltrue;
		getTotalNum();
		getTotalMoney();
		setClass();
	}

	//计算总件数

	function getTotalNum(){
		var allNum = 0;
		for(let i=0;i<inputNum.length;i++){
			if(blueCheckboxes[i].isChecked){
				allNum += parseInt(inputNum[i].value);
			}
		}
		totalNum.innerHTML = allNum;

	}
	function getTotalMoney(){
		var allMoney = 0;
		for(let i=0;i<subTotal.length;i++){
			var subTotalPrice = parseFloat(subTotal[i].innerHTML.slice(1));
			if(blueCheckboxes[i].isChecked){
				allMoney += subTotalPrice;
			}
		}
		totalPrice.innerHTML = allMoney;
	}

	function setClass(){
		var isCheck = [...blueCheckboxes].some(item=>item.isChecked);
		calcBtn.classList[isCheck?"remove":"add"]("disabled-btn");
	}

}