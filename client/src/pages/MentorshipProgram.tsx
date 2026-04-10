import { useState } from "react";
import { api } from "../api/axios";

export default function MentorshipProgram() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    targetYear: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and Email are required");
      setLoading(false);
      return;
    }

    try {
      await api.post("/students", form); // or "/apply" if you have separate endpoint

      setSuccess("Your application has been submitted successfully! 🎉");
      
      setForm({ name: "", email: "", phone: "", targetYear: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Join the Sarthi Mentorship Program</h1>
          <p>
            Get personalized guidance from experienced mentors and accelerate your academic &amp; career growth.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <div className="form-container">
        <div className="form-card">
          <h2>Apply Now</h2>
          <p className="form-subtitle">Fill out the form below to get started</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={10}
              />
            </div>

            <div className="form-group">
              <label>Target Year (Optional)</label>
              <input
                type="number"
                placeholder="2026 or 2027"
                value={form.targetYear}
                onChange={(e) => setForm({ ...form, targetYear: e.target.value })}
              />
            </div>
          </div>

          <button 
            className="primary-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting Application..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}