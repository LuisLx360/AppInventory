import React from "react";

const NotFound = () => {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "Arial, sans-serif",
      backgroundImage:
        'url("https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100vw", //
      height: "100vh", //
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      position: "relative",
    },
    content: {
      zIndex: 1,
    },
    h1: {
      fontSize: "3rem",
      marginBottom: "20px",
    },
    p: {
      fontSize: "1.5rem",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.content}>
        <h1 style={styles.h1}>404 Not Found</h1>
        <p style={styles.p}>
          Sorry, the page you are looking for could not be found.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
