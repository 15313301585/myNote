/**
 * Created by zhangkai on 2017/6/21.
 */
function getSpeed() {
    if(!this.prevPosi){
        this.prevPosi=this.offsetLeft;
    }else{
        this.speed=this.offsetLeft-this.prevPosi;
        this.prevPosi=this.offsetLeft;
    }
}


function clearTimer() {
    window.clearTimeout(this.timer);
    window.clearTimeout(this.droptimer);
    this.speed=null;
    this.dropSpeed=null;
}

function fly() {
    var maxRight = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth;
    if (this.offsetLeft + this.speed > maxRight) {
        this.style.left = maxRight + "px";
        this.speed *= -1;
    } else if(this.offsetLeft + this.speed <= 0) {
        this.style.left = 0+"px";
        this.speed *= -1;
    } else {
        this.style.left = this.offsetLeft + this.speed + "px";
    }

    this.speed *=0.97;

    if(Math.abs(this.speed)>=0.5){
        this.flytimer = setTimeout(handThis(this,fly),20)
    }
}

function drop() {

    if(!this.dropSpeed){
        this.dropSpeed=6;
        this.flag=0;
    }else {
        this.dropSpeed+=0.98;
    }
    this.dropSpeed*=0.97;
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    //盒子运动到页面的最低端
    if(this.offsetTop+this.dropSpeed>=maxBottom){
        //这里的代码连续走两次，说明当前盒子已经到底部不了
        this.dropSpeed*=-1;
        this.style.top=maxBottom+"px";
        this.flag++;
    }else {
        this.style.top=this.offsetTop+this.dropSpeed+"px";
        this.flag=0;
    }

    if(this.flag<2) {
        this.droptimer = setTimeout(handThis(this,drop),15);
    }
}


function handThis(obj,fn) {
    return function (e) {
        fn.call(obj, e)
    }
}
