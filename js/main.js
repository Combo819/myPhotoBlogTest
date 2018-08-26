window.onload = function () {
    //滚图的样式
    var sliderStyle = [
        //1
        {
            'width': 240,
            'opacity': 0.3,
            'top': 0,
            'left': 150,
            'zIndex': 2
        },
        //2
        {
            'width': 420,
            'opacity': 0.7,
            'top': 120,
            'left': 0,
            'zIndex': 3
        },
        //3
        {
            'width': 600,
            'opacity': 1,
            'top': 200,
            'left': 200,
            'zIndex': 4
        },
        //4
        {
            'width': 420,
            'opacity': 0.7,
            'top': 120,
            'left': 580,
            'zIndex': 3
        },
        //5
        {
            'width': 240,
            'opacity': 0.3,
            'top': 0,
            'left': 610,
            'zIndex': 2
        }
    ];
    var sliderMain = $('slider_main');
    var sliderButton = $('slider_button');

    for (var i = 0; i < sliderStyle.length; i++) {
        buffer(sliderMain.children[i], sliderStyle[i]);
    }

    sliderMain.onmouseover = function(){
        sliderButton.style.display = 'flex';
    }
    sliderButton.onmouseover = function(){
        sliderButton.style.display = 'flex';
    }
    sliderMain.onmouseout = function(){ 
        sliderButton.style.display = 'none';
    }
    sliderButton.onmouseout = function(){
        sliderButton.style.display = 'none';
    }
    
    for (var j = 0; j < sliderButton.children.length; j++) {
        var btn = sliderButton.children[j];
        btn.onmousedown = function () {
            if (this.className === 'arrowl') {//必须是this?不能是btn
                sliderStyle.unshift(sliderStyle.pop());
            }
            else {
                sliderStyle.push(sliderStyle.shift());
            }
            for (var i = 0; i < sliderStyle.length; i++) {
                buffer(sliderMain.children[i], sliderStyle[i]);
            }
        }
    }


}
