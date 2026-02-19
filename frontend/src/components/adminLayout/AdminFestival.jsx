import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFestival = () => {
  const [festivals, setFestivals] = useState([]);
  const [preview, setPreview] = useState([]);
  const [formData, setFormData] = useState({
    festivalName: "",
    festivalDate: "",
    description: "",
    photos: [],
  });

  const [loading, setLoading] = useState(false);

  const fetchFestivals = async () => {
    const res = await axios.get("http://localhost:2000/festival");
    setFestivals(res.data);
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: files });
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("festivalName", formData.festivalName);
      data.append("festivalDate", formData.festivalDate);
      data.append("description", formData.description);

      formData.photos.forEach((photo) => data.append("photos", photo));

      await axios.post("http://localhost:2000/festival/create", data);
      alert("🎉 Festival added successfully");

      setFormData({
        festivalName: "",
        festivalDate: "",
        description: "",
        photos: [],
      });
      setPreview([]);
      fetchFestivals();
    } catch (err) {
      alert("❌ Error adding festival");
    } finally {
      setLoading(false);
    }
  };

  const deleteFestival = async (id) => {
    if (!window.confirm("Delete this festival?")) return;
    await axios.delete(`http://localhost:2000/festival/${id}`);
    fetchFestivals();
  };

  return (
    <>
      <style>{`
        .admin-container {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
          font-family: "Segoe UI", sans-serif;
        }

        .page-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .form-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          margin-bottom: 40px;
        }

        .form-card h2 {
          margin-bottom: 15px;
        }

        .form-card input,
        .form-card textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
        }

        .form-card textarea {
          resize: none;
          height: 80px;
        }

        .form-card button {
          background: #4f46e5;
          color: white;
          padding: 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
        }

        .form-card button:hover {
          background: #4338ca;
        }

        .preview-box {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }

        .preview-box img {
          width: 90px;
          height: 70px;
          object-fit: cover;
          border-radius: 6px;
        }

        .festival-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .festival-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.2s;
        }

        .festival-card:hover {
          transform: translateY(-5px);
        }

        .festival-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .image-grid img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
        }

        .delete-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          margin-top: 12px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background: #b91c1c;
        }
      `}</style>

      <div className="admin-container">
        <h1 className="page-title">🎉 Admin Festival Panel</h1>

        {/* Add Festival */}
        <div className="form-card">
          <h2>Add New Festival</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="festivalName"
              placeholder="Festival Name"
              value={formData.festivalName}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="festivalDate"
              value={formData.festivalDate}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Festival Description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
            />

            <div className="preview-box">
              {preview.map((img, i) => (
                <img key={i} src={img} alt="preview" />
              ))}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Add Festival"}
            </button>
          </form>
        </div>

        {/* Festival List */}
        <div className="festival-list">
          {festivals.map((festival) => (
            <div className="festival-card" key={festival._id}>
              <div className="festival-header">
                <h3>{festival.festivalName}</h3>
                <span>
                  {new Date(festival.festivalDate).toLocaleDateString("en-IN")}
                </span>
              </div>

              <p>{festival.description}</p>

              <div className="image-grid">
                {festival.photos.map((photo) => (
                  <img
                    key={photo._id}
                    src={`http://localhost:2000/${photo.url}`}
                    alt=""
                  />
                ))}
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteFestival(festival._id)}
              >
                Delete Festival
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminFestival;
