import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("https://vadgaon-hero-s.onrender.com/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    await axios.put(`https://vadgaon-hero-s.onrender.com/approve/${id}`);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`https://vadgaon-hero-s.onrender.com/delete/${id}`);
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>

      {users.map(user => (
        <div key={user._id} style={{
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px"
        }}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Status: {user.isApproved ? "Approved" : "Pending"}</p>

          {!user.isApproved && (
            <button onClick={() => approveUser(user._id)}>
              Approve
            </button>
          )}

          <button
            onClick={() => deleteUser(user._id)}
            style={{
              marginLeft: "10px",
              background: "red",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
