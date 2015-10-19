# Drawing
Draw shape in selected HTML container with CSS2.  
For this version, line is the only available shape.     

![preview](https://raw.githubusercontent.com/Rendxx/Drawing/master/preview.png "Preview")

*Sample: [http://www.rendxx.com/Lib/Sample/2](http://www.rendxx.com/Lib/Sample/1 "Sample")*  
*Download: [Drawing v0.2.1](https://github.com/Rendxx/Drawing/releases/tag/0.2.1 "Download")*

## Install
Download the package from bower
```
bower install drawing --save
```

Including the file in your webpage
```HTML
<script type="text/javascript" src="/node_modules/drawing/js/Drawing.js"></script>
```

See **Code Sample** below for more details.

## API
- [API Document - Shape](https://github.com/Rendxx/Drawing/blob/master/API%20Document%20-%20Shape.md)  
- [API Document - Line](https://github.com/Rendxx/Drawing/blob/master/API%20Document%20-%20Line.md)

## Dependency
- [jQuery][]

## Code Sample
JavaScript:

```javascript
var line = $$.drawing.create("Line",  {
    "container": $(".wrap"),
    "width": 4,
    "background": {
        color: "",
        image: "line-bg.png"
    },
    pointer: {
        start: {
            image: "line-icon.png",
            position: "0px -30px",
            radius: 8
        },
        end: {
            image: "line-icon.png",
            position: "-16px -30px",
            radius: 6
        }
    }
});
l.moveTo(100,100);
l.lineTo(500, 500);
```

## Compatibility
```Chrome``` ```Fire Fox``` ```Safari``` ```Edge``` ```IE 9-11``` ```IE 7,8```

## License
Copyright &copy; 2015, Rendxx. (MIT License)  
See [LICENSE][] for more info.

[jQuery]: https://jquery.com/ "jQuery Home Page"
[LICENSE]: https://github.com/Rendxx/TipBox/blob/master/LICENSE