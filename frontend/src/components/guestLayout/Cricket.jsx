import React, { useEffect, useState } from "react";
import axios from "axios";

const Cricket = () => {
  const [results, setResults] = useState([]);

  // Gallery states
  const [showViewer, setShowViewer] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API = "http://localhost:2000/api/cricket";

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await axios.get(`${API}/all`);
    setResults(res.data);
  };

  // Open viewer
  const openViewer = (images, index) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setShowViewer(true);
  };

  // Next image
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  // Previous image
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🏏 Vadagaon Premier League Memories</h1>

      <div style={styles.grid}>
        {results.map((item) => (
          <div key={item._id} style={styles.card}>
            <h2 style={styles.year}>Year {item.year}</h2>

            <p style={styles.winner}>🏆 {item.winnerTeam}</p>
            <p>Owner: {item.winnerOwner}</p>

            <p style={styles.runner}>🥈 {item.runnerTeam}</p>
            <p>Owner: {item.runnerOwner}</p>

            <div style={styles.photoGrid}>
              {item.photos?.map((photo, i) => (
                <img
                  key={i}
                  src={`http://localhost:2000/uploads/${photo}`}
                  alt=""
                  style={styles.image}
                  onClick={() => openViewer(item.photos, i)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE VIEWER MODAL */}
      {showViewer && (
        <div style={styles.modal}>
          <button style={styles.closeBtn} onClick={() => setShowViewer(false)}>
            Back ✖
          </button>

          <button style={styles.prevBtn} onClick={prevImage}>
            ◀
          </button>

          <img
            src={`http://localhost:2000/uploads/${currentImages[currentIndex]}`}
            alt=""
            style={styles.fullImage}
          />

          <button style={styles.nextBtn} onClick={nextImage}>
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Cricket;



const styles = {
  container: { padding: 30, background: "#eef2f7", minHeight: "100vh" },
  heading: { textAlign: "center", marginBottom: 30 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
    gap: 20
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 5px 12px rgba(0,0,0,0.1)"
  },

  year: { color: "#0077cc" },
  winner: { color: "green", fontWeight: "bold" },
  runner: { color: "#c48a00", fontWeight: "bold" },

  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 5,
    marginTop: 10
  },

  image: {
    width: "100%",
    height: 90,
    objectFit: "cover",
    borderRadius: 6,
    cursor: "pointer"
  },

  /* Modal styles */
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  fullImage: {
    maxWidth: "80%",
    maxHeight: "80%",
    borderRadius: 10
  },

  closeBtn: {
    position: "absolute",
    top: 20,
    right: 30,
    background: "red",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: 6
  },

  prevBtn: {
    position: "absolute",
    left: 30,
    background: "#fff",
    border: "none",
    fontSize: 24,
    padding: "10px",
    cursor: "pointer",
    borderRadius: 6
  },

  nextBtn: {
    position: "absolute",
    right: 30,
    background: "#fff",
    border: "none",
    fontSize: 24,
    padding: "10px",
    cursor: "pointer",
    borderRadius: 6
  }
};
