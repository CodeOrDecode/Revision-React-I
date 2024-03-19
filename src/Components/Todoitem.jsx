import React from "react";
import "../index.css"

const Todoitem = ({ id, title, status,deleteTodo,updatetodo }) => {
  return <div className="stylediv">
    <h2>{title}</h2>
    <button onClick={()=>{updatetodo(id,status)}}>{status?"Completed":"Pending"}</button>
    <button onClick={()=>{deleteTodo(id)}} style={{marginLeft:"16px"}}>Delete</button>
  </div>;
};

export default Todoitem;
