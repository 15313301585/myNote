/**
 * Created by zhangkai on 2017/6/25.
 */
function EventEmitter(){};
EventEmitter.prototype.on=function(type,fn){
    if(!this["emitter"+type]){
        this["emitter"+type]=[];
    }
    var a=this["emitter"+type];
    for(var i=0;i<a.length;i++){
        if(a[i]==fn)return this;
    }
    a.push(fn);
    return this;
};
EventEmitter.prototype.run=function(type,e){
    var a=this["emitter"+type];
    if(a){
        for(var i=0;i<a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }

    }

}
EventEmitter.prototype.off=function(type,fn){
    var a=this["emitter"+type];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            if(a[i]==fn){
                a[i]=null;
                break;
            }
        }
    }
    return this
};

function Drag(ele){
    this.x=null;
    this.y=null;
    this.mx=null;
    this.my=null;
    this.ele=ele;
    this.DOWN=handThis(this,this.down);
    this.MOVE=handThis(this,this.move);
    this.UP=handThis(this,this.up);
    on(this.ele,"mousedown",this.DOWN);
}
Drag.prototype=new EventEmitter;

Drag.prototype.down=function(e){
    this.x=this.ele.offsetLeft;
    this.y=this.ele.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup",this.UP);
    }else{
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    this.run("abcd1",e);
};

Drag.prototype.move=function(e){
    this.ele.style.left=e.pageX-this.mx+this.x+"px";
    this.ele.style.top=e.pageY-this.my+this.y+"px";
    this.run("abcd2",e);
};

Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.UP);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    this.run("abcd3",e);
};
function handThis(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}

Drag.prototype.addRange=function (oRange) {//这个是负责传参数和绑定
    this.oRange=oRange;
    this.on("abcd2",this.range);
};

Drag.prototype.range=function (e) { //这个是负责实现功能的方法
    var l=e.pageX-this.mx+this.x;
    var t=e.pageY-this.my+this.y;
    var obj=this.oRange;
    if(l>=obj.right){
        this.ele.style.left=obj.right+"px";
    }else if(l<=obj.left){
        this.ele.style.left=obj.left+"px";
    }else {
        this.ele.style.left=l+"px";
    }
    if(t>=obj.bottom){
        this.ele.style.top=obj.bottom+"px";
    }else if(t<=obj.top){
        this.ele.style.top=obj.top+"px";
    }else {
        this.ele.style.top=t+"px";
    }
};

Drag.prototype.border=function () {
   this.on("abcd1",this.addBorder);
   this.on("abcd3",this.removeBorder);

};
Drag.prototype.addBorder=function () {
    this.ele.style.border="2px gray dashed";
};
Drag.prototype.removeBorder=function () {
    this.ele.style.border="none";
};