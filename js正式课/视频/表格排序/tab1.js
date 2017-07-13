/**
 * Created by zhangkai on 2017/5/27.
 */
var oTab=document.getElementById("tab");
var tHead=oTab.tHead;
var oThs=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;

//->1.首先获取后台（data.txt）中的数据“JSON格式的字符串”
//1)首先创建一个Ajax对象
var xhr = new XMLHttpRequest();

//2)打开我们需要请求的那个文件地址
xhr.open("get","data.txt",false);
//3)监听请求状态
xhr.onreadystatechange=function () {
    if (xhr.readyState == 4 && xhr.status == 200) { //readyState状态
         data = utils.JsonParse(xhr.responseText);//请求返回
    }
};
//4)发送请求
xhr.send();

//->2.实现数据绑定

function bind() {
    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var cur=data[i];
        var oTr=document.createElement("tr");
        for(var key in cur){
            var oTd=document.createElement("td");
            if(key=="sex"){
                if(cur[key]==1){
                    oTd.innerHTML="男";
                }else{
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
bind();
//->3.实现隔行变色

function changeBg() {
    for(var i=0;i<oRows.length;i++){
        i%2==1?oRows[i].className="bg":oRows[i].className=""
    }
}
changeBg();

//->4.编写表格排序的方法

function sort(index) {
    var ary=utils.listToArray(oRows);
    ary.sort(function (a,b) {
        if(index!==0){
            return parseFloat(a.cells[index].innerHTML)-parseFloat(b.cells[index].innerHTML);
        }else{
            return a.cells[index].innerHTML.localeCompare(b.cells[index].innerHTML);
        }
    });

    if(this.flag=="asc"){
        ary.reverse();
        this.flag="desc"
    }else {
        this.flag="asc"
    }

    for(var i=0;i<ary.length;i++){
        tBody.appendChild(ary[i]);
    }

    changeBg();

}


for(var i=0;i<oThs.length-1;i++){
    oThs[i].index=i;
    oThs[i].onclick=function () {
       sort.call(this,this.index);
    }
}