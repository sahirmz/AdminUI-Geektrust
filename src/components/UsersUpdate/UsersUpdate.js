import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "../../App.css";
export default function UsersUpdate({
  users,
  setUsers,
  userId,
  setModalShow,
  ...props
}) {
  const userToUpdate = users.find((user) => user.id === userId);

  const [formValue, setFormValue] = useState({
    name: userToUpdate.name,
    email: userToUpdate.email,
    role: userToUpdate.role,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };
  const { name, email, role } = formValue;

  const submitHandler = () => {
    const updatedList = users.map((item) => {
      if (item.id === userId) {
        return { ...item, ...formValue };
      }
      return item;
    });
    setUsers(updatedList);
    setModalShow(false);
  };
  return (
    <>
      <Modal {...props} size="sm" centered>
        <Modal.Body>
          <Form>
            {/* Name Group */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="name"
                placeholder="Name"
                onChange={handleChange}
                value={name}
              />
            </Form.Group>

            {/* Email Group */}
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                id="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={email}
                autoFocus
              />
            </Form.Group>

            {/* Role Group */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="role"
                placeholder="Role"
                onChange={handleChange}
                value={role}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Footer for Table */}
        <Modal.Footer>
          <Button variant="light" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
