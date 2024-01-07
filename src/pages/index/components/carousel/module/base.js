import DEFAULTS from './defaults.js';

class BaseSlider {
    constructor(el, options) {
        if (el.nodeType !== 1) {
            throw new Error('please input DOM element');
        }

        this.options = {
            ...DEFAULTS,
            ...options
        };

        const sliderEl = el;
        const sliderContentEl = sliderEl.querySelector('#carousel_list');
        const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');

        this.sliderEl = sliderEl;
        this.sliderContentEl = sliderContentEl;
        this.sliderItemEls = sliderItemEls;

        this.minIndex = 0;
        this.maxIndex = sliderItemEls.length - 1;
        this.currIndex = this.getCorrectedIndex(this.options.initialIndex);

        this.itemWidth = sliderItemEls[0].offsetWidth;

        this.init()
    }

    init() {

        this.setItemsWidth();

        this.setContentWidth();

        this.move(this.getDistance());

        if(this.options.animation){
            this.openAnimation();
        }
        if(this.options.autoplay){
            this.autoplay();
        }

    }

    getCorrectedIndex(index) {
        if (index > this.maxIndex) {
            return this.maxIndex;
        } else if (index < this.minIndex) {
            return this.minIndex;
        }
        return index;
    }

    getDistance(index) {

        return -this.itemWidth * index;

    }


    openAnimation() {

        this.sliderContentEl.classList.add('.slider-animation');

    }

    move(distance) {

        this.sliderContentEl.style.transform = `translate3d(${distance}px, 0px, 0px)`;

    }

    setItemsWidth() {
        for (const item of this.sliderItemEls) {

            item.style.width = `${this.itemWidth}px`;

        }
    }

    setContentWidth() {
        this.sliderContentEl.style.width = `${this.sliderItemEls.length * this.itemWidth}px`
    }


}

export default BaseSlider;