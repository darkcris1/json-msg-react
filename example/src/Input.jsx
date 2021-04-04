import { Form } from "react-bootstrap";

function Input({ error, label, ...props }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} isInvalid={!!error} />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}

export default Input;
