# API Document - Line

#### $$.drawing.create("line", opts) ```object (LINE instance)```
Create a line with given options. 

- **"line"** ```string```  
First argument MUST be "line" to indicate the shape created is a line.

- **opts** ```object```  
  A package of data defining the attributes of the line. Line is always vertical drawn from top to bottom just like the picture below shows.  
![line structure](https://raw.githubusercontent.com/Rendxx/Drawing/master/Description/line-structure.png)
  + **container** ```jQuery object```  
    The jQuery object in which you want to draw the line.

  + **z-index** ```number```   
    Z-index of the line.

  + **adjust** ```number```   
    Adjust the length of line body (px).

  + **offset** ```number```  
    Offset of line body from start of the line (px).

  + **css** ```object```  
    - **body** ```object```  
      Css of line body  

    - **start** ```object```  
      Css of line start point

    - **end** ```object```  
      Css of line endpoint


<h1></h1>

#### LINE.lineTo(left, top)
Set an end position to the line.
A line will start from its position and end at this position.

- **left** ```number```  
  Left offset of the end point from parent element.

- **top** ```number```  
  Top offset of the end point from parent element.


<h1></h1>

#### LINE.show()
[Same as Shape API][show]
<h1></h1>

#### LINE.hide()
[Same as Shape API][hide]
<h1></h1>

#### LINE.move(left, top)
[Same as Shape API][move]
<h1></h1>

#### LINE.moveTo(left, top)
[Same as Shape API][moveTo]
<h1></h1>

#### LINE.rotate(deg)
[Same as Shape API][rotate]
<h1></h1>

#### LINE.rotateTo(deg)
[Same as Shape API][rotateTo]
<h1></h1>

#### ~~LINE.scaleTo(ratio)~~
**scaleTo** method is not available in LINE.
<h1></h1>

#### LINE.setOpts(opts)
[Same as Shape API][setOpts]
<h1></h1>

#### LINE.destroy()
[Same as Shape API][destroy]
<h1></h1>

#### LINE.ptrStart ```object (jQuery)```
jQuery object: start point.
<h1></h1>

#### LINE.ptrEnd ```object (jQuery)```
jQuery object: end point.
<h1></h1>

#### LINE.options ```object```
Line options.

[show]: API%20Document%20-%20Shape.md#shapeshow
[hide]: API%20Document%20-%20Shape.md#shapehide
[move]: API%20Document%20-%20Shape.md#shapemoveleft-top
[moveTo]: API%20Document%20-%20Shape.md#shapemovetoleft-top
[rotate]: API%20Document%20-%20Shape.md#shaperotatedeg
[rotateTo]: API%20Document%20-%20Shape.md#shaperotatetodeg
[setOpts]: API%20Document%20-%20Shape.md#shapesetoptsopts
[destroy]: API%20Document%20-%20Shape.md#shapedestroy

     