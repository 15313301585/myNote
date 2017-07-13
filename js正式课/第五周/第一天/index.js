var $outer=$("#outer");
var outer=$("#outer")[0];
var $swip=$("#swip");
var $oUl=$("#focus");
var $oImgs;
var maxlength;
//1.拉取数据
$.ajax({
    url:"data.json",//请求的地址
    type:"get", //请求类型
    async:false,
    success:function (data) { //请求成功后，执行function中的代码
        //console.log(data);
        bindData(data);
    }

});

//2.绑定数据,拼接

function bindData(data) {
   var imgStr="";
   var liStr="";
   $.each(data,function (index) {
      // console.log(data);
       var cur=data[index];
      // console.log(data[index]);
       imgStr+="<img data-src="+cur.img+">";//data-src 自定义属性
       liStr+="<li></li>";
   });
    $swip.html(imgStr);
    $oUl.html(liStr);
    $("ul li").eq(0).addClass("select");
    $oImgs=$("#outer img");//需要等img拼接到页面中，开始获取
    maxlength=$oImgs.last().index();
    delayImg();
}

//3.图片延迟加载
function delayImg() {
    $oImgs.each(function (index) {
        //this代表每一个img
        var that=$(this);
        var newImg=new Image; //原生创建的
        var trueSrc=$(this).attr("data-src");
        newImg.src=trueSrc;//attr 获取元素的自定义属性
        $(newImg).load(function () { //当newImg能够成功找到图片时，执行load中回调函数
            that.attr("src",trueSrc);
            index===0?that.fadeIn(300):that.fadeOut;
            newImg=null;
        })
    });

    outer.step=0;
    outer.timer=setInterval(autoMove,2000)
}

//4.实现渐隐渐现
function autoMove(n) {
    outer.step++;
    n!==undefined?outer.step=n:null;
    //当显示最后一张，下一次让outer.step变为0
    outer.step>maxlength?outer.step=0:null;
    $oImgs.eq(outer.step).stop().fadeIn(300).siblings().fadeOut();
    $("ul li").eq(outer.step).addClass("select").siblings().removeClass("select");
}

//5.滑入滑出
$outer.hover(function () {
    $(this).children("a").show();
    clearInterval(outer.timer);//滑入清除定时器

},function () {
    $(this).children("a").hide();
    outer.timer=setInterval(autoMove,2000);//重新设置定时器
});

//6.给每一个li绑定滑入滑出事件
$("ul li").each(function () {
    //console.log(this);
    $(this).mouseover(function () {
        autoMove($(this).index()) ;
    })
});

//7.左右切换
$("#right").click(function () {
    autoMove();
});

$("#left").click(function () {
    outer.step-=2;
    //当显示第一张的时候
    if(outer.step<-1){
        outer.step=maxlength-1;
    }
    autoMove();
});