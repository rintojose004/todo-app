import React, { useEffect, useRef } from "react";

function Form({ input, setInput, todo, setTodo, editTodo, setEditTodo }) {
  const inputRef = useRef();
  const updateTodo = (title, id, completed) => {
    const newTodo = todo.map((obj) =>
      obj.id === id ? { title, id, completed } : obj
    );
    setTodo(newTodo);
    setEditTodo("");
  };
  useEffect(() => {
    inputRef.current.focus();
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodo([...todo, { id: Date.now(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="type here...."
        className="text-input"
        required
        value={input}
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "Add"}
      </button>
    </form>
  );
}

export default Form;
