import React, { useState } from "react";

function CgResize() {
    const [resizing, setResizing] = useState(false);

    const cgResize = React.createElement("cg-resize", {
        key: Date.now(),
        class: resizing ? "resizing" : "",
        onMouseDown: (event) => {
            event.preventDefault()
            setResizing(true) 
        },
      
    }, "");
    
    return cgResize;
}
export default CgResize;
