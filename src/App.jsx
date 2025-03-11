import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Card, Form, Row, Col, Container } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";
import EditTodo from "./components/modals/EditTodo";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: Date.now().toString(),
      text: "This is a sample todo",
      isComplete: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All"); // State for filter selection
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Load todos from localStorage when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo) {
      const newId = Date.now().toString(); // Use current date and time as unique ID
      const updatedTodos = [
        ...todos,
        { id: newId, text: newTodo, isComplete: false },
      ];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localStorage
      setNewTodo("");
    }
  };

  const handleEditTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editTodo } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localStorage
    setEditTodo("");
    setShowModal(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localStorage
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to localStorage
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.isComplete;
    if (filter === "Not Completed") return !todo.isComplete;
    return true; // 'All' option
  });

  return (
    <>
      <EditTodo
        show={showModal}
        onClose={() => setShowModal(false)}
        todoText={editTodo}
        setTodoText={setEditTodo}
        onSave={handleEditTodo}
      />
      <Container
        fluid
        className={`p-4 ${theme === "light" ?  "light" : "dark"} min-vh-100`}
      >
        <div onClick={toggleTheme} className="text-end">
          {theme === "light" ? (
            <FaMoon size={18} className="cursor-pointer" />
          ) : (
            <FaSun size={18} className="cursor-pointer" />
          )}
        </div>

        <h1 className="text-center mb-4" style={{ fontSize: "1.5rem" }}>
          TODO App
        </h1>

        {/* Filter Dropdown - aligned to the right and smaller */}
        <div className="d-flex justify-content-end mb-3">
          <Form.Group
            controlId="filterSelect"
            className="mb-0"
            style={{ width: "auto" }}
          >
            <Form.Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ fontSize: "0.8rem", width: "150px" }} // smaller size
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form className="mb-3 d-flex gap-1" onSubmit={handleAddTodo}>
          <Form.Group className="flex-grow-1">
            <Form.Control
              type="text"
              placeholder="Add new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              style={{ fontSize: "0.9rem" }}
              className="input-no-focus"
              maxLength={45}
            />
          </Form.Group>
          <button type="submit" className="button-30">
            Add Todo
          </button>
        </Form>

        <Row>
          {filteredTodos?.length > 0 ? (
            filteredTodos.map((todo) => (
              <Col key={todo.id} md={4} className="mb-3">
                <Card
                  className={`shadow-sm ${
                    todo.isComplete ? "bg-success text-white" : ""
                  }`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <Card.Body>
                    <Card.Text
                      className={`${
                        todo.isComplete
                          ? "text-decoration-line-through"
                          : "text-decoration-none"
                      } cursor-pointer`}
                    >
                      {todo.text}
                    </Card.Text>

                    <div className="d-flex gap-2 flex-wrap">
                      <Button
                        className="button-17"
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          setEditTodo(todo.text);
                          setEditId(todo.id);
                          setShowModal(true);
                        }}
                        style={{ fontSize: "0.8rem" }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="button-17"
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteTodo(todo.id)}
                        style={{ fontSize: "0.8rem" }}
                      >
                        Delete
                      </Button>
                      <Button
                        className="button-17"
                        variant={todo.isComplete ? "light" : "success"}
                        size="sm"
                        onClick={() => handleToggleComplete(todo.id)}
                        style={{ fontSize: "0.8rem" }}
                      >
                        {todo.isComplete ? "Mark Incomplete" : "Complete"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center p-0 fst-italic fw-bold">No items found</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default App;
