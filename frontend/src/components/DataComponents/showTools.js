import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalComponent from "../modal";
import FormTool from "../editTool";
import Check from "../toast";
import Navegation from "../navbar";

const ShowTools = () => {
  const url = "http://localhost:3000/tools";
  const [tools, setTools] = useState([]);
  const [message, setMessage] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);
  const time = 3000;

  useEffect(() => {
    getTools();
  }, []);

  const refresh = async (id) => {
    setTools((prevTools) => prevTools.filter((tool) => tool.id !== id));
  };

  const deleteTools = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, { withCredentials: true });
      console.log("Se ha eliminado con éxito la herramienta");

      setMessage("It has been successfully removed");
      setCheckStatus(true);

      refresh(id);

      setTimeout(() => {
        setCheckStatus(false);
      }, time);
    } catch (error) {
      console.error("Error eliminando la herramienta:", error);
      setMessage("Error al eliminar la herramienta");
      setCheckStatus(true);

      setTimeout(() => {
        setCheckStatus(false);
      }, time);
    }
  };

  const getTools = async () => {
    const response = await axios.get(url, { withCredentials: true });

    setTools(response.data);
  };

  const [statusOptions] = useState([
    { id: "A", name: "Activo" },
    { id: "I", name: "Inactivo" },
  ]);

  return (
    <>
      <Navegation />

      <Check text={message} show={checkStatus} />
      <Table bordered hover>
        <thead>
          <tr>
            <th className="col-table">Description</th>
            <th className="col-table">Barcode</th>
            <th className="col-table">Url_foto</th>
            <th className="col-table"> Status</th>
            <th className="col-table">Created_at</th>
            <th className="col-table">Action</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((data) => (
            <tr key={data.id}>
              <td>{data.description}</td>
              <td>{data.barcode}</td>
              <td>{data.url_foto}</td>
              <td>{data.status}</td>
              <td>{data.created_at}</td>
              <td className="button-table">
                <ModalComponent title="Modify Tool">
                  <FormTool
                    tool={data}
                    statusOptions={statusOptions}
                    refreshTool={getTools}
                  />
                </ModalComponent>
                <Button onClick={() => deleteTools(data.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowTools;
