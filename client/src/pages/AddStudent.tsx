import { useState } from "react";
import { api } from "../api/axios";
import ErrorBox from "../components/ErrorBox";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    targetYear: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and Email are required");
      setLoading(false);
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (form.phone && form.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    try {
      await api.post("/students", {
        ...form,
        targetYear: form.targetYear ? Number(form.targetYear) : undefined,
      });

      setSuccess("Student added successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        targetYear: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Add New Student</h1>
        <p>Fill in the details to onboard a new student to the platform</p>
      </div>

      <div className="form-card">
        {error && <ErrorBox message={error} />}
        {success && <div className="success-message">{success}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter student's full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="student@example.com"
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
              placeholder="2027"
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
          {loading ? "Adding Student..." : "Add Student"}
        </button>
      </div>
    </div>
  );
}