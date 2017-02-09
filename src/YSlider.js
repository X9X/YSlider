class YSlider {
    constructor(el, opt) {
        let option = Object.assign(YSlider.defaultOpt(), opt);
        try {
            this._root = document.querySelector(el)
        } catch (e) {
            throw new Error('The first parameter should be a valid css selector');
        }
        this._option = option;
        this.currentSlide = 0;
        this.totalSlides = this._option.data.length;
        this._slider = {
            width: this._option.vertical
                ? this.totalSlides * this._option.width
                : this._option.width,
            height: this._option.vertical
                ? this._option.height
                : this.totalSlides * this._option.height
        }
        let container = document.createElement('div');
        container.style.cssText = '' + this.width + 'px;' + this.height + 'px;' + 'overflow:hidden;';
        let slider = document.createElement('div');
        slider.style.cssText = '' + this._slider.width + 'px;' + this._slider.height + 'px;' + 'transition:transform ' + this._option.speed + ' ease';
        if (this.totalSlides > 0) {
            this._option.data.forEach((src, index) => {
                let image = document.createElement('img')
                image.width = this._option.width
                image.height = this._option.width
                if (index === 0) {
                    image.src = src;
                } else {
                    this._option.lazyLoad
                        ? image.setAttribute('data-src', src)
                        : image.setAttribute('src', src);
                }
                image.appendTo(slider);
            })
        }
        this._slider = slider;
        if(this._option.hoverToStop){
            this._slider.addEventListener('mouseenter',function(){
                this._stopSlide()
            }.bind(this));
            this._slider.addEventListener('mouseleave',function(){
                this._startSlide()
            }.bind(this));
        }
        this._option.hoverToStop &&
        container.appendChild(slider).appendTo(this._root);
    }
    static defaultOpt() {
        return {
            data: [],
            width: 450,
            height: 600,
            animationDuration: '.3s',
            lazyLoad: false,
            animate: true,
            vertical: false,
            autoPlay: true,
            slideInterval: 5,
            hoverToStop: false,
            showIndicator: true,
            incatorClass: ''
        }
    }
    loadSlide() {
        let nextSlide = this._slider.children[this.currentSlide].nextElementSibling
        if (nextSlide && nextSlide.getAttribute('data-src')) {
            nextSlide.src = nextSlide.getAttribute('data-src');
            nextSlide.removeAttribute('data-src')
        }
    }
    _startSlide() {
        this._autoPlay = setInterval(function(){
            this.slideBy(1)
        }.bind(this),this._option.slideInterval * 1000)
    }
    _stopSlide() {
        this.clearInterval(this._autoPlay);
    }
    slideTo(index) {
        this._slider.style.transform = this._option.vertical
            ? "translateY(" + (index * this._option.height) + "px)"
            : "translateX(" + (index * this._option.width) + "px)";
        this.currentSlide = index;
        this.onChange && this.onChange(this.currentSlide)
        this.loadSlide();
    }
    slideBy(count) {
        let targetIndex = (this.currentSlide + count) % this.totalSlides;
        this.slideTo(targetIndex)
    }
    setClickCallBack(callback) {
        this.onClick = callback.bind(this);
        this._slider.addEventListener('click',function(e){
            e.stopPropagation();
            if(event.target.src){
                callback(this.currentSlide);
            }
        }.bind(this))
    }
    setChangeCallBack(callback) {
        this.onChange = callback.bind(this)
    }
}
