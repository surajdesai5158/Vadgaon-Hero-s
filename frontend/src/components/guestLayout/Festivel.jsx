import React, { useEffect, useState } from "react";
import axios from "axios";

const Festival = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📸 Image Viewer State
  const [viewer, setViewer] = useState({
    festivalIndex: null,
    photoIndex: null,
  });

  useEffect(() => {
    axios
      .get("https://vadgaon-hero-s.onrender.com/festival")
      .then((res) => {
        setFestivals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading festivals...</h3>;

  const closeViewer = () => {
    setViewer({ festivalIndex: null, photoIndex: null });
  };

  const nextImage = () => {
    const photos = festivals[viewer.festivalIndex].photos;
    if (viewer.photoIndex < photos.length - 1) {
      setViewer({
        ...viewer,
        photoIndex: viewer.photoIndex + 1,
      });
    }
  };

  const prevImage = () => {
    if (viewer.photoIndex > 0) {
      setViewer({
        ...viewer,
        photoIndex: viewer.photoIndex - 1,
      });
    }
  };

  return (
    <>
      {/* 🔲 Full Image Viewer */}
      {viewer.photoIndex !== null && (
        <>
          <style>{`
            .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.85);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            }

            .overlay img {
              max-width: 90%;
              max-height: 85%;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(255,255,255,0.2);
            }

            .back-btn {
              position: absolute;
              top: 20px;
              left: 20px;
              background: #ffffff;
              border: none;
              padding: 10px 16px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            }

            .nav-btn {
              position: absolute;
              bottom: 30px;
              background: #ffffff;
              border: none;
              padding: 10px 16px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
            }

            .nav-btn:hover,
            .back-btn:hover {
              background: #e5e7eb;
            }

            .prev-btn {
              left: 20px;
            }

            .next-btn {
              right: 20px;
            }
          `}</style>

          <div className="overlay" onClick={closeViewer}>
            <button className="back-btn" onClick={closeViewer}>
              ⬅ Back
            </button>

            <button
              className="nav-btn prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              disabled={viewer.photoIndex === 0}
            >
              ◀ Prev
            </button>

            <img
              src={`https://vadgaon-hero-s.onrender.com/${
                festivals[viewer.festivalIndex].photos[
                  viewer.photoIndex
                ].url
              }`}
              alt="Full View"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="nav-btn next-btn"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              disabled={
                viewer.photoIndex ===
                festivals[viewer.festivalIndex].photos.length - 1
              }
            >
              Next ▶
            </button>
          </div>
        </>
      )}

      {/* 🎉 Festival List */}
      <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>🎉 Vadgaon's Festivals</h2>

        {festivals.length === 0 && <p>No festivals found</p>}

        {festivals.map((festival, index) => (
          <div
            key={festival._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{festival.festivalName}</h3>

            <p>
              📅{" "}
              {new Date(festival.festivalDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            {festival.description && <p>{festival.description}</p>}

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {festival.photos.map((photo, photoIndex) => (
                <img
                  key={photo._id}
                  src={`https://vadgaon-hero-s.onrender.com/${photo.url}`}
                  alt={festival.festivalName}
                  onClick={() =>
                    setViewer({
                      festivalIndex: index,
                      photoIndex: photoIndex,
                    })
                  }
                  style={{
                    width: "160px",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Festival;
