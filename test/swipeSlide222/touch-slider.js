/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 15-7-5
 * Time: 上午8:54
 * To change this template use File | Settings | File Templates.
 */

var dx, dy;
var target = document.querySelector("#target");
var output = document.getElementById("output2");

var touchSlider = {

    init: function() {

//        target.style.webkitTransition = 'all ease 0.1s';

        function handleTouchEvent(event){
//只跟踪一次触摸
            return false;
            if (event.touches.length == 1){
                var output = document.getElementById("output");
                switch(event.type){
                    case "touchstart":
                        output.innerHTML = "Touch started (" + event.touches[0].clientX +
                            "," + event.touches[0].clientY + ")";
                        break;
                    case "touchend":
                        output.innerHTML += "<br>Touch ended (" +
                            event.changedTouches[0].clientX + "," +
                            event.changedTouches[0].clientY + ")";
                        break;
                    case "touchmove":
                        var pageX = "-" +event.changedTouches[0].clientX + "px";
                        target.style.webkitTransform = "translate3d(" + pageX + "," + 0 + ",0)";
                        console.log(111111111)

                        event.preventDefault(); //阻止滚动
                        output.innerHTML += "<br>Touch moved (" +
                            event.changedTouches[0].clientX + "," +
                            event.changedTouches[0].clientY + ")";
                        break;
                }
            }
        }

        target.addEventListener("touchstart", handleTouchEvent);
        target.addEventListener("touchmove", handleTouchEvent);
        target.addEventListener("touchend", handleTouchEvent);

        console.log(target)




        // this.start();
//        this.drag();
//        this.dragEnd();
//        this.swipeRight();

        this.all();
    },

    all: function() {
        touch.on('#target', 'touchstart', function(ev){
            ev.preventDefault();
        });

        var target = document.getElementById("target");
        target.style.webkitTransition = 'all ease 0.0s';
        var dx, dy;

        touch.on('#target', 'drag', function(ev){
            dx = dx || 0;
            dy = dy || 0;
            var offx = dx + ev.x + "px";
            var offy = dy + ev.y + "px";
            this.parentNode.parentNode.style.webkitTransform = "translate3d(" + offx + "," + 0 + ",0)";

            console.log(this.parentNode.parentNode +", 当前x值为:" + offx + ", 当前y值为:" + offy +".");

        });

        touch.on('#target', 'dragend', function(ev){
            dx += ev.x;
            dy += ev.y;
        });
    },

    starrt: function() {
        touch.on("#target", "touchstart", function(ev) {
            // output.innerHTML += ", <br>" +(ev.x +", clientX:" + ev.changedTouches[0].clientX + ", pageX:" + ev.changedTouches[0].pageX);
            ev.preventDefault();
        });

    },

    drag: function() {
        touch.on("#target", 'drag', function(ev){
            // log("向左滑动.");
            // ev.preventDefault();
            var offx = dx + ev.x + "px";

            // target.style.webkitTransform = "translate3d(" + offx + ",0,0)";
            var pageX = ev.x + "px";
            target.style.transform = "translate3d("+pageX+", 0, 0)";
            output.innerHTML += ", <br> ev.x" +ev.x + ", offx:" + offx;

        });
    },

    swipeRight: function(ev) {

        touch.on("#target2", 'swiperight', function(ev){
            // log("向左滑动.");
            // ev.preventDefault();
            var offx = dx + ev.x + "px";

            // target.style.webkitTransform = "translate3d(" + offx + ",0,0)";
            var pageX = ev.x + "px";
            target.style.transform = "translate3d("+pageX+", 0, 0)";
            output.innerHTML += ", <br> ev.x" +ev.x + ", offx:" + offx;

        });
    },

    dragEnd: function() {
        touch.on('#target', 'dragend', function(ev){
            ev.preventDefault();
            // target.style.webkitTransform = "translate3d(-" + 640 + "px,0,0)";
           // target.style.webkitTransform = "translate3d(" + ev.x + "px,0,0)";
            // console.log("end:" +ev.x);
            dx += ev.x;
        });
    }

}

touchSlider.init();