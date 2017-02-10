/**
 * class YSlider
 */
export class YSlider {
    constructor(el, opt) {
        let option = Object.assign(YSlider.defaultOpt(), opt);
        //validate el parameter
        try {
            this._root = document.querySelector(el);
        } catch (e) {
            throw new Error('The first parameter should be a valid css selector');
        }
        this._option = option;
        //set default slide index to 0
        this.currentSlide = 0;
        this.totalSlides = this._option.data.length;
        //initialize slider actual size
        let sliderWidth = !this._option.vertical
            ? this.totalSlides * this._option.width
            : this._option.width;
        let sliderHeight = !this._option.vertical
            ? this._option.height
            : this.totalSlides * this._option.height;
        //initialize slider container basic style
        let container = document.createElement('div');
        container.style.cssText = 'width:' + this._option.width + 'px;height:' + this._option.height + 'px;overflow:hidden;position:relative;';
        //initialize slider basic style
        let slider = document.createElement('div');
        let sliderStyle = 'width:' + sliderWidth + 'px;height:' + sliderHeight + 'px;';
        if (this._option.animate) {
            sliderStyle += 'transition:all ' + this._option.speed + ' ease';
        }
        slider.style.cssText = sliderStyle;
        //create slides
        if (this.totalSlides > 0) {
            this._option.data.forEach((src, index) => {
                let image = document.createElement('img');
                image.width = this._option.width;
                image.height = this._option.height;
                //load first 2 images by default
                if (index < 2) {
                    image.src = src;
                } else {
                    this._option.lazyLoad
                        ? image.setAttribute('data-src', src)
                        : image.setAttribute('src', src);
                }
                slider.appendChild(image);
            })
        }
        this._slider = slider;
        //initialize slider event
        if (this._option.autoPlay && this._option.hoverToStop) {
            this._slider.addEventListener('mouseenter', function() {
                this._stopSlide();
            }.bind(this));
            this._slider.addEventListener('mouseleave', function() {
                this._startSlide();
            }.bind(this));
        }
        container.appendChild(slider);
        //initialize indicator
        if (this._option.showIndicator) {
            let indicatorContainer = document.createElement('div');
            indicatorContainer.style.cssText = "position:absolute;bottom:0;height:20px;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;";
            for (let i = 0; i < this.totalSlides; i++) {
                let slideTo = function(i) {
                    this.slideTo(i);
                }
                let indicator = document.createElement('div');
                indicator.style.cssText = "width:10px;height:10px;border-radius:50%;background-color:#f5f5f5;cursor:pointer;margin:0 5px;flex:0 0 10px;";
                indicator.className = this._option.indicatorClass;
                indicator.addEventListener('click', function() {
                    slideTo.bind(this)(i);
                }.bind(this));
                indicatorContainer.appendChild(indicator)
            }
            this._indicator = indicatorContainer;
            container.appendChild(indicatorContainer);
        }
        //initialize nav
        if (this._option.showNav) {
            let top = this._option.height / 2 - 84.84;
            let margin = 20.7 + 10;
            let navCommonStyle = 'position:absolute;cursor:pointer;height:100px;width:100px;border:solid #ddd;border-width:2px 2px 0 0;top:' + top + 'px;'
            let leftNav = document.createElement('div');
            let rightNav = document.createElement('div');
            leftNav.style.cssText = navCommonStyle + 'left:' + margin + 'px;transform:rotate(-135deg);';
            rightNav.style.cssText = navCommonStyle + 'right:' + margin + 'px;transform:rotate(45deg);';
            if (this._option.navClass) {
                leftNav.className = this._option.navClass + ' prev';
                rightNav.className = this._option.navClass + ' next';
            }
            leftNav.addEventListener('click', function() {
                if (this.currentSlide === 0)
                    return false;
                this.slideBy(-1);
            }.bind(this));
            rightNav.addEventListener('click', function() {
                if (this.currentSlide === this.totalSlides - 1)
                    return false;
                this.slideBy(1);
            }.bind(this));
            this._leftNav = leftNav;
            this._rightNav = rightNav;
            container.appendChild(leftNav);
            container.appendChild(rightNav);
        }
        this._root.appendChild(container);
        this.slideTo(0);
        this._option.autoPlay && this._startSlide();
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
            showNav: true,
            indicatorClass: '',
            navClass: ''
        }
    }
    _loadSlide() {
        let selfSlide = this._slider.children[this.currentSlide]
        let nextSlide = selfSlide.nextElementSibling;
        let prevSlide = selfSlide.previousElementSibling;
        [selfSlide, nextSlide, prevSlide].forEach(slide => {
            if (slide && slide.getAttribute('data-src')) {
                slide.src = slide.getAttribute('data-src');
                slide.removeAttribute('data-src');
            }
        })
    }
    _startSlide() {
        this._autoPlay = setInterval(function() {
            this.slideBy(1);
        }.bind(this), this._option.slideInterval * 1000);
    }
    _stopSlide() {
        clearInterval(this._autoPlay);
    }
    _freshIndicator(currentSlide) {
        Array.prototype.forEach.call(this._indicator.children, (child, index) => {
            child.style.backgroundColor = index === currentSlide
                ? 'gray'
                : 'white';
            index === currentSlide
                ? child.classList.add('active')
                : child.classList.remove('active')
        })
    }
    _freshNav(currentSlide) {
        this._leftNav.style.opacity = currentSlide === 0
            ? '0.4'
            : '1';
        this._rightNav.style.opacity = currentSlide === this.totalSlides - 1
            ? '0.4'
            : '1';
    }
    slideTo(index) {
        if (index < 0 || index > this.totalSlides - 1)
            return;
        this._slider.style.transform = this._option.vertical
            ? "translateY(-" + (index * this._option.height) + "px)"
            : "translateX(-" + (index * this._option.width) + "px)";
        this.currentSlide = index;
        this.onChange && this.onChange(this.currentSlide);
        this._loadSlide();
        this._option.showIndicator && this._freshIndicator(index);
        this._option.showNav && this._freshNav(index);
    }
    slideBy(count) {
        let targetIndex = (this.currentSlide + count) % this.totalSlides;
        this.slideTo(targetIndex);
    }
    setClickCallBack(callback) {
        this.onClick = callback.bind(this);
        this._slider.addEventListener('click', function(e) {
            e.stopPropagation();
            if (event.target !== this._slider) {
                callback(this.currentSlide);
            }
        }.bind(this));
    }
    setChangeCallBack(callback) {
        this.onChange = callback.bind(this);
    }
}
