import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import "./EditTodo.css"
import Navbar from './Navbar';

function EditTodo() {
    const [{ basket, usid }, dispatch] = useStateValue(); 

    const history = useHistory();
     const [name, setName] = useState("");
       const [completed, setCompleted] = useState(false);
     const [editname, seteditName] = useState("");

console.log(completed)


useEffect(() => {
  usid ?
  fetchData(): history.push("/")
},[usid]);

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const fetchData = async () => {
  try {
    axios
      .get(`http://localhost:3000/api/v1/tasks/${usid}`, config)
      .then((response) => {
        setName(response.data.cart.name);
      })

      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }

};


  console.log(editname);




    async function editName(e) {
      e.preventDefault()
      try {
        await axios
          .patch(`http://localhost:3000/api/v1/tasks/${usid}`, { name, completed }, config)
          .then(function (response) {
            console.log(response);
          })
          .then(history.push("/"))
        
       
      } catch (error) {
      console.log(error)
      }

   

    }

  return (
    <div className="todos edit__todo">
      <Navbar />
      <div className="list__wrapper edit__wrapper2">
        <h1 className="title edit__title">Edit Todo</h1>

        <div className="edit__wrapper">
          <form onSubmit={editName} className="edit__form">
            <textarea
              className="edit__field "
              type="text"
              placeholder="edit task"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="input">
              Completed
              <input
                type="checkbox"
                className={completed ? "checkbox__active" : "checkbox"}
                value={completed}
                onChange={(e) => setCompleted(!completed)}
              />{" "}
              <p className="instructions">
                if checkbox is left empty completed is set to{" "}
                <div className="span"> false </div>
              </p>
            </div>
            <button type="submit" className="edit__button">
              Edit Todo
            </button>
          </form>
        </div>
        <div className="output"></div>
      </div>
    </div>
  );
}

export default EditTodo