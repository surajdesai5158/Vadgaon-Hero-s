import React from "react";

const GuestOneFooter = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} My Village App
      </p>
      <p style={styles.subText}>
        Secure Login & Registration Portal
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    height: "60px",
    background: "#1e272e",
    color: "#dcdde1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto"
  },
  text: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold"
  },
  subText: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.8
  }
};

export default GuestOneFooter;
