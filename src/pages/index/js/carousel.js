var carousel = document.getElementById('carousel_list');
var leftbtn = document.getElementById('left_btn');
var rightbtn = document.getElementById('right_btn');
var points = document.getElementById('points');

var circle_li = points.getElementsByTagName('li');

var topbtn = document.getElementById('backtotop');

var idx = 0;
var lock = false;

rightbtn.onclick = right_btn_handler;
leftbtn.onclick = left_btn_handler;


function right_btn_handler() {

    if (lock == true) {
        return;
    }

    lock = true;

    carousel.style.transition = 'transform .5s ease 0s';

    idx++;
    carousel.style.transform = `translateX(${ -16.66 * idx }%)`;

    if (idx > 4) {
        idx = 0;
        setCurrent();
        setTimeout(() => {

            carousel.style.transition = 'none';
            carousel.style.transform = 'none';
        }, 500);

    }

    setCurrent();

    setTimeout(() => {
        lock = false;
    }, 500)
};

function left_btn_handler() {

    if (lock == true) {
        return;
    }

    lock = true;

    if (idx == 0) {
        idx = 5;
        // to picture 5 instantly
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${ -16.66 * idx }%)`;

        idx = 4
        setCurrent()
        setTimeout(() => {

            carousel.style.transition = 'transform .5s ease 0s'
            carousel.style.transform = `translateX(${ -16.66 * idx }%)`;

        }, 0);

    } else {

        idx--;
        carousel.style.transform = `translateX(${ -16.66 * idx }%)`;

    }

    setCurrent()

    setTimeout(() => {
        lock = false;
    }, 500)
}

function setCurrent() {

    for (var i = 0; i < 5; i++) {

        if (i == idx) {

            circle_li[i].className = 'current';

        } else {

            circle_li[i].className = '';

        }
    }

}

points.onclick = function (e) {

    if (e.target.tagName.toLowerCase() == 'li') {

        var n = e.target.getAttribute('data-n');
    }
    idx = n;
    carousel.style.transition = 'transform .5s ease 0s';
    carousel.style.transform = `translateX(${ -16.66 * idx }%)`;
    setCurrent();
}


setInterval(right_btn_handler,2500);

topbtn.onclick = function (){

    var timer = setInterval(()=>{
        document.documentElement.scrollTop -= 100;
        if( document.documentElement.scrollTop < 10){
            clearInterval(timer);
        }
    },20)

}

window.onscroll = function() {

    if(document.documentElement.scrollTop < 10){
        topbtn.style.display = 'none';
    }
    else{

        topbtn.style.display = 'block';

    }

}

