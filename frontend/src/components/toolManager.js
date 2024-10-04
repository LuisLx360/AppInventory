import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "../App.css";
import Navegation from "./navbar";

const ToolManager = () => {
  const url = "http://localhost:3000/tools";
  const [tools, setTools] = useState([]);

  const url2 = "http://localhost:3000/workers";

  const [workers, setWorkers] = useState([]);

  const [foundTool, setFoundTool] = useState(null);

  const [workerName, setWorkerName] = useState(null);

  const params = useParams();

  const [message1, setMessage1] = useState("");

  const [message2, setMessage2] = useState("");

  const [message3, setMessage3] = useState("");

  const [action, setAction] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTools();
    getWorkers();
    getAction();
  }, [params.act]);

  const getAction = async () => {
    if (params.act !== "e" && params.act !== "s") {
      console.log("No se ha pasado ningun parametro");
      console.log(params);
    } else if (params.act === "e") {
      setMessage1("Tool you want to enter: ");
      setMessage2("Enter tool");
      setMessage3("Tool Entered successfully");
      setAction("E");
    } else if (params.act === "s") {
      setMessage1("Tool you want to Remove: ");
      setMessage2("Remove tool");
      setMessage3("Tool Removed Successfully");
      setAction("S");
    }
  };

  const getTools = async () => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setTools(response.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const getWorkers = async () => {
    try {
      const response = await axios.get(url2, { withCredentials: true });
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleName = async (e) => {
    const idInput = e.target.value;

    const id = Number(idInput);
    const foundName = workers.find((worker) => worker.id === id);
    console.log(idInput);

    if (foundName) {
      console.log("Se ha encontrado algo");
      setWorkerName(foundName);
      console.log(foundName);
    } else {
      console.log("No se ha encontrado nada");
      setWorkerName(null);
    }
  };

  const handleBarcodeScan = async (e) => {
    const barcodeScan = e.target.value;
    const tool = tools.find((tool) => tool.barcode === barcodeScan);
    console.log(barcodeScan);

    if (tool) {
      setFoundTool(tool);
    } else {
      setFoundTool(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (foundTool !== null && workerName !== null) {
      try {
        const response = await axios.post(
          "http://localhost:3000/transactions",

          {
            tool_id: foundTool.id,
            worker_id: workerName.id,
            type: action,
          },
          { withCredentials: true }
        );
        alert(message3);
        navigate("/inventory");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
        alert("Please enter a valid barcode");
      }
    } else {
      alert("Please enter a name and a valid barcode...");
    }
  };

  return (
    <>
      <Navegation />
      <img src={require("../assets/imgHome.png")} className="img-home" />
      <Form onSubmit={handleSubmit}>
        <Container className="inventory-container">
          <Row>
            <Col>
              <Form.Select
                className="tool-inputm"
                aria-label="Default select example"
                onChange={handleName}
              >
                <option placeholder="t">Select your Name</option>
                {workers.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col>
              <Form.Control
                className="tool-inputm"
                size="lg"
                type="text"
                placeholder="Insert Barcode"
                onChange={handleBarcodeScan}
                required
              />
            </Col>
            {foundTool && (
              <div className="container-imgfluid">
                <p>
                  {message1} {foundTool.description}
                </p>
                <Image src={foundTool.url_foto} fluid />
              </div>
            )}
          </Row>
          <div className="tool-box">
            <Col xs={6} md={4}></Col>
            <Button
              type="submit"
              variant="success"
              className="toolmanager-button"
              style={{
                fontSize: "35px",
                backgroundColor: "yellow",
                border: "none",
              }}
            >
              {message2}
            </Button>
          </div>
        </Container>
      </Form>
    </>
  );
};

export default ToolManager;
