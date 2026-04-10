import { useState } from "react";
import { api } from "../api/axios";
import ErrorBox from "../components/ErrorBox";

export default function AISummary() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    if (!text.trim()) {
      setError("Please enter feedback text to summarize");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSummary("");

      const res = await api.post("/ai/summarize", { feedback: text });
      setSummary(res.data.summary || res.data.aiSummary);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to generate AI summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>AI Feedback Summary</h1>
        <p>Generate intelligent summaries of mentor feedback using AI</p>
      </div>

      <div className="form-card">
        {error && <ErrorBox message={error} />}

        <div className="form-group">
          <label>Mentor Feedback</label>
          <textarea
            rows={8}
            placeholder="Paste the mentor's feedback here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button 
          className="primary-btn" 
          onClick={generateSummary}
          disabled={loading || !text.trim()}
        >
          {loading ? "Generating AI Summary..." : "Generate AI Summary"}
        </button>

        {summary && (
          <div className="summary-section">
            <div className="summary-header">
              <h3>AI Generated Summary</h3>
              <span className="ai-badge">Powered by AI</span>
            </div>
            <div className="ai-summary-box">
              {summary}
            </div>
          </div>
        )}

        {!summary && !loading && text.trim() && (
          <p className="hint-text">
            Click the button above to generate a concise, professional summary.
          </p>
        )}
      </div>
    </div>
  );
}