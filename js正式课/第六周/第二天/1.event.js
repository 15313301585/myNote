function down(e) {
    this.style.zIndex=100;
    e = e ||window.event;
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    //setCapture在IE下和火狐下存在
    if(this.setCapture){
        this.setCapture();
        this.onmousemove=move;
        this.onmouseup=up;
    }else{
        //利用事件委托原理
        var _this=this;

        this.MOVE=function (e) {
            move.call(_this,e)
        };
        this.UP=function (e) {
            up.call(_this,e)
        };

        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    selfRun.call(this,"selfDragend");
}
function move(e) {
    e=e||window.event;
    var changeX=e.pageX-this.mx;
    var changeY=e.pageY-this.my;
    this.style.left=this.x+changeX+"px";
    this.style.top=this.y+changeY+"px";
    //move方法执行好多次，move最后一次执行的位置减去上一次盒子的位置，这是单位时间内移动的距离，称作“速度”
    //   this.prevPosi=this.offsetLeft;
    selfRun.call(this,"selfDragging");

}


function up() {

    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove=null;
        this.onmouseup=null;
    }else{

        off(document,"mousemove",this.MOVE);
        off(document,"mousemove",this.UP);
    }
    this.style.zIndex=0;

    selfRun.call(this,"selfDragstart")
}



