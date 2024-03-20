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
  const [updatetitle, setUpdatetitle] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [assignval, setAssignval] = useState("");
  const [pending, setPending] = useState(0);
  const [complete, setComplete] = useState(0);

  let secretUrl = import.meta.env.VITE_BASE_URL;

  // const getAllData = async () => {
  //   try {
  //     let { data } = await axios({
  //       method: "get",
  //       baseURL: `${secretUrl}`,
  //       url: `/todos?_page=${page}&_per_page=2`,
  //     });
  //     console.log(data);
  //     setAlltodo(data.data);
  //     setTotalpage(data.pages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos`,
      });
      // console.log(data);
      setAlltodo(data);
      getFilterData2();
      getFilterData3()
      // getFilterData3();
      // setTotalpage(data.pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterData2 = async () => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos`,
      });
      let pen = data.filter((ele) => {
        if (ele.status === false) {
          return ele;
        }
      });

     setPending(pen.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterData3 = async () => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos`,
      });
      let pen = data.filter((ele) => {
        if (ele.status === true) {
          return ele;
        }
      });

     setComplete(pen.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterData = async (val) => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos?assign=${val}`,
      });
      // console.log(data);
      setAlltodo(data);
      // setTotalpage(data.pages);
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

  const handleTitleUpdate = async (val) => {
    let obj = { title: updatetitle };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${val}`,
        data: obj,
      });
      getAllData();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = async (val, val2) => {
    let obj = { assign: val };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${val2}`,
        data: obj,
      });
      getAllData();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePrev = () => {
  //   setPage(page - 1);
  // };

  // const handleNext = () => {
  //   setPage(page + 1);
  // };

  // function handleChange(event) {
  //   setPage(event.target.innerText);
  // }

  function titleUpdate(value, val2) {
    setShow(true);
    setUpdatetitle(value);
    setId(val2);
  }

  function handleTitleChange(event) {
    setUpdatetitle(event.target.value);
  }

  function handleFilter1(val) {
    setAssignval(val);
    if (val === "A" || val === "B" || val === "C") {
      getFilterData(val);
    } else {
      getAllData();
    }
  }

  function handleDate(event){
    console.log(event.target.value);

  }

  useEffect(() => {
    getAllData();
  }, [page]);

  return (
    <div>
      <Todoinput addTodo={addTodo} />

      {show && (
        <input
          type="text"
          style={{ marginTop: "25px" }}
          placeholder="update title"
          value={updatetitle}
          onChange={handleTitleChange}
        />
      )}
      {show && (
        <button
          onClick={() => {
            handleTitleUpdate(id);
          }}
        >
          Update
        </button>
      )}

      <h3>Complete is : {complete}</h3>
      <h3>Pending is : {pending}</h3>

      <input type="date" onChange={handleDate}/>

      {/* <select
        value={assignval}
        style={{ marginTop: "16px" }}
        onChange={(e) => {
          handleFilter1(e.target.value);
        }}
      >
        <option value="Assign To">Assign To</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select> */}

      {alltodo &&
        alltodo.map((ele, index) => {
          return (
            <Todoitem
              key={ele.id}
              {...ele}
              deleteTodo={deleteTodo}
              updatetodo={updatetodo}
              titleUpdate={titleUpdate}
              handleAssign={handleAssign}
            />
          );
        })}

      {/* {new Array(totalpage).fill("0").map((ele, index) => {
        return (
          <button onClick={handleChange} key={index}>
            {index + 1}
          </button>
        );
      })} */}

      {/* <button onClick={handlePrev} disabled={page === 1}>Prev</button>
      <button>{page}</button>
      <button onClick={handleNext} disabled={page === totalpage}>Next</button> */}
    </div>
  );
};

export default Todo;
