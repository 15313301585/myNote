var utils = {
    //->listToArray:实现将类数组转换为数组
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //->JsonParse:把JSON格式的字符串转换为JSON格式的对象
    toJSONParse: function (str) {
//            var val=null;
//            try{
//                val=JSON.parse(str);
//            }catch (e){
//                val=eval("("+str+")");
//            }
//            return val;
//        }
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },

    offset: function (curEle) {
        var totalLeft = null, totalTop = null, par = curEle.offsetParent;
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {//不是标准的IE8浏览器，我们才进行累加边框
                //累加父级参照物的边框
                totalLeft += par.clientLeft;
                totalTop += par.clientTop;
            }
            //累加父级参照物本身的偏移
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop;

            par = par.offsetParent;
        }
        return {left: totalLeft, top: totalTop};
    },

    win: function (attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },

    //获取元素的某一个具体的样式属性值
    getCss:function (curEle,attr) {
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
    }
    // val  : 颜色 数字 数字+单位
    //val = isNaN(parseFloat(val)) ? val : parseFloat(val);
    var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
    val = reg1.test(val) ? parseFloat(val) : val;// parseFloat  去掉单位
    return val;
},

    //setCss:给当前元素的某一个样式属性设置值（都是增加在行内样式上的）
    setCss:function (curEle,attr,value) {
        if(attr==="opacity"){
            curEle.style["opacity"]=value;
            curEle.style["filter"]="alpha(opacity="+value*100+")";
            return;
        }
        if(attr==="float"){
            curEle.style["cssFloat"]=value;
            curEle.style["styleFloat"]=value;
            return;
        }
        //对于某些样式属性，如果传进来的值没有加单位，我们需要把单位默认的补上，这样的话，这个方法就会人性化一些
        var reg = /^width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?)$/;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value+="px"
            }
        }
        curEle.style[attr]=value;
    },


    setGroupCss: function (curEle, options) {

        for (var attr in options) {
          utils.setCss(curEle, attr, options[attr])
        }
    },

//setGroupCss(oDiv,{width:100,height:200,opacity:0.5,margin:"50px auto"})
    css: function () {
        var len = arguments.length, curEle = arguments[0], attr = null, value = null, options = null;
        if (len === 3) {
            attr = arguments[1];
            value = arguments[2];
            utils.setCss(curEle, attr, value);
            return;
        }

        if (len === 2 && typeof arguments[1] === "object") {
            options = arguments[1];
            utils.setGroupCss(curEle, options);
            return;
        }
        attr = arguments[1];
        return utils.getCss(curEle, attr);
    }

    // css(oDiv,{width:100,height:200,opacity:0.5});
    // css(oDiv,"width","300px");
    // css(oDiv,"width");



};
