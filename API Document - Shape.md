# API Document - Shape

## Shape
This is a base class of all shapes. It define all common methods.

#### $$.drawing.create(shapeType, opts) ```object (shape instance)```
- **"shapeType"** ```string```  
  Shape type. Available value:
  + "line"

- **opts** ```object```  
  A package of data defining the attributes of the shape.

<h1></h1>

#### SHAPE.show()
Show the shape instance.

<h1></h1>

#### SHAPE.hide()
Hide the shape instance.

<h1></h1>

#### SHAPE.move(left, top)
Pan the shape left/top from current position

- **left** ```number```  
  Left offset from current position.

- **top** ```number```  
  Top offset from current position.

<h1></h1>

#### SHAPE.moveTo(left, top)
Move the shape to given position

- **left** ```number```  
  Left offset from parent element.

- **top** ```number```  
  Top offset from parent element.

<h1></h1>

#### SHAPE.rotate(deg)
Rotate the shape clockwise from current degree.

- **deg** ```number```  
  Rotate degree.

<h1></h1>

#### SHAPE.rotateTo(deg)
Rotate the shape clockwise to given degree.

- **deg** ```number```  
  Rotate degree.

<h1></h1>

#### SHAPE.scaleTo(ratio)
Scale to given ratio.

- **ratio** ```number```  
  Scale to given ratio.

<h1></h1>

#### SHAPE.setOpts(opts)
Reset options and re-render the shape.

- **opts** ```object```  
  A package of data defining the attributes of the shape.

<h1></h1>

#### SHAPE.destroy()
  Destroy the shape.

