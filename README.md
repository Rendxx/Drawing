# Drawing
Draw shape in selected HTML container.  
For this version, line is the only available shape.     

![preview](https://raw.githubusercontent.com/Rendxx/Drawing/master/preview.png "Preview")

*Sample: [http://www.rendxx.com/Lib/Sample/1](http://www.rendxx.com/Lib/Sample/1 "Sample")*  
*Download: [Drawing v0.4.2](https://github.com/Rendxx/Drawing/releases/tag/0.4.2 "Download")*

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
- [API Document - Line](https://github.com/Rendxx/Drawing/blob/master/API%20Document%20-%20Line.md)
- [API Document - FreeDraw](https://github.com/Rendxx/Drawing/blob/master/API%20Document%20-%20Free.md)  

## Dependency

## Code Sample
JavaScript:

```javascript
var line = new $$.Draw.Line(container);
line.draw([100, 100], [500, 500], {
	strokeStyle: '#ff6666',
	lineWidth: 4,
	lineCap: 'round'
});
var img = _drawing.getImage();
```

## License
Copyright &copy; 2015-2016, Rendxx. (MIT License)  
See [LICENSE][] for more info.

[LICENSE]: https://github.com/Rendxx/TipBox/blob/master/LICENSE