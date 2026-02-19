import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";

const API_BASE = "http://localhost:2000";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.token) {
        setError("Please login again");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${API_BASE}/profile`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setProfile(res.data.user);
      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        contact: res.data.user.contact,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unauthorized");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.put(
        `${API_BASE}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setProfile(res.data.user);
      setSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">My Profile</h3>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="success" className="w-100">
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-100 mt-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Form>
              ) : (
                profile && (
                  <>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Contact:</strong> {profile.contact}</p>
                    <p><strong>Role:</strong> {profile.role}</p>

                    <Button
                      className="w-100"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </>
                )
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
