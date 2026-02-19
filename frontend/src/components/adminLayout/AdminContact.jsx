import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:2000/all");
    setMessages(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReply = async (id) => {
    try {
      await axios.put(
        `http://localhost:2000/reply/${id}`,
        { reply: replyText[id] }
      );

      alert("Reply sent successfully ✅");
      setReplyText({});
      fetchContacts();
    } catch (error) {
      alert("Failed to send reply ❌");
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      await axios.delete(`http://localhost:2000/message/delete/${id}`);
      fetchContacts();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📩 Admin Contact Messages</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <p><b>Name:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Message:</b> {msg.message}</p>

            {msg.reply ? (
              <p style={{ color: "green" }}>
                <b>Replied:</b> {msg.reply}
              </p>
            ) : (
              <>
                <textarea
                  placeholder="Type your reply..."
                  rows="3"
                  style={{ width: "100%" }}
                  value={replyText[msg._id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [msg._id]: e.target.value,
                    })
                  }
                />

                <button
                  onClick={() => handleReply(msg._id)}
                  style={{ marginTop: "10px", padding: "8px 15px" }}
                >
                  Reply & Send Email
                </button>
              </>
            )}

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteMessage(msg._id)}
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                padding: "8px 15px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Delete Message
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminContact;
