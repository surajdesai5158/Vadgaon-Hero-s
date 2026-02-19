import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAbout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const [data, setData] = useState([]);

  const API = "http://localhost:2000/api/about";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  const handlePhotoChange = (e) => {
    const files = [...e.target.files];
    setPhotos(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    photos.forEach(photo => formData.append("photos", photo));

    await axios.post(API, formData);

    alert("Added Successfully");

    setTitle("");
    setDescription("");
    setPhotos([]);
    setPreview([]);
    fetchData();
  };

  const deleteRecord = async (id) => {
    if (window.confirm("Delete this record?")) {
      await axios.delete(`${API}/${id}`);
      fetchData();
    }
  };

  return (
    <div style={styles.container}>

      {/* Form Card */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Add Village Improvements</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input type="file" multiple onChange={handlePhotoChange} />

          {/* Preview Images */}
          <div style={styles.previewGrid}>
            {preview.map((img, i) => (
              <img key={i} src={img} alt="" style={styles.previewImg} />
            ))}
          </div>

          <button type="submit" style={styles.button}>
            Add Record
          </button>
        </form>
      </div>

      {/* Records */}
      <h2 style={styles.subHeading}>All Records</h2>

      <div style={styles.grid}>
        {data.map(item => (
          <div key={item._id} style={styles.recordCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div style={styles.photoGrid}>
              {item.photos.map((photo, i) => (
                <img
                  key={i}
                  src={`http://localhost:2000/${photo.url}`}
                  alt=""
                  style={styles.recordImg}
                />
              ))}
            </div>

            <button
              onClick={() => deleteRecord(item._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAbout;


/* STYLES */

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#eef2ff,#fef3c7)",
    padding: "30px",
  },

  card: {
    maxWidth: "500px",
    margin: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e3a8a",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },

  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "8px",
  },

  previewImg: {
    width: "100%",
    height: "70px",
    objectFit: "cover",
    borderRadius: "6px",
  },

  button: {
    background: "linear-gradient(45deg,#2563eb,#60a5fa)",
    border: "none",
    padding: "12px",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  subHeading: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "20px",
    color: "#1e3a8a",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },

  recordCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "6px",
    marginTop: "10px",
  },

  recordImg: {
    width: "100%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "6px",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
