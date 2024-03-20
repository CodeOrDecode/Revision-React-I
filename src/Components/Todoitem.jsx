import React from "react";
import "../index.css"

const Todoitem = ({ id, title, status,deleteTodo,updatetodo,titleUpdate,assign,handleAssign }) => {
  return <div className="stylediv">
    <h2>{title}</h2>
    <button style={{marginRight:"16px"}} onClick={()=>{titleUpdate(title,id)}}>Update Title</button>
    <button onClick={()=>{updatetodo(id,status)}}>{status?"Completed":"Pending"}</button>
    <button onClick={()=>{deleteTodo(id)}} style={{marginLeft:"16px"}}>Delete</button>
    <div>
    <label>Assign to:</label>
    <select style={{marginTop:"16px",marginLeft:"16px"}} value={assign} onChange={(e)=>{handleAssign(e.target.value,id)}}>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
    </select>
    </div>

  </div>;
};

export default Todoitem;
