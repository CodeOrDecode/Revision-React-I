import React from "react";
import Todoinput from "./Todoinput";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Todoitem from "./Todoitem";

const Todo = () => {
  const [alltodo, setAlltodo] = useState(null);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(null);

  let secretUrl = import.meta.env.VITE_BASE_URL;

  const getAllData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos?_page=${page}&_per_page=2`,
      });
      console.log(data);
      setAlltodo(data.data);
      setTotalpage(data.pages);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (value) => {
    let obj = {
      title: value,
      status: false,
    };
    try {
      await axios({
        method: "post",
        baseURL: secretUrl,
        url: "/todos",
        data: obj,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios({
        method: "delete",
        baseURL: secretUrl,
        url: `/todos/${id}`,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const updatetodo = async (id, status) => {
    let obj = { status: !status };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${id}`,
        data: obj,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev=()=>{
    setPage(page-1)
  }

  const handleNext=()=>{
    setPage(page+1)
  }

  useEffect(() => {
    getAllData();
  }, [page]);

  return (
    <div>
      <Todoinput addTodo={addTodo} />

      {alltodo &&
        alltodo.map((ele, index) => {
          return (
            <Todoitem
              key={ele.id}
              {...ele}
              deleteTodo={deleteTodo}
              updatetodo={updatetodo}
            />
          );
        })}

      <button onClick={handlePrev} disabled={page === 1}>Prev</button>
      <button>{page}</button>
      <button onClick={handleNext} disabled={page === totalpage}>Next</button>
    </div>
  );
};

export default Todo;
