import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Base = ({ children }) => {
  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  main: {
    flex: 1,
    padding: "2rem",
  },
};

export default Base;
