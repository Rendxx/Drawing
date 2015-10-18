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

  + **width** ```number```  
    Width of the line body.

  + **z-index** ```number```   
    Z-index of the line.

  + **background** ```object```  
    - **color** ```string```  
      Background color of line body. In CSS format.
    - **image** ```string```  
      Background image of line body. Input should be the available path to access the image.

  + **pointer** ```object```  
    - **start** ```object```  
      See *pointer data structure* below
    - **end** ```object```  
      See *pointer data structure* below

      > **pointer data structure:**
        - **image** ```string```  
          Image of the pointer. Input should be the available path to access the image.
        - **position** ```string```  
          Used as background-position in CSS.
        - **radiu**s ```string```  
          Radius of the pointer.  
pointer size = radius * 2

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

[show]: API%20Document%20-%20Shape.mg#shapeshow
[hide]: API%20Document%20-%20Shape.mg#shapehide
[move]: API%20Document%20-%20Shape.mg#shapemoveleft-top
[moveTo]: API%20Document%20-%20Shape.mg#shapemovetoleft-top
[rotate]: API%20Document%20-%20Shape.mg#shaperotatedeg
[rotateTo]: API%20Document%20-%20Shape.mg#shaperotatetodeg
[setOpts]: API%20Document%20-%20Shape.mg#shapesetoptsopts
[destroy]: API%20Document%20-%20Shape.mg#shapedestroy

     