import { useSignup } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";

export default function Signup() {
  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    mutate(form, {
      onSuccess: () => {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || "Failed to create account");
      }
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Sarthi</h1>
          <p className="subtitle">Create Your Account</p>
        </div>

        {error && <ErrorBox message={error} />}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button 
          className="primary-btn" 
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}