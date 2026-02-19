import React, { useEffect, useState } from "react";
import axios from "axios";

const Temple = () => {
  const [temples, setTemples] = useState([]);
  const [viewer, setViewer] = useState({
    templeIndex: null,
    photoIndex: null,
  });

  useEffect(() => {
    axios.get("http://localhost:2000/api/temple").then((res) => {
      setTemples(res.data);
    });
  }, []);

  const closeViewer = () => {
    setViewer({ templeIndex: null, photoIndex: null });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const photos = temples[viewer.templeIndex].photos;
    if (viewer.photoIndex < photos.length - 1) {
      setViewer({ ...viewer, photoIndex: viewer.photoIndex + 1 });
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (viewer.photoIndex > 0) {
      setViewer({ ...viewer, photoIndex: viewer.photoIndex - 1 });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🏛 Vadagaon Temples</h1>

      {/* IMAGE VIEWER */}
      {viewer.photoIndex !== null && (
        <div style={styles.overlay} onClick={closeViewer}>
          <button style={styles.backBtn} onClick={closeViewer}>
            Back ✖
          </button>

          <button style={styles.navLeft} onClick={prevImage}>
            ◀
          </button>

          <img
            src={`http://localhost:2000/${
              temples[viewer.templeIndex].photos[viewer.photoIndex].url
            }`}
            alt="Temple"
            style={styles.viewerImg}
            onClick={(e) => e.stopPropagation()}
          />

          <button style={styles.navRight} onClick={nextImage}>
            ▶
          </button>
        </div>
      )}

      {/* TEMPLE LIST */}
      <div style={styles.grid}>
        {temples.map((temple, index) => (
          <div key={temple._id} style={styles.card}>
            <h2 style={styles.templeName}>{temple.templeName}</h2>

            <p><strong>📍 Location:</strong> {temple.location}</p>
            <p><strong>🏛 Established:</strong> {temple.establishedYear}</p>
            <p style={styles.desc}>{temple.description}</p>

            <div style={styles.photoGrid}>
              {temple.photos.map((photo, pIndex) => (
                <img
                  key={photo._id}
                  src={`http://localhost:2000/${photo.url}`}
                  alt="Temple"
                  style={styles.image}
                  onClick={() =>
                    setViewer({
                      templeIndex: index,
                      photoIndex: pIndex,
                    })
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temple;


/* STYLES */

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg,#f5f7fa,#e4ecf7)",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#222",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  templeName: {
    color: "#0077cc",
    marginBottom: "8px",
  },

  desc: {
    color: "#555",
    marginBottom: "10px",
  },

  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "8px",
  },

  image: {
    width: "100%",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  viewerImg: {
    maxWidth: "80%",
    maxHeight: "80%",
    borderRadius: "12px",
  },

  backBtn: {
    position: "absolute",
    top: "20px",
    right: "30px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  navLeft: {
    position: "absolute",
    left: "30px",
    fontSize: "26px",
    background: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  navRight: {
    position: "absolute",
    right: "30px",
    fontSize: "26px",
    background: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};
