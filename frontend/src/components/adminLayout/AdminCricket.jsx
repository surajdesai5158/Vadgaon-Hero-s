import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCricket = () => {
  const [form, setForm] = useState({
    year: "",
    winnerTeam: "",
    winnerOwner: "",
    runnerTeam: "",
    runnerOwner: ""
  });

  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState([]);
  const [results, setResults] = useState([]);

  const API = "https://vadgaon-hero-s.onrender.com/api/cricket";

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await axios.get(`${API}/all`);
    setResults(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    setPhotos(files);

    // preview images
    const previewArray = Array.from(files).map(file =>
      URL.createObjectURL(file)
    );
    setPreview(previewArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    await axios.post(`${API}/add`, formData);

    alert("Result Added Successfully");

    setForm({
      year: "",
      winnerTeam: "",
      winnerOwner: "",
      runnerTeam: "",
      runnerOwner: ""
    });

    setPreview([]);
    fetchResults();
  };

  const deleteResult = async (id) => {
    if (window.confirm("Delete this record?")) {
      await axios.delete(`${API}/delete/${id}`);
      fetchResults();
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>🏏 Cricket League Admin Panel</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>

        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
        <input name="winnerTeam" placeholder="Winner Team" value={form.winnerTeam} onChange={handleChange} required />
        <input name="winnerOwner" placeholder="Winner Owner" value={form.winnerOwner} onChange={handleChange} required />
        <input name="runnerTeam" placeholder="Runner Team" value={form.runnerTeam} onChange={handleChange} required />
        <input name="runnerOwner" placeholder="Runner Owner" value={form.runnerOwner} onChange={handleChange} required />

        <input type="file" multiple onChange={handlePhotoChange} />

        {/* Preview Images */}
        <div style={styles.previewGrid}>
          {preview.map((img, i) => (
            <img key={i} src={img} alt="preview" style={styles.previewImg}/>
          ))}
        </div>

        <button type="submit" style={styles.addBtn}>Add Result</button>
      </form>

      {/* RECORD LIST */}
      <div style={styles.grid}>
        {results.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3 style={{color:"#0077cc"}}>Year {item.year}</h3>

            <p style={styles.winner}>🏆 {item.winnerTeam}</p>
            <p>Owner: {item.winnerOwner}</p>

            <p style={styles.runner}>🥈 {item.runnerTeam}</p>
            <p>Owner: {item.runnerOwner}</p>

            <div style={styles.photoGrid}>
              {item.photos?.map((photo, i) => (
                <img
                  key={i}
                  src={`https://vadgaon-hero-s.onrender.com/uploads/${photo}`}
                  alt=""
                  style={styles.image}
                />
              ))}
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteResult(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCricket;


const styles = {

  container: {
    padding: 30,
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e0f7fa,#f4f6f9)"
  },

  heading: {
    textAlign: "center",
    marginBottom: 25,
    color: "#222"
  },

  form: {
    display: "grid",
    gap: 12,
    maxWidth: 420,
    margin: "auto",
    marginBottom: 30,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 5px 18px rgba(0,0,0,0.1)"
  },

  addBtn: {
    background: "linear-gradient(45deg,#0077ff,#00c6ff)",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
    gap: 20
  },

  card: {
    background: "#fff",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  winner: { color: "green", fontWeight: "bold" },
  runner: { color: "#c48a00", fontWeight: "bold" },

  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 6,
    marginTop: 10
  },

  image: {
    width: "100%",
    height: 90,
    objectFit: "cover",
    borderRadius: 6
  },

  deleteBtn: {
    marginTop: 12,
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 6
  },

  previewImg: {
    width: "100%",
    height: 70,
    objectFit: "cover",
    borderRadius: 6
  }
};
