window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    var timer = null;

    // 1. 显示和隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            next.click();   //手动调用点击事件
        }, 2000);
    })

    // 2. 获取所有图片,动态生成小圆点
    var ul = document.querySelector('ul');
    var ol = document.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        // 2.1 循环创建新的li, 给新的li设置索引号,把li添加到ol中
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);

        // 2.2 给新的li注册点击事件
        li.addEventListener('click', function () {
            var index = this.getAttribute('data-index');
            animate(ul, -focusWidth * index);
            num = circle = index;   //当我们点击了某个li 就要把当前的li的索引号给num和circle
            circleChange();
        })
    }

    // 选中的小圆点呈现对应的样式
    function circleChange() {
        // 先清除其他小圆圈的样式(排他思想)
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 给当前小圆圈设置样式
        ol.children[circle].className = 'current';
    }

    // 3. 复制第一张那个图片，并将其添加到 ul 后 (核心原理)
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 给第一个小圆点添加默认样式
    ol.children[0].className = 'current';

    var num = 0;        // 计数器 
    var circle = 0;     // 控制小圆点
    var flag = true;    // 节流阀(避免狂点右箭头),即当上一动作完成后在执行下一动作
    // 4. 单击右箭头，切换下一张图片
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === ul.children.length - 1) {   //图片无缝滚动 若走到了最后一张复制的图片，ul要快速复原即left=0
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // 图片滚动
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle++;   //小圆点随图片的滚动相应跳转
            if (circle === ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })

    // 5. 单击左箭头，切换上一张图片
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === 0) {    //图片无缝滚动 若走到了第一张图片，ul要快速复原即left=(ul.children.length-1)*focusWidth
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle--;   // 小圆点随图片的滚动相应跳转
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })

    // 6. 每隔 2s 自动播放，触发右箭头的点击事件
    timer = setInterval(function () {
        next.click();
    }, 2000);
})