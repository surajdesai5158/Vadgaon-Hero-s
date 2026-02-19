import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [data, setData] = useState([]);

  // viewer state
  const [viewer, setViewer] = useState({
    recordIndex: null,
    photoIndex: null
  });

  useEffect(() => {
    axios.get("https://vadgaon-hero-s.onrender.com/api/about")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const closeViewer = () => {
    setViewer({ recordIndex: null, photoIndex: null });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const photos = data[viewer.recordIndex].photos;
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
    <>
      <style>
        {`
        body {
          margin:0;
          font-family: 'Segoe UI', sans-serif;
        }

        .about-section {
          padding: 80px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg,#e3f2fd,#fff3e0);
        }

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .section-title {
          text-align: center;
          margin-bottom: 50px;
        }

        .about-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .about-video video {
          width: 100%;
          border-radius: 12px;
        }

        .improvements {
          margin-top: 60px;
        }

        .improvement-card {
          background:#fff;
          padding:20px;
          border-radius:12px;
          margin-bottom:25px;
          box-shadow:0 5px 15px rgba(0,0,0,0.1);
        }

        .photo-grid {
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:10px;
        }

        .photo-grid img {
          width:150px;
          height:100px;
          object-fit:cover;
          border-radius:8px;
          cursor:pointer;
        }

        /* Viewer styles */
        .overlay {
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: rgba(0,0,0,0.9);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:1000;
        }

        .viewer-img {
          max-width:80%;
          max-height:80%;
          border-radius:12px;
        }

        .nav-btn {
          position:absolute;
          background:white;
          border:none;
          padding:10px;
          border-radius:50%;
          cursor:pointer;
          font-size:20px;
        }

        .prev-btn { left:30px; }
        .next-btn { right:30px; }

        .back-btn {
          position:absolute;
          top:20px;
          right:30px;
          background:red;
          color:white;
          border:none;
          padding:10px 15px;
          border-radius:6px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .about-card{
            grid-template-columns:1fr;
          }
        }
        `}
      </style>

      <section className="about-section">
        <div className="container">

          {/* Static About Section */}
          <div className="section-title">
            <h2>वडगांव – आपलं गाव</h2>
            <p>“वडगाव लहान असेल, पण इथली संस्कृती आणि माणसं फार मोठी आहेत.”</p>
          </div>

          <div className="about-card">
            <div className="about-video">
              <video controls>
                <source src="video1.mp4" type="video/mp4" />
              </video>
            </div>

            <div>
              <h3>“आपलं गाव – आपला अभिमान”</h3>
              <p>
                जग कितीही बदललं तरी, आपल्या गावाची ओढ कधीच कमी होत नाही.
                आपल्या गावातील संस्कृती, परंपरा आणि माणुसकी हीच खरी ताकद आहे.
              </p>
            </div>
          </div>

          {/* Improvements Section */}
          <div className="improvements">
            <h2>Village Improvements</h2>

            {data.map((item, index) => (
              <div key={item._id} className="improvement-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="photo-grid">
                  {item.photos.map((photo, pIndex) => (
                    <img
                      key={pIndex}
                      src={`https://vadgaon-hero-s.onrender.com/${photo.url}`}
                      alt="improvement"
                      onClick={() =>
                        setViewer({
                          recordIndex: index,
                          photoIndex: pIndex
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* IMAGE VIEWER */}
      {viewer.photoIndex !== null && (
        <div className="overlay" onClick={closeViewer}>
          <button className="back-btn" onClick={closeViewer}>Back ✖</button>

          <button
            className="nav-btn prev-btn"
            onClick={prevImage}
          >◀</button>

          <img
            className="viewer-img"
            src={`https://vadgaon-hero-s.onrender.com/${
              data[viewer.recordIndex].photos[viewer.photoIndex].url
            }`}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="nav-btn next-btn"
            onClick={nextImage}
          >▶</button>
        </div>
      )}
    </>
  );
};

export default About;
