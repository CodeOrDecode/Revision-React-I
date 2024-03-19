import React, { useEffect } from 'react'
import { useState } from 'react'

const Child = () => {
    const [val, setVal] = useState(0)

    useEffect(() => {
        console.log("component mounted");

        return ()=>{
            console.log("component unmounted")
        }
     
    }, [])



    useEffect(() => {
        console.log("component updated");
    }, [val])
    
    
  return (
    <div>
        <h3>{val}</h3>
        <button onClick={()=>{setVal(val+1)}}>Increase</button>

    </div>
  )
}

export default Child