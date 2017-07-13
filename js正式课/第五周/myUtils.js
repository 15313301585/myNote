var utils = function(){
    //->listToArray:实现将类数组转换为数组
    function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    //->JsonParse:把JSON格式的字符串转换为JSON格式的对象
    function toJSONParse(str) {
//            var val=null;
//            try{
//                val=JSON.parse(str);
//            }catch (e){
//                val=eval("("+str+")");
//            }
//            return val;
//        }
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    function offset(curEle) {
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
    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //获取元素的某一个具体的样式属性值
    function getCss(curEle, attr) {
        var val = null;
        var reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle)[attr];//
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];//alpha(opacity=50)
                reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
//                console.log(reg.exec(val))
                var temp = reg.exec(val)[1];
                val = temp ? temp / 100 : 1;
                val = parseFloat(val);
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        // val  : 颜色 数字 数字+单位
        //val = isNaN(parseFloat(val)) ? val : parseFloat(val);
        var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
        val = reg1.test(val) ? parseFloat(val) : val;// parseFloat  去掉单位
        return val;
    }

    //setCss:给当前元素的某一个样式属性设置值（都是增加在行内样式上的）
    function setCss(curEle, attr, value) {
        if (attr === "opacity") {
            curEle.style["opacity"] = value;
            curEle.style["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        if (attr === "float") {
            curEle.style["cssFloat"] = value;
            curEle.style["styleFloat"] = value;
            return;
        }
        //对于某些样式属性，如果传进来的值没有加单位，我们需要把单位默认的补上，这样的话，这个方法就会人性化一些
        var reg = /^(width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px"
            }
        }
        curEle.style[attr] = value;
    }


    function setGroupCss(curEle, options) {

        for (var attr in options) {
            utils.setCss(curEle, attr, options[attr])
        }
    }

//setGroupCss(oDiv,{width:100,height:200,opacity:0.5,margin:"50px auto"})
    function css() {
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
    //获取当前元素所在兄弟节点中的索引
    function getIndex(curEle) {
        var index=0;
        var p=curEle.previousSibling;
        while (p){
            if(p.nodeType==1){
                index++;
            }

            p=p.previousSibling;
        }
        return index;
    }
    //获取所有的兄弟元素节点
    function siblings(curEle) {
        var nodes = curEle.parentNode.childNodes;
        var ary = [];
        for (var i = 0; i < nodes.length; i++) {
            var curNode = nodes[i];
            if (curNode !== curEle && curNode.nodeType === 1) {
                ary.push(curNode);
            }
        }
        return ary;
    }
    //获取当前元素所有的哥哥元素节点
    function prevSilings(curEle) {
        var p=curEle.previousSibling;
        var ary=[];
        while (p){
            if(p.nodeType===1){
                ary.unshift(p);
            }
            p=p.previousSibling;
        }
        return ary;
    }
    //获取所有的弟弟元素
    function  nextSiblings(curEle) {
        var n=curEle.nextElementSibling;
        var ary=[];
        while (n){
            if(n.nodeType===1){
                ary.unshift(n);
            }
            n=n.nextSibling;
        }
        return ary;
    }
    //获取当前元素的上一个哥哥节点
    function prev(curEle) {
        var p=curEle.previousSibling;
        while (p){
            if(p.nodeType===1){
                return p;
            }
            p=p.previousSibling;
        }
    }
    //获取当前元素的弟弟元素节点
    function next(curEle) {
        var n = curEle.nextSibling;
        while (n){
            if(n.nodeType==1){
                return n
            }
            n = n.nextSibling;
        }
    }
    //获取当期元素的元素子节点
    //children 在IE6-8下不兼容
    //children在非标准浏览器下包括文本节点

    function children(curEle) {
        var chileren=curEle.children;
        if(typeof curEle.nextElementSibling!=="object"){//判断非标准浏览器
            var ary=[];
            for(var i=0;i<children.length;i++){
                var curChild=children[i];
                if(curChild.nodeType===1){
                    ary.push(curChild);
                }
            }
            return ary;
        }
        return children;
    }
    //1.参数cName：类名   context：上下文，指的查找的范围
    function getByClass(cName,context) {
        //在context这个上下文环境中获取class是cName的元素
        //如果这个context不传，默认获取document下的元素
//       if(context==undefined){
//           context=document;
//       }
        context=context||document;
        //在标准浏览器下
        if(context.getElementsByClassName){//在IE6~8下不存在getElementsByClassName
            return context.getElementsByClassName(cName);
        }
        //在IE6-8浏览器中，不兼容的情况下
        var ary=[];
        var nodes=context.getElementsByTagName("*");//把当前范围内的所有的元素对象获取到
        for(var i=0;i<nodes.length;i++){
            //获取当前循环的元素对象
            var curNode=nodes[i];
            var curClass=curNode.className;
            var reg=new RegExp("(^|\\s+)"+cName+"(\\s+|$)");
            if(reg.test(curClass)){
                ary.push(curNode);
            }
        }
        return ary;
    }
    //hasClass:是否有某个类名，有返回true，没有返回false
    function hasClass(curEle,cName) {
        var curEleClass=curEle.className;
        var reg=new RegExp("(^|\\s+)"+cName+"(\\s+|$)");
        return reg.test(curEleClass);
    }
    function addClass(curEle,cName) {
        var reg=new RegExp("^ +| +$","g");//去掉首尾空格的正则
        cName=cName.replace(reg,"");//用空去替换首尾空格
        var ary=cName.split(/ +/g);
        for(var i=0;i<ary.length;i++){
            if(!hasClass(curEle,ary[i])){
                curEle.className+=" "+ary[i];
            }
        }
    }
    function removeClass(curEle,cName) {
        var reg=new RegExp("^ +| +$","g");//捕获首尾空格的正则
        cName=cName.replace(reg,""); //去掉首尾空格
        var ary=cName.split(/ +/g);//把传进来的参数，用空格分割成数组的每一项
        for(var i=0;i<ary.length;i++){ //循环传经来的每一个类名
            var curName=ary[i];//获取每一个类名
            if(hasClass(curEle,curName)){//判断当前元素是否含有某个类名
                var reg1=new RegExp("(^|\\s+)"+curName+"(\\s+|$)");
                curEle.className=curEle.className.replace(reg1," ");
            }
        }
    }

    return {
        listToArray:listToArray,
        toJSONParse:toJSONParse,
        offset:offset,
        win:win,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        getIndex:getIndex,
        siblings:siblings,
        prevSilings:prevSilings,
        nextSiblings:nextSiblings,
        prev:prev,
        next:next,
        children:children,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass
    }
}();





