
    //tHead=oTab.tHead; 获取表头
    // rows：获取行
    // cells：获取表格中某一行的列
    //tBodies[0]:获取表格中的第一个tBody

    var oTab = document.getElementById("tab");
    var tHead = oTab.tHead; //获取表头     rows：获取行  cells：获取表格中的列
    var oThs = tHead.rows[0].cells;
    var tBody = oTab.tBodies[0];
    var rows = tBody.rows; //获取tBody中的所有行
    var data = null;

    //获取数据 ajax  async Javascript and xml

    //1.创建一个ajax的对象
    var xhr = new XMLHttpRequest();
    //2.打开文件
    xhr.open("get", "data.txt", false);
    //3.监听
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = utils.toJSON(xhr.responseText);
        }
    };

    //4.发送请求
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

  bindData();
    function changeBg() {
        for(var i=0;i<rows.length;i++){
            i%2==0? rows[i].className="even":rows[i].className=null;
        }
    }
    changeBg();

  //通过点击列的索引进行排序
  function sortList(index) {
      var ary=utils.toArray(rows);
      ary.sort(function (a,b) {
          if(index!==0){
              var cur=parseFloat(a.cells[index].innerHTML) ;
              var nextCur=parseFloat(b.cells[index].innerHTML);
              return cur-nextCur;
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


  //给表头绑定点击排序事件
  for(var i=0;i<oThs.length;i++){
      oThs[i].index=i;
      oThs[i].onclick=function () {
          sortList.call(this,this.index);
      }
  }