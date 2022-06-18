
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Todo.css";
import { useStateValue } from "./StateProvider";
import EditTodo from "./EditTodo";
import Navbar from "./Navbar";
import { Link, useHistory } from "react-router-dom";

function Todo() {
 const [name, setName] = useState("");
  const history = useHistory();
 const [checked, setChecked] = useState(false);
let [data2, setData] = useState([]);
let [user, setUser] = useState("");
  const [{ basket }, dispatch] = useStateValue(); 

useEffect(() => {
  fetchUser();
  fetchData();
   
}, []);
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

   const fetchUser = async () => {
     try { 
       axios
         .get("https://babzz-todo.herokuapp.com/api/v1/tasks/user", config)
         .then((response) => {
           const data = response.data.username;
           setUser(data);
         })
         .catch((error) => {
           console.log(error);
         });
     } catch (e) {
       console.log(e);
     }
   };
  

     const fetchData = async () => {
       try {
         axios
           .get("https://babzz-todo.herokuapp.com/api/v1/tasks", config)
           .then((response) => {
             const data = response.data.task;
             setData(data);
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (e) {
         console.log(e);
       }
     };
  
 console.log(data2);
 async function editPost(_id, e) {
  try {
    dispatch({
      type: "ADD_ID",
      uid: _id,
    });
     dispatch({
       type: "ADD_TO_BASKET",
       item: data2.name,
     });

  
  
  } catch (error) {
    console.log(error);
  }
   history.push("/edit");
}



async function postDelete(_id, e) {
  try {
    await axios
      .delete(`https://babzz-todo.herokuapp.com/api/v1/tasks/${_id}`, config)
      .then(function (response) {
        console.log(response);
      });
    fetchData();
  } catch (error) {
    console.log(error);
  }
}



     async function postName(e) {
       e.preventDefault();


       try {
         await axios.post("https://babzz-todo.herokuapp.com/api/v1/tasks", {
           name,
         }, config);


fetchData()
       } catch (error) {
         console.log(error);
       }
     setName("")  
     }

     const authenticate = () => {
       !user && history.push("/login")
     }
  return (
    <div className="todos">
      <Navbar />
      <div className="list__wrapper">
        <h1 className="title">Todo</h1>

        <div className="todo__wrapper">
          <form onSubmit={postName} className="form">
            <input
              className="input__field"
              type="text"
              placeholder="Add To List"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="submit__button"
              onClick={authenticate}
            >
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <div className="output">
          <div className="todo__input">
            <h2> Todo Input </h2>
          </div>
          {data2
            .slice(0)
            .reverse()
            .map((info) => {
              return (
                <div
                  className={checked ? "inputed__data" : "input__completed"}
                  key={info._id}
                >
                  <p className={info.completed ? "done" : "undone"}>
                    {info.name}
                  </p>
                  <label className="icon">
                    <i
                      class="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => editPost(info._id)}
                    ></i>

                    <i
                      class="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => postDelete(info._id)}
                    ></i>
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Todo