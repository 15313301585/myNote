/**
 * Created by zhangkai on 2017/6/25.
 */
function getSpeed(e) {
    if(!this.prevPosi){
        this.prevPosi=this.offsetLeft;
    }else {
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


function drop(){
    if(!this.dropSpeed){
        this.dropSpeed=9.8;
        this.flag=0;
    }else{
        this.dropSpeed+=9.8;
    }
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
    if(this.dropSpeed+this.ele.offsetTop>maxBottom){
        this.ele.style.top=maxBottom+"px";
        this.flag++;
        this.dropSpeed*=-1;
    }else{
        this.ele.style.top=this.dropSpeed+this.ele.offsetTop+"px";
        this.flag=0;
    }
    this.dropSpeed*=0.98;
    if(this.flag<2){
        this.dropTimer=setTimeout(handThis(this,drop),15);
    }


}

function fly() {
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;
    if(this.ele.offsetLeft+this.speed>maxRight){
        this.style.left=maxRight+"px";
        this.speed*=-1;
    }else if(this.ele.offsetLeft+this.speed<=0){
        this.ele.style.left=0+"px";
        this.speed*=-1;
    }else {
        this.style.left=this.ele.offsetLeft+this.speed+"px";
    }
    this.speed*=0.97;
    var _this=this;
    if(Math.abs(this.speed)>=0.5){
        this.flytimer=setTimeout(function () {
            fly.call(_this);
        },20)
    }

}