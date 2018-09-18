let createFlie = document.querySelector('#createFlie');
let box = document.querySelector('#box');

let selectAll = document.querySelector('#selectAll');

let input = box.querySelector('input');
let html = "";
createFlie.onclick = function()
{
	html += `
	    <div>
			<img src="img/folder-b.png">
			<p>新建文件夹</p>
			<label>
				<input type="checkbox" name="">
				<span></span>
			</label>
		</div>
	`;
    box.innerHTML = html;
    let files = box.querySelectorAll("div");
    
    for(var i=0;i<files.length;i++)
    {
    	files[i].onmouseover = function()
    	{
    		let selected = this.querySelector('span');
    		this.style.cssText = "border:1px solid #000;background:#fff";
    		selected.style.display = "block";

    	}
    	files[i].onmouseout = function()
    	{
    		show(this);

    	}
    }

    //每个选框选中的事件
    let inputs = box.querySelectorAll("input");
    console.log(inputs.length);
    let n = 0;
    for(var j=0;j<inputs.length;j++)
    {
    	inputs[j].onclick = function()
    	{
    		if(this.checked)
	    	{
	    		n++;
	    	}
	    	if(n == inputs.length)
	    	{
	    		selectAll.checked = true;
	    	}
	    	if(!this.checked)
	    	{
	    		selectAll.checked = false;
	    	}
    	}
    }

    selectAll.onclick = function()
    {
    	for(var i=0;i<inputs.length;i++)
    	{
    		inputs[i].checked = this.checked;
    	}
    }
}

function show(obj)
{
	let selected = obj.querySelector('span');
	obj.style.border = "";
	obj.style.background = "";
	selected.style.display = "none";
}


