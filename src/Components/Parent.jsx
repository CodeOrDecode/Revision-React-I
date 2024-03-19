import React from 'react'
import Child from './Child'
import { useState } from 'react'


const Parent = () => {
const [count, setCount] = useState(false)

  return (
    <div>
        <h4>Parent Component</h4>
        <button onClick={()=>{setCount(!count)}}>{count?"Hide":"Show"}</button>
        {count && <Child/>}
    </div>
  )
}

export default Parent