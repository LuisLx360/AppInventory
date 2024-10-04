import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

function FormWorker({ worker, handleClose, refreshWorker }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log([...formData]);

    const data = Object.fromEntries(formData.entries());

    axios
      .put(`http://localhost:3000/workers/${worker.id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response:", response.data);
        refreshWorker(worker.id);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(worker.id);
      });

    handleClose();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control name="Name" type="text" defaultValue={worker.name} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Area</Form.Label>
          <Form.Control name="Area" defaultValue={worker.area} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
}

export default FormWorker;
