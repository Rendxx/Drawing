# API Document - Line

#### new $$.Draw.Line (container, opts) ```object (LINE instance)```
Create a line object. 

- **container** ```string```  
Dom node of the drawing container.

- **opts** ```object```  

  + **zIndex** ```number```   
    Z-index of the drawing object.


<h1></h1>

#### .draw (start, end, para)
Draw a line from start to end.

- **start** ```array[]```  
  Start position [x, y].

- **end** ```array[]```  
  End position [x, y].

- **para** ```object```  
  
  + **image** ```Image```   
    Background image of the line.
  
  + **...**    
    Canvas context attributes.

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

#### .destroy()
Destroy the element and release all memory.
