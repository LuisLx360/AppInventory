import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

function FormTool({ tool, statusOptions, handleClose, refreshTool }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    axios
      .put(`http://localhost:3000/tools/${tool.id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response:", response.data);
        refreshTool(tool.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleClose();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              defaultValue={tool.description}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Barcode</Form.Label>
          <Form.Control name="barcode" defaultValue={tool.barcode} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Url_foto</Form.Label>
          <Form.Control name="url_foto" defaultValue={tool.url_foto} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" defaultValue={tool.status}>
              {statusOptions.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
}

export default FormTool;
