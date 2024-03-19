import React from "react";
import { useRef } from "react";
import { useState } from "react";

const Todouseref = () => {
  const [text, setText] = useState("");
  const inputref = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    // inputref.current.focus();
    console.log(inputref.current.name.value);
    console.log(inputref.current.email.value);
    console.log(inputref.current.password.value);
  };

  return (
    <div>
      {/* <input ref={inputref} type="text" value={text} onChange={handleChange}/> */}

      <form ref={inputref}>
        <input type="text" placeholder="name" name="name" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button onClick={handleClick}>Click</button>
      </form>
    </div>
  );
};

export default Todouseref;
