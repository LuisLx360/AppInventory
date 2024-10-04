import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const ShowTransactions = () => {
  const url = "http://localhost:3000/transactions";
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getTransactions();

    const intervalId = setInterval(getTransactions, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Table className="table-trs" bordered hover>
        <thead>
          <tr>
            <th className="col-table">Tool</th>
            <th className="col-table">Worker</th>
            <th className="col-table"> Date_Time</th>
            <th className="col-table">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((data) => (
            <tr key={data.id}>
              <td>{data.description}</td>
              <td>{data.name}</td>
              <td>{data.datetime}</td>
              <td>{data.transaction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowTransactions;
