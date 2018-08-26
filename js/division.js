window.onload = function () {
    var titleLis = $('tab_container').children[0].children;
    var divisionBox = $('division_container').children;
    var humanity = $('humanity_panel').children;
    var landscape = $('landscape_panel').children;
    var japan = $('japan_panel').children;

    //点击选项卡切换
    for (var i = 0; i < titleLis.length; i++) {
        (function(i){
            titleLis[i].onclick = function(){
                for(j = 0;j<titleLis.length;j++){
                    titleLis[j].className = '';
                    divisionBox[j].style.display = 'none';
                }
                if(i == 1){
                    $('division').style.height = 1400 + 'px';
                    $('division_container').style.height = 1200 + 'px';
                }
                else{
                    $('division').style.height = 1100 + 'px';
                    $('division_container').style.height = 900 + 'px';
                }
                this.className = 'title_current';
                divisionBox[i].style.display = 'flex';
            }
        })(i);
    }

    //鼠标进入降下蒙版
    cover(humanity);
    cover(landscape);
    cover(japan);
}

//鼠标进入降下蒙版，离开后升起
function cover(obj){
    for(var k = 0;k<obj.length;k++){
        (function(k){
            obj[k].onmouseover = function(){
                buffer(this.children[0].children[1],{'top':0});
            }
            obj[k].onmouseout = function(){
                buffer(this.children[0].children[1],{'top':-280});
            }
        })(k);
    }
}