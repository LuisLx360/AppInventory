import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalComponent from "../modal";
import FormWorker from "../editWorker";
import Notify from "../toast";
import Navegation from "../navbar";

const ShowWorkers = () => {
  const url = "http://localhost:3000/workers";
  const [message, setMessage] = useState("");
  const [workers, setWorkers] = useState([]);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const time = 3000;

  useEffect(() => {
    getWorkers();
  }, []);

  const refresh = async (id) => {
    setWorkers((prevWorkers) =>
      prevWorkers.filter((workers) => workers.id !== id)
    );
  };

  const deleteWorkers = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, { withCredentials: true });
      console.log("Se ha eliminado con éxito la herramienta");

      // Solo establecer el mensaje y el NotifyStatus si la eliminación fue exitosa
      setMessage("It has been successfully removed");
      setNotifyStatus(true);

      refresh(id);

      // Restablecer el estado después de 2 segundos
      setTimeout(() => {
        setNotifyStatus(false);
      }, time);
    } catch (error) {
      console.error("Error eliminando la herramienta:", error);
      setMessage("Error al eliminar la herramienta");
      setNotifyStatus(true);

      // Restablecer el estado después de 2 segundos en caso de error
      setTimeout(() => {
        setNotifyStatus(false);
      }, time);
    }
  };

  const getWorkers = async () => {
    const response = await axios.get(url, { withCredentials: true });
    setWorkers(response.data);
  };

  return (
    <>
      <Navegation />
      <Notify text={message} show={notifyStatus} />
      <Table bordered hover>
        <thead>
          <tr>
            <th className="col-table">Name</th>
            <th className="col-table">Area</th>
            <th className="col-table">Action</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((data) => (
            <tr key={`${data.id}`}>
              <td>{data.name}</td>
              <td>{data.area}</td>
              <td className="button-table">
                <ModalComponent title="Modify Worker" submitButtonText="Update">
                  <FormWorker worker={data} refreshWorker={getWorkers} />
                </ModalComponent>

                <Button onClick={() => deleteWorkers(data.id)} variant="danger">
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

export default ShowWorkers;
