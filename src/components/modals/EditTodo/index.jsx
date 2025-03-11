import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTodo = ({ show, onClose, todoText, setTodoText, onSave }) => {
  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            style={{ fontSize: "0.9rem" }}
            className="input-no-focus"
            maxLength={45}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button-17"
            size="sm"
            variant="secondary"
            onClick={onClose}
            style={{ fontSize: "0.9rem" }}
          >
            Close
          </Button>
          <Button
            className="button-17"
            size="sm"
            variant="primary"
            onClick={onSave}
            style={{ fontSize: "0.9rem" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTodo;
