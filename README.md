# YSlider
A lightweight yet configurable slider component, which supports lazyload , change and click event, slide direction etc.
####Basic usage
1. Include script to your page
`    <script src="../dist/YSlider.min.js" charset="utf-8"></script>
`
2. Now YSlider is available, just call it as a constructor.

```js
        var slider = new YSlider('.slider',{
            lazyLoad:true,
            width:300,
            height:225,
            data : [
                'https://drscdn.500px.org/photo/145514195/m%3D2048/9ab727271cfe6e5d272817d90bd5437a',
                'http://cn.bing.com/az/hprichbg/rb/LophophorusImpejanus_ZH-CN10675050048_1920x1080.jpg',
                'https://drscdn.500px.org/photo/145514195/m%3D2048/9ab727271cfe6e5d272817d90bd5437a',
                'http://cn.bing.com/az/hprichbg/rb/LophophorusImpejanus_ZH-CN10675050048_1920x1080.jpg',
                'https://drscdn.500px.org/photo/145514195/m%3D2048/9ab727271cfe6e5d272817d90bd5437a',
                'http://cn.bing.com/az/hprichbg/rb/LophophorusImpejanus_ZH-CN10675050048_1920x1080.jpg',
                'https://drscdn.500px.org/photo/145514195/m%3D2048/9ab727271cfe6e5d272817d90bd5437a',
                'http://cn.bing.com/az/hprichbg/rb/LophophorusImpejanus_ZH-CN10675050048_1920x1080.jpg'
            ]
        })
```
Note the first parameter is **required** to be a valid css selector, or it will throw an error.
You can overwrite default configuration by passing second parameter. It should be an object.

####Configure YSlider
- **data**: url array of images, **default** [ ]
- **width**: width of slider to create, should be a number, **default** 600
- **height**: height of slider to create, should be a number, **default** 450
- **speed** animation duration, should be a css time string ,**default** '.3s'
- **lazyLoad** enable lazyload feature if set to true, **default** false
- **animate** enable animation for slide change, **default** true
- **verticle** slide direction, horizontal or verticle, boolen required, **default** false
- **autoPlay** auto play slides after create, **default** true,
- **slideInterval** seconds of slides autoplay interval, number required, **default** 5
- **hoverToStop** stop autoplay when curor is on one of slides, autoplay option should be true, or it will not work. **default** false
- **showIndicator** show indicator or not, **default** true,
- **showNav** show nav or not, **default** true
- **indicatorClass** class added to indicator for customization, string required, **default** ''
- **navClass** class added to nav for customization, string required, **default** ''

#### Manipulation API
- slideTo(index)
slide to target index of sldes
- slideBy(count)
slide given count of sldes from current index
- setClickCallBack(callback)
set callback of click event
- setChangeCallBack(callback)
set callback of slide change event
