window.onload = function () {
    //需求：鼠标放到小盒子上，让大盒子里面的图片和我们同步等比例移动。
    //技术点：onmouseenter==onmouseover 第一个不冒泡
    //技术点：onmouseleave==onmouseout  第一个不冒泡
    //步骤：
    //1.鼠标放上去显示盒子，移开隐藏盒子。
    //2.老三步和新五步（黄盒子跟随移动）
    //3.右侧的大图片，等比例移动。

    //0.获取相关元素
    var box = document.getElementsByClassName("box")[0];
    var small = box.firstElementChild || box.firstChild;
    var big = box.children[1];
    var mask = small.children[1];
    var bigImg = big.children[0];

    //1.鼠标放上去显示盒子，移开隐藏盒子。(为小盒子绑定事件)
    small.onmouseenter = function () {
        //封装好方法调用：显示元素
        show(mask);
        show(big);
    }
    small.onmouseleave = function () {
        //封装好方法调用：隐藏元素
        hide(mask);
        hide(big);
    }

    //2.老三步和新五步（黄盒子跟随移动）
    //绑定的事件是onmousemove，而事件源是small(只要在小盒子上移动1像素，黄盒子也要跟随)
    small.onmousemove = function (event) {
        //想移动黄盒子，必须知道鼠标在small中的位置。x作为mask的left值，y作mask的top值。
        //新五步
        event = event || window.event;
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;
        //让鼠标在黄盒子最中间，减去黄盒子宽高的一半
        var x = pagex - box.offsetLeft - mask.offsetWidth/2;
        var y = pagey - box.offsetTop - mask.offsetHeight/2;
        //限制换盒子的范围
        //left取值为大于0，小盒子的宽-mask的宽。
        if(x<0){
            x = 0;
        }
        if(x>small.offsetWidth-mask.offsetWidth){
            x = small.offsetWidth-mask.offsetWidth;
        }
        //top同理。
        if(y<0){
            y = 0;
        }
        if(y>small.offsetHeight-mask.offsetHeight){
            y = small.offsetHeight-mask.offsetHeight;
        }
        //移动黄盒子
        console.log(small.offsetHeight);
        mask.style.left = x + "px";
        mask.style.top = y + "px";

        //3.右侧的大图片，等比例移动。
        //如何移动大图片？等比例移动。
        //    大图片/大盒子 = 小图片/mask盒子
        //    大图片走的距离/mask走的距离 = （大图片-大盒子）/（小图片-黄盒子）
        // var bili = (bigImg.offsetWidth-big.offsetWidth)/(small.offsetWidth-mask.offsetWidth);

        //大图片走的距离/mask盒子都的距离 = 大图片/小图片
        var bili = bigImg.offsetWidth/small.offsetWidth;

        var xx = bili*x;
        var yy = bili*y;

        bigImg.style.marginTop = -yy+"px";
        bigImg.style.marginLeft = -xx+"px";
    }
}