var num = 0;
var times = 0;
var clickTimer = null;
var circulation = true;
var heightArr1 = [];
window.onload = function () {
    var masking = $('masking');
    var bigPic = $('big_pic');
    var toTop = $('to_top');
    containerHeight = autoCreateImg('waterfall');
    heightArr = wasserfall('waterfall', containerHeight);
    window.onscroll = function () {
        if (checkWilllLoadImage('waterfall')) {
            containerHeight = autoCreateImg('waterfall');
            if (circulation) {
                for (let i = 0; i < 3; i++) {
                    heightArr1.push(heightArr[i]); // 这个须在全局声明var heightArr1 = [];
                }
                circulation = false; //需要全局声明var circulation = true;
            }
            heightArr1 = wasserfall('waterfall', containerHeight, heightArr1, 20 + times);
            times += 20;//这个须在全局声明var times = 0;
        }
    }


    clickTimer = setInterval(function () {//需要设个间隔，不然开始没法读到新加载的
        for (var i = 0; i < $('waterfall').children.length; i++) {
            console.log(i);
            (function (i) {
                var picBox = $('waterfall').children[i].children[0];
                picBox.onclick = function (event) {
                    //阻止冒泡,否则被下面的document监听到会马上变成none
                    if (event && event.stopPropagation) {
                        event.stopPropagation();
                    } else {
                        window.event.cancelBubble = true;
                    }
                    $('big_pic').children[0].children[0].src = this.children[0].src;
                    masking.style.display = 'block';
                    masking.style.height = client().height + 'px';
                    masking.style.top = scroll().top + 'px';
                    console.log(getCssStyle(masking, 'top'));
                    bigPic.style.display = 'block';
                    bigPic.style.marginTop = parseInt(getCssStyle(bigPic, 'height')) * (-0.5) + scroll().top + 'px';
                    document.body.style.overflow = 'hidden';
                }
            })(i);
        }
    }, 1000);

    document.onclick = function (event) {
        var event = event || window.event;
        var clickTargetId = event.target.id ? event.target.id : event.srcElement.id;

        if (clickTargetId !== 'big_pic') {
            masking.style.display = 'none';
            bigPic.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    toTop.onclick = function () {
        buffer(document.body, { 'scrollTop': 0 }) || buffer(document.documentElement, { 'scrollTop': 0 });
    }
}

/**
 * 将网页中的图片进行瀑布流排布
 * @param{string}parent:用来排布瀑布流的总盒子的id
 * @param{number}i:前面已经加载的数量
 * @return{string}containerHeight:返回产生的图片的高度
 */
function autoCreateImg(parent) {
    var json = [
        { 'imgName': 'DSC_1539.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_1547.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_1579.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_1597.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_1598.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_1648.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_1714.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_2137_2.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_2544.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_2631.jpg', 'width': 800, 'height': 1200 },
        { 'imgName': 'DSC_3362.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_3386.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3483_1.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3504.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3565.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_3583.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3585.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_3591_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_3602.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_3613_1.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_3626.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_3651.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3680_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_3693.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3745.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3782.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3921.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_3994.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_4004 - 副本.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_4130_2.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_4687_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_4713.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_4747.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_4812.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_4831_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_4853.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_4908.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_4939_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_4978.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5012.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5017.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5169_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5199.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5230.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5231.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5232.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5245.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_5304.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_5316.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5346.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5355.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_5361.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5381.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5390.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5421.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5438.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_5443.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5460_1.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_5752.jpg', 'width': 800, 'height': 1198 },
        { 'imgName': 'DSC_5787_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5911.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5942.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5987.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_5988_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6035.jpg', 'width': 800, 'height': 1200 },
        { 'imgName': 'DSC_6198.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6413.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6437.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6442_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6545.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6563.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6584.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6615.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6692.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_6694.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_6698.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6699.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6708.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6709.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_6718_4.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6726.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6736.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6744.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6749.jpg', 'width': 800, 'height': 1200 },
        { 'imgName': 'DSC_6769.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6794.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6836_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6841_1.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6844.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6849.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_6862_1.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_7238.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_7869_1.jpg', 'width': 800, 'height': 534 },
        { 'imgName': 'DSC_8022.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_8028.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_8139_3.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_8153.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_8281.jpg', 'width': 800, 'height': 800 },
        { 'imgName': 'DSC_9494-编辑-2.jpg', 'width': 800, 'height': 1198 },
        { 'imgName': 'DSC_9513.jpg', 'width': 800, 'height': 533 },
        { 'imgName': 'DSC_9574.jpg', 'width': 800, 'height': 533 },
        { 'imgName': '年保玉则_倒影1.jpg', 'width': 800, 'height': 534 },

    ];
    var picAddr;
    var htmlStr;
    var str = $(parent).innerHTML;
    var containerHeight = [];
    //num = num || 0;
    for (var i = 0 + num; i < 20 + num; i++) {
        picAddr = json[i % 102].imgName;

        var originWidth = json[i % 102].width;
        var originheight = json[i % 102].height;
        htmlStr =
            '<div class="pic_container">' +
            '<div class="pic_box">' +
            '<img src="images/waterfall/' + picAddr + '">' +
            ' </div>' +
            '</div>';
        str += htmlStr;
        $(parent).innerHTML = str;
        // console.log($(parent).children[0]);
        img = $(parent).children[i].children[0].children[0];
        var height = Math.round((parseInt(getCssStyle(img, 'width')) / originWidth) * originheight) + 'px';
        containerHeight.push(parseInt(height) + 52);
        changeCssStyle(img, 'height', height);
    };
    num += 20; //这个需在全局声明var num = 0;
    return containerHeight;
}

/**
 * 将网页中的图片进行瀑布流排布
 * @param{string}parent:用来排布瀑布流的总盒子的id
 * @param{object}containerHeight:用于排布的各个子盒子的高度
 * @param{object}heightArr:上一个瀑布流函数排布完后的高度数组
 * @return{object}i:前面已经有的盒子的个数
 */
function wasserfall(parent, containerHeight, heightArr, i) {
    var allBox = $(parent).children;
    var heightArr1 = [];
    i = i || 0;
    if (i > 0) {
        for (let i = 0; i < 3; i++) {
            heightArr1.push(heightArr[i]);
        }
        heightArr = heightArr1;
    }
    var boxWidth = allBox[0].offsetWidth;
    var waterFallWidth = parseInt(getCssStyle($(parent), 'width'));
    var cols = parseInt(waterFallWidth / boxWidth);
    heightArr = heightArr || [];
    var boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;


    for (var i = i || 0; i < allBox.length; i++) {
        (function (i) {
            boxHeight = containerHeight[i % 20];
            //console.log(i, boxHeight);
            if (i < cols) {//第一行
                heightArr.push(boxHeight);
                allBox[i].style.position = 'absolute';
                allBox[i].style.left = i * boxWidth + 'px';
                allBox[i].style.top = 0 + 'px';
            }
            else {
                //取出最矮的盒子高度
                minBoxHeight = _.min(heightArr);

                minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);

                //子盒子定位
                allBox[i].style.position = "absolute";
                allBox[i].style.left = minBoxIndex * boxWidth + 'px';
                allBox[i].style.top = minBoxHeight + 'px';
                heightArr[minBoxIndex] += boxHeight;

            }
        })(i);
    }

    //将高度最大的一个作为parentHeight
    var parentHeight = _.max(heightArr);
    $(parent).style.height = parentHeight + 'px';
    return heightArr;
}

function getMinBoxIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    };
}

/**
 * 判断屏幕向下滚动时是否继续加载瀑布流
 * @param{string}parent:用来排布瀑布流的总盒子的id
 * @return{boolean}:是否达到条件
 */
function checkWilllLoadImage(parent) {

    var allPicContainer = $(parent).children;
    //滚到最后一个盒子自身高度一半后开始加载


    var screenH = client().height;
    var scrollTop = scroll().top;
    var lastPicContainerDis = document.body.scrollHeight - 100;

    return lastPicContainerDis <= screenH + scrollTop;
}