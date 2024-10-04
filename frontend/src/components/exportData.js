import { useEffect, useState } from "react";
import Navegation from "./navbar";
import "../App.css";
import axios from "axios";
import ExportCSV from "./exportCSV";

const ExportData = () => {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const [body, setBody] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleClick = (dataType) => {
    const baseUrl = "http://localhost:3000";
    let endpoint = "";

    switch (dataType) {
      case "tools":
        endpoint = "/tools";
        setFileName("DataTools.csv");
        console.log(fileName);
        break;
      case "transactions":
        endpoint = "/transactions";
        setFileName("DataTransactions.csv");
        console.log(fileName);
        break;
      case "workers":
        endpoint = "/workers";
        setFileName("DataWorkers.csv");
        console.log(fileName);
        break;
      default:
        return;
    }

    setUrl(baseUrl + endpoint);
  };

  useEffect(() => {
    handleData();
  }, [url]);

  const handleData = async () => {
    if (!url) return; // No hace nada si la URL está vacía
    alert(
      "You have chosen to export: " +
        fileName +
        " Now click on the export button"
    );

    try {
      const response = await axios.get(url, { withCredentials: true });
      convertData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertData = (data) => {
    if (data.length > 0) {
      setBody(data);
      setHeaders(Object.keys(data[0]));
      console.log(body);
      console.log(headers);
    }
  };

  return (
    <>
      <Navegation />

      <img src={require("../assets/imgHome.png")} className="img-home" />

      <div className="export-box">
        <p className="export-tittle">
          Choose the type of data you want to export
        </p>
        <button className="choose-button" onClick={() => handleClick("tools")}>
          Tools
        </button>
        <button
          className="choose-button"
          onClick={() => handleClick("transactions")}
        >
          Transactions
        </button>
        <button
          className="choose-button"
          onClick={() => handleClick("workers")}
        >
          Workers
        </button>
        <div>
          <ExportCSV data={body} fileName={fileName} headers={headers} />
        </div>
      </div>
    </>
  );
};

export default ExportData;
