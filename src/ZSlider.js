export class ZSlider {
    constructor(width = 500, height = 500) {
        this.width = width;
        this.height = height;
        var viewport = document.querySelector('.viewport-screen');
        let leftButton = document.querySelector('.left-button');
        let rightButton = document.querySelector('.right-button');
        let imgContainer = document.querySelector('.img-container');
        var scrollImgs = document.getElementsByClassName('img-item');
        $(viewport).css({
            width: width + 'px',
            height: height + 'px'
        })
        $(imgContainer).css({
            width: '30000px',
            height: height + 'px',
            left: -width + 'px'
        });
        for (var i = 0; i < scrollImgs.length; i++) {
            $(scrollImgs[i]).css({
                width: width + 'px',
                height: height + 'px'
            });
        }
        this.imgContainer = imgContainer;
		this.rightButton = rightButton;
		this.leftButton = leftButton;
        rightButton.addEventListener('click', function() {
            var left = parseInt(imgContainer.style.left) - width + 'px';
            if (left == -(width * 2) + 'px') {
                $(imgContainer).animate({
                    left: left
                }, function() {
                    imgContainer.style.left = parseInt(imgContainer.style.left) + width + 'px'
                    imgContainer.appendChild(imgContainer.firstElementChild.cloneNode(true));
                    imgContainer.removeChild(imgContainer.firstElementChild);
                })
            }

        })
        leftButton.addEventListener('click', function() {
            var left = parseInt(imgContainer.style.left) + width + 'px';
            if (left == '0px') {
                $(imgContainer).animate({
                    left: left
                }, function() {
                    imgContainer.style.left = parseInt(imgContainer.style.left) - width + 'px'
                    imgContainer.insertBefore(imgContainer.lastElementChild.cloneNode(true), imgContainer.firstElementChild);
                    imgContainer.removeChild(imgContainer.lastElementChild);
                })
            }
        })
		this._cycleScrolling();
    }
	_cycleScrolling(){
		setInterval(function(){
			$(this.rightButton).trigger('click');
		}.bind(this),5000)
	}
}
