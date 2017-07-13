/**
 * Created by zhangkai on 2017/6/25.
 */

function on(curEle,eventType,eventFn) {
    if(/^self/.test(eventType)){
        if(!curEle["self"+eventType]){
            curEle["self"+eventType]=[];
        }
        var ary=curEle["self"+eventType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===eventFn){
                return;
            }
        }
        ary.push(eventFn);
        return;
    }
    if(curEle.addEventListener){
        curEle.addEventListener(eventType,eventFn,false);
        return;
    }

    if(!curEle["myBind"+eventType]){
        curEle["myBind"+eventType]=[];
        curEle.attachEvent("on"+eventType,function () {
            run.call(curEle);
        })
    }
    var ary=curEle["myBind"+eventType];
    for (var i=0;i<ary.length;i++){
        if(ary[i]===eventFn){
            return;
        }
    }
    ary.push(eventFn);
}

//run:是我们唯一一个给当前元素的某个行为在内置事件池中绑定的方法，当行为触发，执行run方法，在run中我们分别把存储在自己容器中的所有方法依次执行
function run(e) {
    e=window.event;
    e.target=e.srcElement;
    e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
    e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
    e.preventDefault=function () {
        e.returnValue=false;
    };
    e.stopPropagation=function () {
        e.cancelBubble=true;
    };
    var ary=this["myBind"+e.type];
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){
            ary[i].call(this,e);//因为内置的事件池中绑定的方法执行的时候，this都是当前要操作的元素，并且浏览器还会给其传递一个事件对象，而我自己创建的容器中存储的所有的方法其实都相当于是给当前的元素绑定的事件，为了和内置的统一，我们也让其执行的时候this变为当前的元素，并且也给她传递一个事件对象
        }else {
            ary.splice(i,1);
            i--;
        }
    }
}

function selfRun(selfType) {
    var ary=this["self"+selfType];
    for(var i=0;i<ary.length;i++){
        ary[i].call(this);
    }
}


function off(curEle,eventType,eventFn) {
    if(curEle.removeEventListener){
        curEle.removeEventListener("eventType",eventFn,false);
        return;
    }
    var ary= curEle["myBind"+eventType];
    for (var i=0;i<ary.length;i++){
        if(ary[i]===eventFn){
            ary[i]=null;
            break;
        }
    }

}

function getSpeed() {
    if(!this.prevPosi){
        this.prevPosi=this.offsetLeft;
    }else {
        this.speed=this.offsetLeft-this.prevPosi;
        this.prevPosi=this.offsetLeft;
    }
}

function fly() {
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    if(this.offsetLeft+this.speed>maxRight){
        this.style.left=maxRight+"px";
        this.speed*=-1;
    }else if(this.offsetLeft+this.speed<=0){
        this.style.left=0+"px";
        this.speed*=-1;
    }else {
        this.style.left=this.offsetLeft+this.speed+"px";
    }
    this.speed*=0.97;
    var _this=this;
    if(Math.abs(this.speed)>=0.5){
        this.flytimer=setTimeout(function () {
            fly.call(_this);
        },20)
    }

}

function drop() {
    if(!this.dropSpeed){
        this.dropSpeed=9.8;
        this.flag=0;
    }else {
        this.speed+=9.8;
    }

    this.dropSpeed*=0.97;
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(this.offsetTop+this.dropSpeed>=maxBottom){
        this.dropSpeed*=-1;
        this.style.top=maxBottom+"px";
        this.flag++;
    }else {
        this.style.left=this.offsetTop+this.dropSpeed+"px";
        this.flag=0;
    }
    var _this=this;
    if(this.flag<2){
        this.droptimer=setTimeout(function () {
            drop.call(_this);
        },20)
    }

}


function handThis(obj,fn) {
    return function (e) {
        fn.call(obj,e);
    }
}




