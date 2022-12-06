import React from "react";
import { AiOutlineCheck, AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

function TodoList({ todo, setTodo, setEditTodo }) {
  const handleDelete = (id) => {
    const newList = todo.filter((obj) => {
      return obj.id !== id;
    });
    setTodo(newList);
  };

  const handleComplete = (id) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = (id) => {
    const findTodo = todo.find((obj) => obj.id === id);
    setEditTodo(findTodo);
  };

  return (
    <div>
      {todo.map((obj) => {
        return (
          <li className="list-item" key={obj.id}>
            <input
              type="text"
              className={`list ${obj.completed ? "complete" : ""}`}
              value={obj.title}
              onChange={(e) => e.preventDefault()}
            />
            <div>
              <button
                className="button-complete "
                onClick={() => handleComplete(obj.id)}
              >
                <AiOutlineCheck />
              </button>
              <button
                className="button-edit task-button"
                onClick={() => {
                  handleEdit(obj.id);
                }}
              >
                <AiTwotoneEdit />
              </button>
              <button
                className="button-delete task-button"
                onClick={() => {
                  handleDelete(obj.id);
                }}
              >
                <AiFillDelete />
              </button>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default TodoList;
