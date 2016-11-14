# API Document - Free Drawing

#### new $$.Draw.Free (container, opts) ```object (FREE DRAW instance)```
Create a free drawing object. 

- **container** ```string```  
Dom node of the drawing container.

- **opts** ```object```  

  + **zIndex** ```number```   
    Z-index of the drawing object.


<h1></h1>

#### .startDrawing (para)
Start free drawing as mouse moves.

- **para** ```object```  
    Canvas context attributes.

<h1></h1>

#### .stopDrawing ()
Stop drawing.

<h1></h1>

#### .copy() ```object (LINE instance)```
Copy the instance.
<h1></h1>

#### .clear()
Clear the drawing object.
<h1></h1>

#### .getImage()
Get the drawing image.
<h1></h1>

#### .resize()
Force resize the drawing object.
<h1></h1>
     