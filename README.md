# Drawing
Draw shape in selected HTML container.  
For this version, line is the only available shape.     

![preview](https://raw.githubusercontent.com/Rendxx/Drawing/master/preview.png "Preview")

*Sample: [http://www.rendxx.com/Lib/Sample/1](http://www.rendxx.com/Lib/Sample/1 "Sample")*  
*Download: [Drawing v0.3.0](https://github.com/Rendxx/Drawing/releases/tag/0.3.0 "Download")*

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
        "z-index": 10,
        "css": {
            body: {
                "width": "10px",
                "background-image": "url('line-bg2.gif')"
            },
            end: {
                "width": "30px",
                "height": "30px",
                "background-image": "url('line-icon.png')",
                "background-position":"0 0"
            }
        }
});
l.moveTo(100,100);
l.lineTo(500, 500);
```

## Compatibility
```Chrome``` ```Fire Fox``` ```Safari``` ```Edge``` ```IE 9-11```

## License
Copyright &copy; 2015-2016, Rendxx. (MIT License)  
See [LICENSE][] for more info.

[jQuery]: https://jquery.com/ "jQuery Home Page"
[LICENSE]: https://github.com/Rendxx/TipBox/blob/master/LICENSE