/*
封装函数区，共有五个函数
buffer(obj, jason, fn):缓动动画
$(id):获取id变量
getCssStyle(obj, attr)：获得对象的样式属性的值
changeCssStyle(obj, attr, value)：改变对象的样式属性的值
scroll()：查看屏幕滚动
client()：查看屏幕宽高
*/

/**
           * 缓动动画封装（多值,只能用于有px的,opacity, scrollTop属性）
           * @param {object}obj:缓动的对象
           * @param {object}json：{'样式名':number,...}
           * @param {object}fn:回调函数，执行完缓动后立即执行的下一个函数
            */
function buffer(obj, jason, fn) {
    clearInterval(obj.timer);
    var begin = 0, speed = 0, end = 0;
    console.log(obj);
    
    obj.timer = setInterval(function () {
        var flag = true;
        //begin为取得的string类型，需要转为number
        for (var key in jason) {
            if (key == 'opacity') {
                begin = Math.round(parseFloat(getCssStyle(obj, key)) * 100) || 100;
                end = parseInt(jason[key] * 100);
            }
            else if (key == 'scrollTop') {
                begin = parseInt(obj.scrollTop) || 0;
                end = parseInt(jason[key]);
            }
            else if(key == 'zIndex'){
                obj.style.zIndex = jason[key];
            }
            else {
                begin = parseInt(getCssStyle(obj, key)) || 0;
                end = parseInt(jason[key]);
            }
            speed = (end - begin) * 0.1;
            //向左则向下取整，向右则向上取整
            speed = (end - begin) > 0 ? Math.ceil(speed) : Math.floor(speed);
            
            if (key == 'opacity') {
                //W3C浏览器
                obj.style.opacity = (begin + speed) / 100;
                //IE早期版本
                obj.style.filter = 'alpha(opacity:' + (begin + speed) + ')';
            }
            else if (key == 'scrollTop') {
                obj.scrollTop = begin + speed;
            }
            else {
                obj.style[key] = begin + speed + 'px';
            }

            if (begin !== end) {
                flag = false;
            }
        }
        if (flag == true) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 20);
}



//取得Id变量
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}

/**
* 获得对象属性的值，兼容性写法
* @param {object}obj:需要获得样式的对象
* @param {string}attr：获得的属性
 */
function getCssStyle(obj, attr) {
    if (obj.currentStyle) { // IE 和 opera
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

/**
* 改变对象的样式
* @param {object}obj:需要改变样式的对象
* @param {string}attr：改变的属性
* @param {string}value：改变的值
 */
function changeCssStyle(obj, attr, value) {
    obj.style[attr] = value;
}

/**
* 此函数可查看屏幕滚动大小，返回值是json 
* 调用时scroll().top
 */
function scroll() {
    return { //此函数的返回值是json 
        "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
        "left": window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    }
}

/**
* 此函数可查看屏幕宽高,返回值是json 
* 调用时client().top
 */
function client() {
    return {
        "width": window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        "height": window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}