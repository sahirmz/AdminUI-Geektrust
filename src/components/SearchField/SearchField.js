import React from "react";
import { Form } from "react-bootstrap";
import "./SearchField.css";

export default function SearchField({ onSearch }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search by name, email or role"
      onChange={onSearch}
    />
  );
}
