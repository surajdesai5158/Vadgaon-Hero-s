import React from "react";
import { Outlet } from "react-router-dom";

import { GuestOneHeader } from "./GuestOneHeader";
import GuestOneFooter from "./GuestOneFooter";

const GuestOneLayout = () => {
  return (
    <div style={styles.wrapper}>
      {/* UNIQUE NAVBAR */}
      <GuestOneHeader />

      {/* PAGE CONTENT */}
      <main style={styles.content}>
        <Outlet />
      </main>

      {/* UNIQUE FOOTER */}
      <GuestOneFooter />
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f5f6fa"
  },
  content: {
    flex: 1,
    padding: "20px"
  }
};

export default GuestOneLayout;
