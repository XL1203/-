function animate(obj, position, callback) {
    //避免多次调用定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //step步长=(目标位置-当前位置)/10  步长写在定时器里面
        var step = (position - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === position) {
            clearInterval(obj.timer);
            callback ? callback() : '';
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 20)
}