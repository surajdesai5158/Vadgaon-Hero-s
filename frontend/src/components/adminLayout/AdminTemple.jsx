import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTemple = () => {
  const [form, setForm] = useState({
    templeName: "",
    location: "",
    establishedYear: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const [temples, setTemples] = useState([]);

  const API = "https://vadgaon-hero-s.onrender.com/api/temple";

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    const res = await axios.get(API);
    setTemples(res.data);
  };

  const handlePhotoChange = (e) => {
    const files = [...e.target.files];
    setPhotos(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    photos.forEach((photo) => data.append("photos", photo));

    await axios.post(API, data);

    alert("Temple Added Successfully");

    setForm({
      templeName: "",
      location: "",
      establishedYear: "",
      description: "",
    });

    setPhotos([]);
    setPreview([]);
    fetchTemples();
  };

  const deleteTemple = async (id) => {
    if (window.confirm("Delete this temple?")) {
      await axios.delete(`${API}/${id}`);
      fetchTemples();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🏛 Add Temple</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            style={styles.input}
            placeholder="Temple Name"
            value={form.templeName}
            onChange={(e) =>
              setForm({ ...form, templeName: e.target.value })
            }
            required
          />

          <input
            style={styles.input}
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Established Year"
            value={form.establishedYear}
            onChange={(e) =>
              setForm({ ...form, establishedYear: e.target.value })
            }
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input type="file" multiple onChange={handlePhotoChange} />

          <div style={styles.previewGrid}>
            {preview.map((img, index) => (
              <img key={index} src={img} alt="preview" style={styles.previewImg}/>
            ))}
          </div>

          <button type="submit" style={styles.button}>
            Add Temple
          </button>

        </form>
      </div>

      {/* Temple List */}
      <h2 style={{textAlign:"center", marginTop:"40px"}}>Temple List</h2>

      <div style={styles.grid}>
        {temples.map((temple) => (
          <div key={temple._id} style={styles.templeCard}>
            <h3>{temple.templeName}</h3>
            <p>📍 {temple.location}</p>
            <p>🏛 {temple.establishedYear}</p>
            <p>{temple.description}</p>

            <div style={styles.photoGrid}>
              {temple.photos?.map((photo, i) => (
                <img
                  key={i}
                  src={`https://vadgaon-hero-s.onrender.com/${photo.url}`}
                  alt=""
                  style={styles.previewImg}
                />
              ))}
            </div>

            <button
              onClick={() => deleteTemple(temple._id)}
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

export default AdminTemple;


/* STYLES */

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e0f2fe,#fef3c7)",
    padding: "20px",
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
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },

  templeCard: {
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

  deleteBtn: {
    marginTop: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
