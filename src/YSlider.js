export class YSlider {
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
        let sliderWidth = !this._option.vertical
            ? this.totalSlides * this._option.width
            : this._option.width;
        let sliderHeight = !this._option.vertical
            ? this._option.height
            : this.totalSlides * this._option.height;
        let container = document.createElement('div');
        container.style.cssText = 'width:' + this._option.width + 'px;height:' + this._option.height + 'px;overflow:hidden';
        let slider = document.createElement('div');
        slider.style.cssText = 'width:' + sliderWidth + 'px;height:' + sliderHeight + 'px;transition:all ' + this._option.speed + ' ease;padding:0;margin:0';
        if (this.totalSlides > 0) {
            this._option.data.forEach((src, index) => {
                let image = document.createElement('img')
                image.width = this._option.width
                image.height = this._option.height
                if (index === 0) {
                    image.src = src;
                } else {
                    this._option.lazyLoad
                        ? image.setAttribute('data-src', src)
                        : image.setAttribute('src', src);
                }
                slider.appendChild(image)
            })
        }
        this._slider = slider;
        this.loadSlide();
        this._option.autoPlay && this._startSlide();
        if (this._option.autoPlay && this._option.hoverToStop) {
            this._slider.addEventListener('mouseenter', function() {
                this._stopSlide()
            }.bind(this));
            this._slider.addEventListener('mouseleave', function() {
                this._startSlide()
            }.bind(this));
        }
        container.appendChild(slider)
        this._root.appendChild(container);
    }
    static defaultOpt() {
        return {
            data: [],
            width: 600,
            height: 450,
            speed: '.3s',
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
        let nextSlide = this._slider.children[this.currentSlide].nextElementSibling;
        let prevSlide = this._slider.children[this.currentSlide].previousElementSibling;
        [nextSlide,prevSlide].forEach(slide => {
            if (slide && slide.getAttribute('data-src')) {
                slide.src = slide.getAttribute('data-src');
                slide.removeAttribute('data-src')
            }
        })
    }
    _startSlide() {
        this._autoPlay = setInterval(function() {
            this.slideBy(1)
        }.bind(this), this._option.slideInterval * 1000)
    }
    _stopSlide() {
        clearInterval(this._autoPlay);
    }
    slideTo(index) {
        this._slider.style.transform = this._option.vertical
            ? "translateY(-" + (index * this._option.height) + "px)"
            : "translateX(-" + (index * this._option.width) + "px)";
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
        this._slider.addEventListener('click', function(e) {
            e.stopPropagation();
            if (event.target.src) {
                callback(this.currentSlide);
            }
        }.bind(this))
    }
    setChangeCallBack(callback) {
        this.onChange = callback.bind(this)
    }
}
