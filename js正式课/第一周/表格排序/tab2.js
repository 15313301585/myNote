//思路：1)获取所有要操作的对象
//2)拉取数据
//3）绑定数据（循环-》创建tr-》创建四个td-》td赋值-》放到tr中-》tr放到文档碎片中-》frg放进tbody中）
//4)隔行变色
//5)给表头th绑定点击事件，点击的时候执行sortList方法
//6）sortList方法（类数组转数组-》数组排序（数字和汉字的区分）-》重新添加到页面中）
var oTab=document.getElementById("tab");
var tHead=oTab.tHead;
var oThs=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;
var data=null;

var xhr=new XMLHttpRequest();
xhr.open("get","data.txt",false);
xhr.onreadystatechange = function () {
    if(xhr.readyState==4 && xhr.status == 200){
        data=utils.toJSONParse(xhr.responseText);
    }
};
xhr.send();
console.log(data);

function bindData() {
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var cur=data[i];
        var oTr=document.createElement("tr");
        for(var key in cur){
            var oTd=document.createElement("td");
            if(key=="sex"){
                if(cur[key]==1){
                    oTd.innerHTML="男";
                }else {
                    oTd.innerHTML="女";
                }
            }else {
                oTd.innerHTML=cur[key];
            }
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg=null;
}
bindData();

function changeBg() {
    for(var i=0;i<oRows.length;i++){
        i%2==1?oRows[i].className="bg":oRows[i].className="";
    }
}
changeBg();

function sortList(index) {
    var ary=utils.toArray(oRows);
    ary.sort(function (a,b) {
        if(index!=0){
            return parseFloat(a.cells[index].innerHTML-b.cells[index].innerHTML);
        }else{
            return a.cells[index].innerHTML.localeCompare(b.cells[index].innerHTML);
        }
    });

    if(this.flag=="ace"){
        ary.reverse();
        this.flag="bce";
    }else {
        this.flag="ace"
    }

   for(var i=0;i<ary.length;i++){
        tBody.appendChild(ary[i]);
   }

   changeBg();

}

for(var i=0;i<oThs.length-1;i++){
    oThs[i].index=i;
    oThs[i].onclick=function () {
        sortList.call(this,this.index);
    }
}