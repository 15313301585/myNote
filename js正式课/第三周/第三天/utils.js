var utils= {
    toJSON  : function (str) {
        return "JSON" in window ?JSON.parse(str) : eval("("+str+")");
    },
    listToArray : function (likeAry) {
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry)
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    offset : function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p.tagName.toLowerCase() !== "body"){
            if(navigator.userAgent.indexOf("MSIE 8.0") === -1){
                l+= p.clientLeft;
                t+= p.clientTop;
            }
            l+= p.offsetLeft;
            t+= p.offsetTop;
            p = p.offsetParent;
        }
        return {left :l,top:t};
    },
    getCss : function getCss(curEle,attr) {
        var val = null;
        var reg = null;
        if("getComputedStyle" in window){
            val = window.getComputedStyle(curEle)[attr];//
        }else{
            if(attr==="opacity"){
                val = curEle.currentStyle["filter"];//alpha(opacity=50)
                reg =/^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
//                console.log(reg.exec(val))
                var temp = reg.exec(val)[1];
                val = temp ? temp/100 : 1;
                val = parseFloat(val);
            }else{
                val = curEle.currentStyle[attr];
            }
        };
        // val  : 颜色 数字 数字+单位
        //val = isNaN(parseFloat(val)) ? val : parseFloat(val);
        var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
        val = reg1.test(val) ? parseFloat(val) : val;
        return val;
    },
    win : function win(attr,value) {
        if(value === undefined){
            return document.documentElement[attr] || document.body[attr];
        };
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    setCss:function setCss(curEle,attr,value) {
        if(attr==="opacity"){
            curEle.style["opacity"]=value;
            curEle.style["filter"]="alpha(opacity="+value*100+")";
        };
        if(attr==="float"){
            curEle.style["cssFloat"]=value;
            curEle.style["styleFloat"]=value;
        }
        var reg=/^width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?)$/;
        if(reg.test(attr)){
          if(!isNaN(value)){
                value+="px"
            }
        }
        curEle.style[attr]=value;
    }
};
