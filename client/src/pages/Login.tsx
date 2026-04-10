import { useLogin } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";

export default function Login({ setToken }: any) {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    mutate(form, {
      onSuccess: (res: any) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("studentId", res.data.id || "");

        setToken(res.data.token);
        navigate("/dashboard");
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || "Invalid email or password");
      }
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Sarthi</h1>
          <p className="subtitle">Mentorship Portal<br />Login student and mentor</p>
        </div>

        {error && <ErrorBox message={error} />}

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
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button 
          className="primary-btn" 
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}