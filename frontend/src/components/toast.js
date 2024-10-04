import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "../styles/check.css";

function Notify({ text, show }) {
  const [visible, setVisible] = useState(show);

  // Para mostrar el Toast y ocultarlo después de un tiempo
  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer); // Limpia el timer al desmontar
    }
  }, [show]);

  return (
    <ToastContainer className="fixed-toast-container" position="top-right">
      <Toast onClose={() => setVisible(false)} show={visible}>
        <Toast.Header>
          <strong className="me-auto">Server</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notify;
