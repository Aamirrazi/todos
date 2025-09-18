import { useEffect, useState } from "react";
import {
  deleteTodoApi,
  retrieveAllTodosForUsername,
} from "../api/TodoApiService";
import { useAuth } from "../../security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  const authContext = useAuth();
  const navigate = useNavigate();

  const username = authContext.username;
  console.log("rd", username);

  const [message, setMessage] = useState(null);

  function updateTodo(id) {
    navigate(`/todo/${id}`);
  }
  function addNewTodo() {
    navigate(`/todo/-1`);
  }
  function deleteTodo(id) {
    console.log("clicked " + id);
    deleteTodoApi(username, id)
      .then(
        () => {
          setMessage(`Delete of todos with id = ${id} successful`);
          refreshTodos();
        }
        //1: Display message
        //2: Update Todos list
      )
      .catch((error) => console.log(error));
  }
  function refreshTodos() {
    retrieveAllTodosForUsername(username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => refreshTodos(), []);
  return (
    <div className="container">
      {message && <div className="alert alert-warning">{message}</div>}
      <h1>Things You Want To Do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
}
export default ListTodosComponent;
