import React, { useState } from "react";
import jm, { useForm } from "json-msg-react";
import { Button, Form, Container, Modal, Navbar, Nav } from "react-bootstrap";
import Input from "./Input";

const schema = {
  username: jm.str({ alphanum: true, min: 5 }),
  email: jm.str({ email: true }),
  password: jm.str({ min: 5 }),
  address: jm.str({ min: 4 }),
  confirmPassword: jm.sameAs("password"),
};

const initialData = {
  username: "darkcris1",
};
const App = () => {
  const [show, setShow] = useState(false);

  const { handleChange, handleSubmit, errors, data } = useForm(
    initialData,
    schema
  );

  function onSubmit(data) {
    console.log(data);
    handleShow();
  }
  console.log(errors);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Navbar className="shadow-sm">
        <Navbar.Brand href="/">JSON-MSG REACT</Navbar.Brand>
        <Nav className="ml-auto">
          <Button
            variant="secondary"
            className="mr-2"
            href="https://github.com/darkcris1/json-msg-react/blob/master/example/src/App.js"
          >
            View Code
          </Button>
          <Button
            variant="warning"
            href="https://github.com/darkcris1/json-msg-react"
          >
            Star On Github
          </Button>
        </Nav>
      </Navbar>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-75 mx-auto mt-5">
        <Input
          error={errors.username}
          label="Username"
          value={data.username}
          name="username"
          onChange={handleChange}
        />
        <Input
          error={errors.email}
          label="Email"
          name="email"
          onChange={handleChange}
        />
        <Input
          error={errors.password}
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Input
          error={errors.confirmPassword}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />
        <Input
          error={errors.address}
          label="Address"
          name="address"
          onChange={handleChange}
        />
        <Button variant="success" block className="w-100" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
