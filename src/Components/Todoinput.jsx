import React from "react";
import { useState } from "react";

const Todoinput = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  function handleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="enter title"
        value={title}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          addTodo(title), setTitle("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Todoinput;
