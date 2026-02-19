import React from "react";
import { NavLink } from "react-router-dom";

const GuestOneNavbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Vadgaon Worriers</h2>

      <div style={styles.links}>
        <NavLink
           to="/contact"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "#00cec9" : "#fff"
          })}
            >
            Contact
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "#00cec9" : "#fff"
          })}
        >
          Register
        </NavLink>

        <NavLink
          to="/login"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "#00cec9" : "#fff"
          })}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    height: "60px",
    background: "#1e272e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },
  logo: {
    margin: 0,
    fontSize: "20px"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold"
  }
};

export default GuestOneNavbar;
